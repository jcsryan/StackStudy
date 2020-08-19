const db = require('./connection');
const { User, Card, Subject } = require('../models');

db.once('open', async () => {

  await Subject.deleteMany();

  const subjects = await Subject.insertMany([
    {
      name: 'Math'
    },
    {
      name: 'History'
    },
    {
      name: 'English'
    },
    {
      name: 'Science'
    },
    {
      name: 'Health'
    }
  ]);

  console.log('Subjects seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'John',
    lastName: 'Ryan',
    email: 'john@email.com',
    password: 'password12345',
    orders: [
      {
        subjects: [subjects[0]._id, subjects[1]._id, subjects[2]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Israel',
    lastName: 'Berlanga',
    email: 'israel@email.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
