import gql from 'graphql-tag';

/*
export const QUERY_CARD = gql`
query Card($username: String) {
    Card(username: $username) {
        _id
        frontText
        backText
    }
}`;


export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        username
        email
    }
}`;
*/

export const QUERY_USER = gql`
query users{
    users {
      username
      email
    }
  } 
`;