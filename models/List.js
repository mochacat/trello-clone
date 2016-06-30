"use strict"

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  _board: Number,
  title: String,
  description: String,
});

module.exports = mongoose.model('list', listSchema)