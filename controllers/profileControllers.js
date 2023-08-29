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
// see: ../utils/passport


// edit



// show

router.get('/:id', (req, res) => {

})

module.exports = router