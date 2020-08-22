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
    username: 'Jesse',
   
    email: 'pinkman@email.com',
    password: 'password12345',
    subjects: [
      {
        subjects: [subjects[0]._id]
      },
    ]
  });

  await User.create({
    username: 'Walter',
    email: 'white@email.com',
    password: 'password12345',
    subjects: [
      [subjects[1]._id]
    ]
  });

  await Card.deleteMany();

  await Card.create({
    frontText: "the mitochondria is the powerhouse of the cell biatch",
    backText: "SCIENCE FOOL"
  })

  console.log('users seeded');

  process.exit();
});
