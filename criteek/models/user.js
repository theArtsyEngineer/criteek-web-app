var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Post = require("../models/post");
var bcrypt = require("bcrypt-nodejs"); //allows user's password to be encrypted and decrypted

var userSchema = new Schema({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    notifications:{type: String, default: undefined},
    userPosts:[{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {collection:'users'});

//Encrypts the user password
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

//Allows us to validate password even though its encrypted
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);