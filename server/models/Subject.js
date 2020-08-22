const mongoose = require('mongoose');
//const Card = require('./Card');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  frontText: {
    type: String,
    required: true
  },
  backText: {
    type: String,
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
    
  }}
);

let Card = cardSchema

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cards: [Card]
});



const Subject =model('Subject', subjectSchema);

module.exports = Subject;