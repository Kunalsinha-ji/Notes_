const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title : {type : String, required : true,minlength : 3},
    email : {type : String, required : true,minlength : 3},
    contents : {type : String, required : true},
},
{
    timestamps : true,
});

const noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;