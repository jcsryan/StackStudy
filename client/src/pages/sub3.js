import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../utils/mutations';

const Sub3 = ({ subjectId }) => {

    const [{frontText, backText}, setBody] = useState('');
const [addCard, { error }] = useMutation(ADD_CARD);

    const handleFormSubmit = async event => {
        event.preventDefault();
        setBody('');

        await addCard({
            variables: { frontText, backText, subjectId }
          });
       
      };

  return (
    <div>
      <form className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Front text..."
          value={frontText}
          className="form-input col-12 col-md-9"
        ></textarea>
               <textarea
          placeholder="back text..."
          value={backText}
          className="form-input col-12 col-md-9"
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sub3;