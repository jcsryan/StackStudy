const { AuthenticationError } = require('apollo-server-express');
const { User, Subject, Card } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
    }
};

module.exports = resolvers;