const mongoose = require('../utils/connection')
const endorsementSchema = require('./endorsement')

const { Schema, model } = mongoose

const jobList = [
    'studio engineer',
    'live engineer',
    'producer',
    'songwriter',
    'artist',
    'composer',
    'arranger',
    'session musician',
    'voice actor'
]

const cityList = [
    'Atlanta',
    'Boston',
    'Chicago',
    'Columbus',
    'Dallas',
    'Denver',
    'Houston',
    'Los Angeles',
    'Memphis',
    'Miami',
    'Nashville',
    'New Orleans',
    'New York',
    'Philadelphia',
    'Portland',
    'San Francisco',
    'Seattle',
    'Washington DC'
]

const profileSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    secondEmail: {
        type: String
    },
    websites: {
        type: [String]
    },
    phoneNum: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },
    accountType: {
        type: String,
        enum: ['individual', 'business']
    },
    jobs: {
        type: [String],
        enum: jobList
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
    },
    location: {
        type: String,
        enum: cityList
    },
    endorsements: [endorsementSchema]
})

const Profile = model('Profile', profileSchema)

module.exports = {
    Profile,
    jobList,
    cityList
}