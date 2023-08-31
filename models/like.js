const mongoose = require('../utils/connection')
const {Schema} = mongoose

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = likeSchema