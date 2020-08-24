import gql from 'graphql-tag';


export const QUERY_USER = gql`
query users{
    users {
      username
      email
    }
  } 
`;


// export const QUERY_SUBJECT = gql`
//   query subject{
//     subjects{
//       _id
//       name
//       cards {
//         _id
//         frontText
//         backText
//       }
//     }
//   }
//   `;

  export const QUERY_CARDS = gql`
  query cards{
    cards {
      _id
      frontText
      backText
    }
  } 
  `;

  export const QUERY_ME = gql `
    query me {
        cards{
          _id
          frontText
          backText
        }
    }
  `;