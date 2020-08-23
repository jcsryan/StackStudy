const { AuthenticationError } = require('apollo-server-express');
const { User, Subject, Card } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },

        //get all users
        users: async () => {
            return User.find()
              .select('-__v -password')
          },
          // get a user by username
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
          },
          // get all subjects
          subjects: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Subject.find(params).sort({ createdAt: -1 });
          },
        // get Subject by id
        subject: async (parent, {_id }) => {
            return subject.findOne({ _id });
        },
        // get all cards
       // cards: async (parent, { username }) => {
        //    const params = username ? { username } : {};
        //    return Card.find(params).sort({ createdAt: -1 });
       //   },
        // get Card by id
      //  card: async (parent, {_id }) => {
      //      return card.findOne({ _id });
       // },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addSubject: async (parent, args, context) => {
            if (context.user) {
                const subject = await Subject.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { subjects: subject._id }},
                    { new: true }
                );

                return subject;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addCard: async (parent, { subjectId, frontText, backText }, context) => {
          if (context.user) {
            const updatedSubject = await Subject.findOneAndUpdate(
              { _id: subjectId },
              { $push: { cards: { frontText, backText, username: context.user.username } } },
              { new: true, runValidators: true }
            );
        
            return updatedSubject;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },

    }
};

module.exports = resolvers;