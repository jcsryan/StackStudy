const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://michael:birthday@cluster0.dypb3.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost:StackStudy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
