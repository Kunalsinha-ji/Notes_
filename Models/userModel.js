const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name : {type : String, required : true,minlength : 3},
    last_name : {type : String, required : true,minlength : 3},
    email : {type : String, required : true,minlength : 3,unique : true},
    password : {type : String, required : true,minlength : 3},
},
{
    timestamps : true,
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;