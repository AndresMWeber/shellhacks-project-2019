const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const bcryptSalt = 10
const router = express.Router()
const User = require('../models/User')

router.post('/signup', (req, res, next) => {
    const { username, password, name } = req.body
    if (!username || !password) {
        res.status(400).json({ message: 'Indicate username and password' })
        return
    }
    User.findOne({ username })
        .then(userDoc => {
            if (userDoc !== null) {
                res.status(409).json({ message: 'The username already exists' })
                return
            }
            const newUser = new User({ username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(bcryptSalt)), name })
            return newUser.save()
        })
        .then(userSaved => {
            req.logIn(userSaved, () => {
                userSaved.password = undefined
                res.json(userSaved)
            })
        })
        .catch(err => next(err))
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body

    User.findOne({ username })
        .then(userDoc => {
            if (!userDoc) {
                next(new Error('Incorrect username '))
                return
            }

            if (!bcrypt.compareSync(password, userDoc.password)) {
                next(new Error('Password is wrong'))
                return
            }

            req.logIn(userDoc, () => {
                userDoc.password = undefined
                res.json(userDoc)
            })
        })
        .catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' })
            return
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, err => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' })
                return
            }

            res.json(req.user)
        })
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.json({ message: 'You are out!' })
})

module.exports = router