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

router.patch('/:id', checkLogin, (req, res) => {
    Profile.Profile.findById(req.params.id)
        .then(profile => {
            if (req.user && profile.owner == req.user.id) {
                profile.updateOne(req.body)
                res.redirect(`/profiles/${profile.id}`)
            } else {
                res.send('something went wrong, could not edit')
            }
        })
        // .then(data => {
        //     console.log('what is returned from updateOne', data)
        // })
        .catch(error => console.error)
})

// create
// handled on first login
// see: ../utils/passport


// edit

router.get('/edit/:id', checkLogin, (req, res) => {
    Profile.Profile.findById(req.params.id)
    .then(profile => {
        console.log('found this profile', profile)
        
        res.render('profiles/edit', { profile, jobList: Profile.jobList, cityList: Profile.cityList, title: `patcher - edit profile`})
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