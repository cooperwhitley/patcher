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

function create(req, res) {
    console.log('this is the req body', req.body);
    Profile.Profile.create(req.body)
        .then(profileDoc => {
            console.log('this is the profile returned from the db', profileDoc)
            return
        })
        .catch(error => console.error)
}

// edit



// show

router.get('/:id', (req, res) => {

})

module.exports = {
    router,
    create
}