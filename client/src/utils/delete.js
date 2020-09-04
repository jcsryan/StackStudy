import React, { useState } from 'react';
//import { Mutation } from'@apollo/react-hooks';
import {Mutation} from 'react-apollo';
import { ADD_CARD, DELETE_CARD } from '../utils/mutations';
import { QUERY_ME, QUERY_CARDS } from '../utils/queries';


const DeleteButton = ({id}) => {
    return (
      <Mutation
        mutation={DELETE_CARD}
        update={(cache, { data: { deleteCard } }) => {
          const { cards } = cache.readQuery({ query: QUERY_CARDS });
          cache.writeQuery({
            query: QUERY_CARDS,
            data: { cards: cards.filter(e => e.id !== id)}
          });
        }}
        >
        {(deleteCard, { data }) => (
          <button className="btn btn2 col-12 col-md-3"
            onClick={e => {
              deleteCard({
                variables: {
                  id
                }
              });
            }}
          >Delete</button>            
        )}
      </Mutation>
    );
  };
  
  export default DeleteButton;