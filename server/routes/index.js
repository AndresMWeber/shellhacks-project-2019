const express = require('express')
const { isLoggedIn } = require('../middleware/auth')
const router = express.Router()

router.get('/secret', isLoggedIn, (req, res, next) => {
    res.json({
        secret: 42,
        user: req.user,
    })
})

router.get('/api-key', (req, res, next) => {
    res.json({
        GOOGLEMAPS_API_KEY: process.env.GOOGLEMAPS_API_KEY
    })
})

module.exports = router