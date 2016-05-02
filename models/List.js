var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  title: String,
  description: String
});

var listSchema = new mongoose.Schema({
  _board: {type: mongoose.Schema.Types.ObjectId},
  title: String,
  description: String,
  cards: [cardSchema]
});

module.exports = mongoose.model('list', listSchema)