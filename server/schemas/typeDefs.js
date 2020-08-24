// import the gql tagged template function
const { gql } = require('apollo-server-express');


//create our typeDefs

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  subjects: [Subject]
}

type Subject {
  _id: ID
  name: String
  cards: [Card]
}

  type Card {
    _id: ID
    frontText: String
    backText: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    subjects(name: String): [Subject]
    subject(_id: ID!): Subject
    cards: [Card]
    card(_id: ID!): Card
  }

  type Mutation {
    addCard(subjectId: ID, frontText: String, backText: String): Subject
    addSubject(name: String!): Subject
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  
  type Auth {
    token: ID!
    user: User
  }
`;

//updateUser(username: String, email: String, password: String): User
//updateCard(_id: ID!, frontText: String!, backText: String!): Card
//updateSubject(_id: ID!, name: String!): Subject

// export the typeDefs
module.exports = typeDefs;