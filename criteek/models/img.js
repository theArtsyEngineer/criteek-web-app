var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = require("../models/user");

var imgSchema = new Schema({
    title: {type: Buffer, contentType: String}
}, {collection:'img'});

module.exports = mongoose.model('Img', imgSchema);