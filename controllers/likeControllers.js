const express = require('express')
require('dotenv').config()

const Post = require('../models/post')
const Like = require('../models/like')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

router.post('/:postId', checkLogin, (req, res) => {

    req.body.user = req.user._id
    Post.findById(req.params.postId)
        .then(post => {
            post.likes.push(req.body)

            return post.save()
        })
        // redirect
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        // handle errors
        .catch(error => console.error)
})


// router.delete('/:postId', checkLogin, (req, res) => {
//     const pId = req.params.postId

//     Post.findById(pId)
//         .then(post => {
//             Like.findOne
//             if (req.user && theComment.author == req.user.id) {
//                 theComment.deleteOne()

//                 return post.save()
//             } else {
//                 res.send('something went wrong - could not unlike')
//             }
//         })
//         // .then(post => {
//         //     res.redirect(`/posts/${post._id}`)
//         // })
//         .catch(error => console.error)
// })



module.exports = router