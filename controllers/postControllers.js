const express = require('express')
require('dotenv').config

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()


// index

router.get('/', (req, res) => {
    Post.find({})
        .populate('owner')
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

router.delete('/:id', checkLogin, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (req.user && post.owner == req.user.id) {
                return post.deleteOne()
            } else {
                res.send('something went wrong, could not delete')
            }
        })
        .then(data => {
            console.log('returned from deleteOne', data)
            res.redirect('/posts')
        })
        .catch(error => console.error)
})

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

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(post => {
            console.log('found this post', post)
            res.render('posts/show', {post, title: `${post.owner.name}: ${post.title}`})
        })
        .catch(error => console.error)
})

module.exports = router