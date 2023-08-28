const mongoose = require('../utils/connection')
const { Schema, model } = mongoose

const postSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true})

const Post = model('Post', postSchema)

module.exports = Post