import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_SUBJECT } from '../utils/mutations';
import { QUERY_SUBJECT, QUERY_ME } from '../utils/queries';

const SubjectForm = () => {

    const [name, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addSubject, { error }] = useMutation(ADD_SUBJECT, {
        update(cache, { data: { addSubject } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { subjects } = cache.readQuery({ query: QUERY_SUBJECT });
            cache.writeQuery({
              query: QUERY_SUBJECT,
              data: { subjects: [addSubject, ...subjects] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new thought to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, subjects: [...me.subjects, addSubject] } }
          });
        }
      });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add thought to database
            await addSubject({
                variables: { name }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch"
                  onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new thought..."
                    value={name}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SubjectForm;