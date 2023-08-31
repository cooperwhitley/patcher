const express = require('express')
require('dotenv').config

const Profile = require('../models/profile')
const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

// index



// new
// handled on first login
// see: ../utils/passport

// delete



// update

router.patch('/:id', checkLogin, (req, res) => {
    for (i = 0; i < req.body.websites.length; i++) {
        if (req.body.websites[i].length){ 
            req.body.websites[i] = ((req.body.websites[i].indexOf('://') === -1) && (req.body.websites[i].indexOf('mailto:') === -1) ) ? 'http://' + req.body.websites[i] : req.body.websites[i]
        }
    }
    Profile.Profile.findById(req.params.id)
        .then(profile => {
            if (req.user && profile.owner == req.user.id) {
                return profile.updateOne(req.body)
            } else {
                res.send('something went wrong, could not edit')
            }
        })
        .then(data => {
                console.log('what is returned from updateOne', data)
                res.redirect(`/profiles/${req.user._id}`)
        })
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
        .populate('endorsements.author')
        .then(profile => {
            Post.find({owner: profile.owner})
                .populate('owner')
                .then(posts => {
                    console.log('found this profile', profile)
                    console.log('and these posts', posts)
                    res.render('profiles/show', {profile, posts, title: `patcher - ${profile.name}`})
                })
        })
        .catch(error => console.error)
})


module.exports = router