const mongoose = require('../utils/connection')
const {Schema} = mongoose

const endorsementSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = endorsementSchema