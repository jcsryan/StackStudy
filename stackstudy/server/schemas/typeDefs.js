// import the gql tagged template function
const { gql } = require('apollo-server-express');


//create our typeDefs

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
    username: String
    email: String
    cards: [Card]
  }


  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addCard(subjects: [ID]!, frontText: String!, backText: String!): Card
    addSubject(cards: [ID]!, name: String!): Subject
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateCard(_id: ID!, frontText: String!, backText: String!): Card
    updateSubject(_id: ID!, name: String!): Subject
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  
  type Auth {
    token: ID!
    user: User
  }
`;


// type Query {
//   cards(subject: ID, name: String): [Card]
//   card(_id: ID!): Card
//   user: User
//   subject(_id: ID!): Subject
// }

// export the typeDefs
module.exports = typeDefs;
