const express = require('express')
const Hazard = require('../models/Hazard')

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
router.post('/', (req, res, next) => {
    let { name, capitals, area, description } = req.body
    Hazard.create({ name, capitals, area, description })
        .then(hazard => {
            res.json({
                success: true,
                hazard,
            })
        })
        .catch(err => next(err))
})

module.exports = router