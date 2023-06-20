const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true,   
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        default: null,
      },
})
module.exports = mongoose.model("Student", studentsSchema)