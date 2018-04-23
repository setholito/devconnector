const express = require('express')
const router = express.Router()

// @route    GET api/profile/test
// @desc     Tests profile routes
// @acccess  Private
router.get('/test', (req, res) =>
    res.json({
        message: 'Profile works.'
    })
)

module.exports = router
