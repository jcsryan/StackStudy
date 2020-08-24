import React, {useState } from 'react';
import { useMutation } from '@apollo/react-hooks';


import {QUERY_CARD, QUERY_ME} from '../utils/queries'
import {ADD_CARD} from '../utils/mutations'


export default function Sub1() {
    const [newCard] = useMutation(ADD_CARD) 
    const [formState, setFormState] = useState({ backText: '', frontText: ''})

    const handleFormSubmit= async event => {
        event.preventDefault();
        const mutationResponse = await newCard({
            variables: {
                frontText: formState.frontText,
                backText: formState.backText
            }
        });
        const token = mutationResponse.data.newCard.token;
    }
    const handleChange = event => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (

        <div className="container my-1">
  
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <textarea
              placeholder="First"
              name="firstName"
              type="firstName"
              id="frontText"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <textarea
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
        
            <button type="submit">
              Submit
            </button>
        </form>
      </div>
    );
  
  }


/*
const Sub1 = () => {
    const [{backText, frontText}, setText] = useState('')
    
    const [characterCount, setCharacterCount] = useState(0);
    const [addCard,{error}] = useMutation(ADD_CARD,
        {
            update(cache, {data: {addCard}}){
                try{
                    const {cards} = cache.readQuery({query: QUERY_CARD});
                    cache.writeQuery({
                        query: QUERY_CARD,
                        data: { cards: [addCard, ...cards]}
                    });
                } catch(e){
                    console.error(e)
                }
                const{me} = cache.readQuery({query: QUERY_ME});
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: { ...me, cards:[...me.subjects.cards, addCard]
                    }}
                });
            }
        }) 
       const handleChange = event => {
           if(event.target.value.length <= 280){
               setText(event.target.value);
               setCharacterCount(event.target.value.length)
           }
       }
       const handleFormSubmit = async event => {
           event.preventDefault();
           try{
               await addCard({
                   variables:{backText, frontText}
               });
               setText('');
               setCharacterCount(0)
           } catch(e){
               console.error(e)
           }
       };
       return(
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
                    value={frontText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <textarea
                    placeholder="Here's a new thought..."
                    value={backText}
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
export default Sub1;


function Sub1() {
    const {data} = useQuery(QUERY_CARD)
    const card = data?.subjects[0] || []
    console.log(card)
    
    
}


export default Sub1;
*/