var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = require("../models/post");

var feedSchema = new Schema({
    allPosts:[{
        user: [Post],
    }]
}, {collection:'feed'});

module.exports = mongoose.model('Feed', feedSchema);