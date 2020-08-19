const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  frontText: {
    type: String,
    required: true
  },
  backText: {
    type: String,
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
