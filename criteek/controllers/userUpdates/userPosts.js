var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require("../models/user");
var Img = require("../models/img");

module.exports = function (){
    
    var query = {
        'username':req.user.username
    };
    
    req.newData.username = req.user.username;
    
    User.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully Saved");
    });
    
}