const { AuthenticationError } = require('apollo-server-express');
const { User, Card } = require('../models');
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
          // get all cards
          cards: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Card.find(params).sort({ createdAt: -1 });
          },
        // get Card by id
        card: async (parent, {_id }) => {
            return Card.findOne({ _id });
        },
        donation: async (parent, args, context) => {
          const donation = new donation({ donations: args.donations });
          const { donations } = await donation.populate('donations').execPopulate();
          const line_items = [];

          for (let i = 0; i < donations.length; i++) {
            // generate donation id
            const donation = await stripe.donations.create({
              name: donations[i].name,
              description: donations[i].description
            });

            // generate price id using the donation id
            const price = await stripe.prices.create({
              donation: donation.id,
              unit_amount: donations[i].price * 100,
              currency: 'usd',
            });

            // add price id to the line items array
            line_items.push({
              price: price.id,
              quantity: 1
            });
          }
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/cancel'
          });
          
          return { session: session.id };
        }
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
        addCard: async (parent, args, context) => {
            if (context.user) {
                const card = await Card.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { cards: card.frontText, cards: card.backText }},
                    { new: true }
                );

                return card;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteCard({ params }, res) {
          Card.findOneAndDelete({ _id: params.id })
            .then(dbCardData => {
              if (!dbCardData) {
                res.status(404).json({ message: 'No Card found with this id!' });
                return;
              }
              res.json(dbCardData);
            })
            .catch(err => res.status(400).json(err));
        }
    }
};

module.exports = resolvers;