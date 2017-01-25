var express = require('express');
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");
var mongoose = require("mongoose");

var csrfProtection = csrf();
router.use(csrfProtection); //Protects each route used with csrf

var Post = require("../models/post");
var User = require("../models/user");


//delete your post
router.post('/profile', function(req, res, next) {

     Post.remove({
        _id: req.body.delete_data
     }, function(err, toDelete) {
        if (err) {
            console.log("No such post exists");
            res.redirect('/profile');
        }
         
        console.log('Post deleted');
         
        var id = req.body.delete_data;
         
        var files = mongoose.connection.db.collection('fs.files');
        var chunks = mongoose.connection.db.collection('fs.chunks');
        
        files.remove({_id: id});
        chunks.remove({files_id: id});
        
        res.redirect("/user/profile");
     });
     
 });

//Render user's personalized profile page after logging in
router.get('/profile', isLoggedIn, function(req, res, next) {

    //Finds the user according to the login info
    Post.find({username: req.user.username}).sort('-postDate').exec( function(err, doc) {
        var comments = [];
         //If no posts are found for user
        if (err) {
            console.log("no posts");
            res.render('user/profile', {
                csrfToken: req.csrfToken(),
                title: 'Criteek',
                posts: postRows,
                username: req.user.username,
                projNum: 0,
                criteekNum: 0,
                script: req._script,
                comments: comments
            });
            return;
        }
        
        //Array that will hold the posts that this user has
        var postRows = [];
        var rowSize = 3; //max items i want in a row
        
        var critNum = 0;
        
        //Iterate through posts collection 4 elements at a time
        for (var i = 0; i < doc.length; i += rowSize) {
            
            postRows.push(doc.slice(i, i + rowSize));
            
            //load first 7 posts that match up to req username
            if(critNum < 7){
                for (var k = i ; k < (i + rowSize) && critNum < 7; k++) {
                    critNum++;
                    
                    if(doc[k]){
                        for (var j = 0; j < doc[k].criteekDet.length; j++) {
                            var critObj = doc[k].criteekDet[j];
                            critObj.path = doc[k].imgPath;
                            comments.unshift(critObj);
                        }
                    }
                }
            }
        }
        
        comments.splice(comments.length - 1,comments.length);
        console.log(comments);
        
        res.render('user/profile', {
            csrfToken: req.csrfToken(),
            title: 'Criteek',
            posts: postRows,
            username: req.user.username,
            projNum: doc.length,
            criteekNum: 0,
            script: req._script,
            comments: comments
        });

    });

});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

//Provides  login/register page with csrf protection
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), layout: false, messages: messages, hasErrors: messages.length > 0});
});

//Checks to see if what user inputs into sign up form can be used to make a new account
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


//Render user sign in page with crsf protection
router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), layout: false, messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

module.exports = router;

//Used to make sure some pages are accessible only if you are logged in
function isLoggedIn(req, res, next) {
    
    //Checks to see if authentiction was successful before
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    
    res.redirect('/');
}
