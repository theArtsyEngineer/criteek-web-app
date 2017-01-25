var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require("multer");
var upload = multer({dest: "./uploads/"});
var mongoose = require('mongoose');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;
var User = require("../models/user");
var Post = require("../models/post");
require("./postCrit")();

//Begins process to upload image to Criteek DB
conn.once("open", function() {
    
    var gfs = Grid(conn.db);
    
    router.post("/", function(req, res, next) {
        
        
        if(req.body.switch == "postcrit"){
            newCrit(req, res);
            res.redirect('/');
        }
        else{
            console.log(req.body.switch);
            upload.single("photo");
            //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
        
        var writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });
        
        User.findOne({_id: req.user}, function(err, profile) {
            if (err) {
                return res.write('Error!');
            }
            
            var user = profile;
            var title = req.body.title;
            var descript = req.body.descript;
            var question = req.body.question;
            var id = writestream.id;
            var path = "https://criteek-artsyengineer.c9users.io/" + writestream.name;
            
            var post = new Post({
                title: title,
                user: user._id,
                username: user.username,
                description: descript,
                question: question,
                viewCt: 0,
                criteekCt: 0,
                criteekDet:[{
                    user: undefined,
                    criteek: undefined
                }],
                imgPath: path,
                imgPathGFS: id,
                postDate: Date.now()
            });
            
            post.save(function(err, result) {
                if (err) {
                    console.log("Error");
                    console.log(err);
                    return err;
                }
                console.log("feed updated");
                
            });
            
            profile.userPosts.push(post);
            profile.save(function (err, updatedProf) {
                if (err) {
                    console.log("Error");
                    console.log(err);
                    return err;
                }
                console.log("user posts updated");
            });
            
            //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
            fs.createReadStream("./uploads/" + req.file.filename).on("end", function() {
                fs.unlink("./uploads/" + req.file.filename, function(err) {
                    console.log("upload success");
                    
                    res.redirect('/');
                })
            })
            .on("err", function() {
                    console.log("Upload Failed");
                    res.redirect('/');
                })
                .pipe(writestream);
            });
        }
        
        
        
    });
    
    router.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
    });

    
    //Deletes image from db
    router.get("/delete/:filename", function(req, res) {
        console.log("DELETE");
        gfs.exist({
            filename: req.params.filename
        }, function(err, found) {
            if (err) return res.send("Error occured");
            if (found) {
                gfs.remove({
                    filename: req.params.filename
                }, function(err) {
                    if (err) return res.send("Error occured");
                    res.send("Image deleted!");
                });
            }
            else {
                res.send("No image found with that title");
            }
        });
    });

});

module.exports = router;