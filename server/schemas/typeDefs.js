const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Subject {
    name: String
  }

  type Card {
    _id: ID
    frontText: String
    backText: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    cards: [Card]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    cards(subject: ID, name: String): [Card]
    card(_id: ID!): Card
    user: User
    subject(_id: ID!): Subject
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addCard(subjects: [ID]!, frontText: String!, backText: String!): Card
    addSubject(cards: [ID]!, name: String!): Subject
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateCard(_id: ID!, frontText: String!, backText: String!): Card
    updateSubject(_id: ID!, name: String!): Subject
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
