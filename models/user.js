'use strict'

// Deps
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = {
  name: String,
  password: String,
  scopes: Object
}

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema(UserSchema))
