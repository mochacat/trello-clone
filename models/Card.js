"use strict"

const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  _list: String,
  title: String,
  description: String
})

module.exports = mongoose.model('card', cardSchema)