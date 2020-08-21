import gql from 'graphql-tag';


export const QUERY_USER = gql`
query users{
    users {
      username
      email
    }
  } 
`;