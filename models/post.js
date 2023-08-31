const mongoose = require('../utils/connection')
const commentSchema = require('./comment')
const { Schema, model } = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema],
    spotify: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true})

const Post = model('Post', postSchema)

module.exports = Post