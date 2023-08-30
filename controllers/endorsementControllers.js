const express = require('express')
require('dotenv').config()

const Profile = require('../models/profile')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

router.post('/:profileId', checkLogin, (req, res) => {

    req.body.author = req.user._id
    Profile.Profile.findById(req.params.profileId)
        .then(profile => {
            profile.endorsements.push(req.body)

            return profile.save()
        })
        // redirect
        .then(profile => {
            res.redirect(`/profiles/${profile.owner}`)
        })
        // handle errors
        .catch(error => console.error)
})


router.delete('/:profileId/:endorsementId', checkLogin, (req, res) => {
    const pId = req.params.profileId
    const eId = req.params.endorsementId

    Profile.Profile.findById(pId)
        .then(profile => {
            const theEndorsement = profile.endorsements.id(eId)

            if (req.user && theEndorsement.author == req.user.id) {
                theEndorsement.deleteOne()

                return profile.save()
            } else {
                res.send('something went wrong - could not delete endorsement')
            }
        })
        .then(profile => {
            res.redirect(`/profiles/${profile.owner}`)
        })
        .catch(error => console.error)
})



module.exports = router