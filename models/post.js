const mongoose = require('../utils/connection')
const commentSchema = require('./comment')
const likeSchema = require('./like')
const { Schema, model } = mongoose

const postSchema = new Schema({
    title: {
        type: String,
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
    likes: [{likeSchema}]
}, { timestamps: true})

const Post = model('Post', postSchema)

module.exports = Post