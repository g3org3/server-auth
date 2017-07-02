'use stict'

const express = require('express')
const router = express.Router()
const Config = require('../config').config
const jwt = require('jsonwebtoken')
const checkScopes = require('../helpers/checkScopes')

router.get('/', (req, res) => {
  res.json({ message: 'hola' })
})

router.get('/me', checkScopes, (req, res) => {
  res.json({
    user: req.user || null,
    decoded: req.decoded,
    auth: !!req.user,
    error: !req.user
  })
})

router.get('/logout', (req, res) => {
  res.cookie('_id', '', { maxAge: 0 })
  res.json({
    statusCode: 200,
    message: 'logout'
  })
})

router.get('/token', (req, res, next) => {
  // passport.authenticate('local', function (err, user, info) {

  // if user is found and password is right
  // create a token
  var user = {
    username: 'admin',
    scopes: ['admin']
  }

  var token = jwt.sign(user, Config.jwtSecret, {})

  res.cookie('_id', token, { httpOnly: true, session: true })

  // return the information including token as JSON
  res.json({
    statusCode: 200,
    success: true,
    message: 'Enjoy your token!',
    token: token
  })
    // console.log(err, user, info)
    // if (err || !user) {
    //   return res.json({ auth: false, info })
    // }
    // return res.json({ auth: true, user })
  // })(req, res, next)
})

module.exports = router
