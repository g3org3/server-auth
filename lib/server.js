'use strict'

// Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const Purdy = require('purdy')

// helpers
const Config = require('../config').config
const AuthRoutes = require('./auth')

// App Setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session(Config.session))
app.use(morgan(Config.morgan))
// app.use(passport.initialize())

// Handlers
app.use('/auth', AuthRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  if (Config.env !== Config.production) {
    Purdy(err)
    console.error(err.stack.split('\n').filter(line => line.indexOf('node_modules') === -1).join('\n'))
  }
  res.json(err.message)
})

// start the server
app.listen(Config.port, () => {
  console.log(`Server is running on :${Config.port}`)
  Purdy(Config)
})