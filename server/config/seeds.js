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
    username: 'John',
   
    email: 'john@email.com',
    password: 'password12345',
    subjects: [
      {
        subjects: [subjects[0]._id, subjects[1]._id, subjects[2]._id]
      }
    ]
  });

  await User.create({
    username: 'Israel',
    email: 'israel@email.com',
    password: 'password12345'
  });

  await Card.deleteMany();

  await Card.create({
    frontText: "the mitochondria is the powerhouse of the cell biatch",
    backText: "SCIENCE FOOL",
    subjectId: ""
  })

  console.log('users seeded');

  process.exit();
});
