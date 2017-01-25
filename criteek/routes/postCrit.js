var User = require("../models/user");
var Post = require("../models/post");

module.exports = function() {
    this.newCrit = function(req, res) {
        console.log("posting...");

        //Get the id of the user who is posting the criteek
        User.findOne({
            _id: req.user
        }, function(err, profile) {

            if (err) {
                return res.write('Error!');
            }
            
            console.log(profile.username);

            //Was passed down from the moment the user clicked on the particular post on the feed by repeatedly storing in data-id
            var id = req.body.id;
            console.log(id);
            
            //Add comment to the criteekDet field in the proper post(the one the user is currently on)
            Post.findOne({
                _id: id
            }, function(err, post) {

                if (err) {
                    return res.write('Error!');
                }

                var obj = {
                    user: profile.username,
                    criteek: req.body.crit
                };
                
                console.log(obj);
 
                post.criteekDet.push(obj);
                post.criteekCt = post.criteekCt + 1;
                
                post.save(function(err, result) {
                    if (err) {
                        console.log("Error");
                        console.log(err);
                        return err;
                    }
                    console.log("saved comment");
                    console.log("update c count");
                });
                
            });
        });
    }
};