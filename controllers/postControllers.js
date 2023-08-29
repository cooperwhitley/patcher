const express = require('express')
require('dotenv').config

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()


// index

router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            console.log('found these posts', posts)
            res.render('posts/index', {posts: posts, title: 'patchbay'})
        })
        .catch(error => console.error)
})

// new

router.get('/new', checkLogin, (req, res) => {
    res.render('posts/new', {title: 'make a patch'})
})

// delete



// update



// create

router.post('/', checkLogin, (req, res) => {
    req.body.owner = req.user._id
    console.log(req.body)
    Post.create(req.body)
        .then(post => {
            res.redirect(`/posts`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/posts/new')
        })
})

// edit



// show

module.exports = router