const express = require('express')
require('dotenv').config()

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

router.post('/:postId', checkLogin, (req, res) => {
    req.body.author = req.user._id
    Post.findById(req.params.postId)
        // save comment to post itself, as it does not need to be a separate entity
        .then(post => {
            post.comments.push(req.body)

            return post.save()
        })
        // redirect
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        // handle errors
        .catch(error => console.error)
})


router.delete('/:postId/:commentId', checkLogin, (req, res) => {
    const pId = req.params.postId
    const cId = req.params.commentId

    Post.findById(pId)
        .then(post => {
            const theComment = post.comments.id(cId)

            if (req.user && theComment.author == req.user.id) {
                theComment.deleteOne()

                return post.save()
            } else {
                res.send('something went wrong - could not delete comment')
            }
        })
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        .catch(error => console.error)
})



module.exports = router