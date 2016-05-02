var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  title: String,
  description: String,
  lists: [{type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('board', boardSchema)