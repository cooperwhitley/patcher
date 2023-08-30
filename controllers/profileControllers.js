const express = require('express')
require('dotenv').config

const Profile = require('../models/profile')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

// index



// new
// handled on first login
// see: ../utils/passport

// delete



// update



// create
// handled on first login
// see: ../utils/passport


// edit

router.get('/edit/:id', checkLogin, (req, res) => {
    Profile.findById(req.params.id)
    .then(profile => {
        console.log('found this profile', profile)
        
        res.render('profiles/edit', { profile, title: `Edit ${profile.name}`})
    })
    .catch(error => console.error)
})

// show

router.get('/:id', (req, res) => {
    Profile.Profile.findOne({owner: req.params.id})
        .then(profile => {
            console.log('found this profile', profile)
            res.render('profiles/show', {profile, title: `patcher - ${profile.name}`})
        })
        .catch(error => console.error)
})

module.exports = router