import gql from 'graphql-tag';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARD = gql `
mutation addCards($frontText: String!, $backText: String!) {
  addCard(frontText:$frontText, backText: $backText) {
      _id
      frontText
    	backText
  }
}
`;

/*
export const DELETE_CARD = gql `
mutation deleteCard($id: ID!) {
  deleteCard($id: ID!) {
    _id
  }
}
`;
*/
// export const ADD_SUBJECT = gql`
//     mutation addSubject($name: String!) {
//         addSubject(name: $name) {
//             _id
//             name
//             cards {
//                 _id
//             }
//         }
//     }
// `;
