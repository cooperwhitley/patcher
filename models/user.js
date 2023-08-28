const mongoose = require('../utils/connection')

// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// user schema
const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String
}, { 
    timestamps: true 
})

const User = model('User', userSchema)


module.exports = User