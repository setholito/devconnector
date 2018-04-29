const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Load Profile Models
const Profile = require('../../models/Profile')

// Load User Profile
const User = require('../../models/User')

// @route    GET api/profile/test
// @desc     Tests profile routes
// @acccess  Private
router.get('/test', (req, res) =>
    res.json({
        message: 'Profile works.'
    })
)

// @route    GET api/profile
// @desc     Get the current user profile
// @acccess  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {}

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user.'
                    return res.status(404).json(errors)
                }
            })
            .catch(err => res.status(404).json(err))
    }
)

// @route    GET api/profile/all
// @desc     Get all profiles
// @acccess  Public
router.get('/all', (req, res) => {
    const errors = {}

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles.'
                return res.status(404).json(errors)
            }

            res.json(profiles)
        })
        .catch(err =>
            res
                .status(404)
                .json({ profiles: 'There are no profiles available.' })
        )
})

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @acccess  Public

router.get('/handle/:handle', (req, res) => {
    const errors = {}

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user_id
// @acccess  Public
router.get('/user/:user_id', (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err =>
            res
                .status(404)
                .json({ profile: 'There is no profile for this user.' })
        )
})

// @route    POST api/profile
// @desc     Create or edit user profile
// @acccess  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body)

        // Check Validation
        if (!isValid) {
            // Return errors with 400 Status
            return res.status(400).json(errors)
        }

        // Get fields
        const profileFields = {}
        profileFields.user = req.user.id

        if (req.body.handle) profileFields.handle = req.body.handle
        if (req.body.company) profileFields.company = req.body.company
        if (req.body.website) profileFields.website = req.body.website
        if (req.body.location) profileFields.location = req.body.location
        if (req.body.bio) profileFields.bio = req.body.bio
        if (req.body.status) profileFields.status = req.body.status
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername

        // Skills - split into array
        if (typeof req.body.skills !== undefined) {
            profileFields.skills = req.body.skills.split(',')
        }

        // Social
        profileFields.social = {}

        if (req.body.youtube) profileFields.social.youtube = req.body.youtube
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
        if (req.body.instagram)
            profileFields.social.instagram = req.body.instagram

        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile))
            } else {
                // Create

                // Check for duplicates
                Profile.findOne({ handle: profileFields.handle }).then(
                    profile => {
                        if (profile) {
                            errors.handle = 'Handle already exists'
                            res.status(400).json(errors)
                        }

                        // Save Profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                    }
                )
            }
        })
    }
)

// @route    POST api/profile/experience
// @desc     Add experience to profile
// @acccess  Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body)

        // Check Validation
        if (!isValid) {
            // Return errors with 400 Status
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const {
                company,
                description,
                from,
                location,
                title,
                to,
                current
            } = req.body

            const newExp = {
                company,
                from,
                location,
                title,
                to,
                current,
                description
            }

            profile.experience.unshift(newExp)
            profile.save().then(profile => res.json(profile))
        })
    }
)

// @route    POST api/profile/education
// @desc     Add education to profile
// @acccess  Private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body)

        // Check Validation
        if (!isValid) {
            // Return errors with 400 Status
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            } = req.body

            const newEdu = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            }

            profile.education.unshift(newEdu)
            profile.save().then(profile => res.json(profile))
        })
    }
)

module.exports = router
