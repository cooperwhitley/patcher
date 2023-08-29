const express = require('express')
require('dotenv').config

const Profile = require('../models/profile')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

// index



// new

router.get('/new', checkLogin, (req, res) => {
    res.render('profiles/new', {title: 'make your profile'})
})

// delete



// update



// create
// handled on first login
// see: ../utils/passport


// edit



// show

router.get('/:id', (req, res) => {
    Profile.Profile.findOne({owner: req.params.id})
        .then(profile => {
            console.log('found this profile', profile)
            res.render('profiles/show', {profile, title: `${profile.name}`})
        })
        .catch(error => console.error)
})

module.exports = router