const mongoose = require('mongoose');
const { User, Thought } = require('../models');

console.log('Models:', require('../models'));
console.log('User:', User);
console.log('Thought:', Thought);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nosql_noproblem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSeed = [
  {
    username: 'amy',
    email: 'amy@gmail.com'
  },
  {
    username: 'tammy',
    email: 'tammy@gmail.com'
  }
];

const thoughtSeed = [
  {
    thoughtText: 'This is a thought from amy.',
    username: 'amy'
  },
  {
    thoughtText: 'This is a thought from tammy.',
    username: 'tammy'
  }
];

const seedDatabase = async () => {
    try {
      await User.deleteMany({});
      const userInsertResult = await User.insertMany(userSeed);
      console.log(userInsertResult.length + ' user records inserted!');
  
      await Thought.deleteMany({});
      const thoughtInsertResult = await Thought.insertMany(thoughtSeed);
      console.log(thoughtInsertResult.length + ' thought records inserted!');
  
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

seedDatabase();
