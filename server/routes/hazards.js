const express = require('express')
const Hazard = require('../models/Hazard')
const { isLoggedIn } = require('../middleware/auth')
const router = express.Router()


/** 
 * Get all hazards within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/hazards
 * */
// Route to get all hazards
router.get('/', (req, res, next) => {
    Hazard.find()
        .then(hazards => {
            res.json(hazards)
        })
        .catch(err => next(err))
})

/** 
 * Create a new hazard
 * TODO: Change this to a post so we can input a distance.
 * @example
 * POST /api/hazards
 * */
router.post('/', isLoggedIn, (req, res, next) => {
    let { description, incidentNumber, location, address, agency, date } = req.body
    Hazard.create({ description, incidentNumber, location, address, agency, date })
        .then(hazard => {
            res.json({
                success: true,
                hazard,
            })
        })
        .catch(err => next(err))
})

/** 
 * Get all hazards within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/hazards/search?lat=20&lon=-60
 * GET /api/hazards/search?lat=20&lon=-60&maxDist=100
 * */
// Route to get all hazards
router.get('/search', (req, res, next) => {
    const lat = req.query.lat || 25.756365
    const lon = req.query.lon || -80.375716
    const maxDist = req.query.maxDist || 32186.9 // 20 miles

    console.log(`Searching for hazards near ${lat}, ${lon} within ${maxDist} meters`)
    Hazard.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point", 
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        })
        .then(hazards => {
            res.json(hazards)
        })
        .catch(err => next(err))
})
module.exports = router