var express = require('express');
var router = express.Router();

var Post = require("../models/post");
var User = require("../models/user");

//Populates home page feed
router.get('/', function(req, res, next) {
    
    //Finds and outputs all user posts in order from newest to oldest.
    Post.find().sort('-postDate').exec( function(err, docs){
        
        var postRows = [];
        var rowSize = 4; //max items i want in a row
        
        //Iterate through posts collection 4 elements at a time
        for(var i = 0; i < docs.length; i += rowSize) {
            
            postRows.push(docs.slice(i, i + rowSize));
            
        }
        if(req.isAuthenticated()){
             
            User.findOne({_id: req.user}, function(err, profile) {
                
                if (err) {
                    return res.write('Error!');
                }
                
                var username = profile.username;
                
                res.render('feed', { title: 'Criteek', posts: postRows, username: username, script: req._script});
            });
        }
        else{
            res.render('feed', { title: 'Criteek', posts: postRows, script: req._script});   
        }

    });
});

module.exports = router;