
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name : {
    type : String,
    required : true,
    trim : true
},

email : {
    type : String,
    required : true,
    unique : true,
    trim : true
},

password : {

    type : String,
    required : true,
    trim : true
},

roles: {

    type: String,
    enum : ['admin', 'doctor', 'patient'],
    default : 'patient'
}


})

module.exports = mongoose.model("User", userSchema);
