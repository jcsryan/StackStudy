const mongoose = require('mongoose');

const { Schema } = mongoose;

const Card = require('./Card');

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cards: [Card.schema]
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
