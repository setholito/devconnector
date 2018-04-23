const express = require('express')
const router = express.Router()

// @route    GET api/users/test
// @desc     Tests users routes
// @acccess  Public
router.get('/test', (req, res) =>
    res.json({
        message: 'Users works.'
    })
)

module.exports = router
