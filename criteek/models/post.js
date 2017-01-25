var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = require("../models/user");

var postSchema = new Schema({
    title: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type:String},
    description: {type: String, required:true},
    question: {type: String, required:true},
    viewCt:{type: Number,required: true},
    criteekCt:{type: Number,required: true},
    criteekDet:[{
        user : {type: String},
        criteek : {type: String}
    }],
    imgPath:{type: String, default: undefined},
    imgPathGFS: Schema.Types.ObjectId,
    postDate: {type: Date, default: Date.now}
}, {collection:'posts'});

module.exports = mongoose.model('Post', postSchema);