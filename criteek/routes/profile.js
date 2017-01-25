var express = require('express');
var router = express.Router();
var csrf = require("csurf");

var Post = require("../models/post");
var User = require("../models/user");

var csrfProtection = csrf();
router.use(csrfProtection); //Protects each route used with csrf

//Render user's personalized profile page after logging in
router.get('/profile', isLoggedIn, function (req, res, next) {
     
     //Finds the user according to the login info
     User.findOne({_id: req.user}, function(err, profile){
        
        //If for some reason the user is not found after passing authentication *shrugs*
        if(err) {
             return res.write('Error!');
        }
        
        var userPosts = profile.userPosts.sort('-postDate');
        var posts = [];
        
        userPosts.forEach( function (post)
        {
            posts.push(post);
            console.log(posts);
        });
        
        //Array that will hold the posts that this user has
        var postRows = [];
        var rowSize = 4; //max items i want in a row
        
        //Iterate through posts collection 4 elements at a time
        for(var i = 0; i < posts.length; i += rowSize) {
            postRows.push(posts.slice(i, i + rowSize));
            console.log(postRows);
        }
        
        var username = profile.username;
        var projNum = posts.length;
         
        res.render('user/profile', { title: 'Criteek', posts: : postRows, username: username, projNum: projNum});
     });

});

module.exports = router;

function isLoggedIn(req, res, next) {
    
    //Checks to see if authentiction was successful before
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/');
}