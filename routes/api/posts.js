const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Post Model
const Post = require('../../models/Post')

// Profile Model
const Profile = require('../../models/Profile')

// Load validation
const validatePostInput = require('../../validation/post')

// @route    GET api/posts
// @desc     Get all the posts
// @acccess  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found.' }))
})

// @route    GET api/posts/:id
// @desc     Get post by id
// @acccess  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID.' })
        )
})

// @route    DELETE api/posts/:id
// @desc     Delete post by id
// @acccess  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User not authorized' })
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({ success: true }))
                        .catch(err =>
                            res
                                .status(404)
                                .json({ postnotfound: 'No Post found.' })
                        )
                })
                .catch(err =>
                    res
                        .status(404)
                        .json({ nopostfound: 'No post found with that ID.' })
                )
        })
    }
)

// @route    POST api/posts
// @desc     Create a new post
// @acccess  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body)

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        const { avatar, handle, text } = req.body
        const { id: user } = req.user

        const newPost = new Post({
            avatar,
            handle,
            text,
            user
        })

        newPost.save().then(post => res.json(post))
    }
)

// @route    POST api/posts/like/:id
// @desc     Like post
// @acccess  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(
                            item => item.user.toString() === req.user.id
                        ).length > 0
                    ) {
                        return res.status(400).json({
                            alreadyliked: 'User already liked this post.'
                        })
                    }

                    // Add user id to the likes array
                    post.likes.push({ user: req.user.id })

                    post.save().then(post => res.json(post))
                })
                .catch(err =>
                    res
                        .status(404)
                        .json({ nopostfound: 'No post found with that ID.' })
                )
        })
    }
)

// @route    POST api/posts/unlike/:id
// @desc     Unlike post
// @acccess  Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(
                            like => like.user.toString() === req.user.id
                        ).length == 0
                    ) {
                        return res.status(400).json({
                            notliked: 'You have not yet liked this post.'
                        })
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString)
                        .indexOf(req.user.id)

                    // Splice out of the array
                    post.likes.splice(removeIndex, 1)
                    post.save().then(post => res.json(post))
                })
                .catch(err => console.log(err))
        })
    }
)

// @route    POST api/posts/comment/:id
// @desc     Add comment to post
// @acccess  Private
router.post(
    '/:id/comment',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body)

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Post.findById(req.params.id)
            .then(post => {
                const { avatar, handle, text } = req.body
                const { id: user } = req.user

                const newComment = {
                    avatar,
                    handle,
                    text,
                    user
                }

                // Add to comments array
                post.comments.unshift(newComment)

                // Save
                post.save().then(post => res.json(post))
            })
            .catch(err =>
                res.status(404).json({ postnotfound: 'No post found.' })
            )
    }
)

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Remove comment from post
// @acccess  Private
router.delete(
    '/:id/comment/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment =>
                            comment._id.toString() === req.params.comment_id
                    ).length == 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnonexistent: 'Comment does not exist.' })
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id)

                // Splice out of the array
                post.comments.splice(removeIndex, 1)

                post.save().then(post => res.json(post))
            })
            .catch(err =>
                res.status(404).json({ postnotfound: 'No post found.' })
            )
    }
)

module.exports = router
