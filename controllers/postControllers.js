const express = require('express')
require('dotenv').config

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()


// index

router.get('/', (req, res) => {
    Post.find({})
        // nested populate to grab post author profile info
        .populate({
            path: 'owner',
            populate: {
                path: 'profile',
                model: 'Profile'
            }
        })
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
    if (req.body.spotify){ 
        // ensure spotify links are formatted the same way before storing
        req.body.spotify = ( req.body.spotify.indexOf('spotify.com/') === -1 ) ? 'spotify.com/' + req.body.spotify : req.body.spotify
        req.body.spotify = ( req.body.spotify.indexOf('open.') === -1 ) ? 'open.' + req.body.spotify : req.body.spotify
        req.body.spotify = ( req.body.spotify.indexOf('://') === -1 ) ? 'https://' + req.body.spotify : req.body.spotify
        // cut off all but the ending of the spotify link as it is the only needed information for grabbing a specific item for embed
        req.body.spotify = req.body.spotify.split('').slice(25).join('')
    }
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
        // populate post owner profile
        .populate({
            path: 'owner',
            populate: {
                path: 'profile',
                model: 'Profile'
            }
        })
        // populate comment owner profile
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            }
        })
        .populate('comments.author')
        .then(post => {
            console.log('found this post', post)
            res.render('posts/show', {post, title: `${post.owner.name}: ${post.title}`})
        })
        .catch(error => console.error)
})

module.exports = router