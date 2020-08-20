const mongoose = require('mongoose');

const { Schema } = mongoose;

const dummySchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

const Dummy = mongoose.model('Dummy', dummySchema);

module.exports = Dummy;