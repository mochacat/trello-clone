"use strict"

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  description: String,
  pinned: { type: Boolean, default: false }
});

module.exports = mongoose.model('board', boardSchema)