var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//This handles new user sign up to use Criteek. Checks to see if the input by the user is valid for creating a new user
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done){
    
    var email = req.body.email;
    
    console.log(req.body);
    
    req.checkBody('username', 'Invalid Username').notEmpty().isLength({min:4, max:10});
    req.checkBody('password', 'Password must be at least 4 characters long').notEmpty().isLength({min:4, max:12});
    req.checkBody('email', 'Invalid Email').isEmail();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
           messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    //Checks to see if username is taken
    User.findOne({'username': username}, function(err,user){
        if(err) {
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Username is already taken.'});
        }
        
        //Here creates a new user using the user.js model
        var newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);//encrypts the user's password
    
        //Finally save the new user info
        newUser.save(function(err, result) {
        if(err) {
            return done(err);
        }
        return done(null, newUser);
        });
    });
    
}));


//This handles user sign in by looking for a match in the Criteek database
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done){
    
    req.checkBody('username', 'Invalid Username').notEmpty();
    req.checkBody('password', 'Invalid Password').notEmpty();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    
    //Looks for the user in the database
    User.findOne({'username': username}, function(err,user){
        if(err) {
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'Wrong username or password'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong username or password'});
        }
        return done(null, user);
    });
    
}));