import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD, /*DELETE_CARD */} from '../utils/mutations';
import { QUERY_ME, QUERY_CARDS } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';



//import Sub3 from './sub3';
//import Auth from '../utils/auth';
function refreshPage(){
  window.location.reload(false)
}



const Sub2 = () => {
    const {data} = useQuery(QUERY_CARDS)
    const card = data?.cards || []
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addCard] = useMutation(ADD_CARD, {
        update(cache, {data: {addCard}}) {
            try{
            // read what's in cache
            const {cards} = cache.readQuery({query: QUERY_CARDS});
            // prepend the newest thought to array
            cache.writeQuery({
                query: QUERY_CARDS,
                data: {cards: [addCard, ...cards]}
            });
        } catch (e) {
            console.error(e);
        }
        //update me object cache with new thought
        const{me} = cache.readQuery({query: QUERY_ME});
         cache.writeQuery({
             query: QUERY_ME,
             data: {me: {...me,cards:[...me.cards,addCard]}}
         });
        }
    });
    const handleFrontChange = event => {
        if(event.target.value.length <= 280) {
            setFrontText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleBackChange = event => {
      if(event.target.value.length <= 280) {
          setBackText(event.target.value);
          setCharacterCount(event.target.value.length);
      }
  };
    const handleFormSubmit = async event => {
        event.preventDefault();
       try {
           //add to db
           await addCard({
               variables: {frontText, backText}
           });
           //clear form
           setFrontText('');
           setBackText('');
           setCharacterCount(0);
       } catch (e) {
           console.error(e)
       }
       refreshPage();
    };
  
 /*  const [deleteCard] = useMutation(DELETE_CARD)
   deleteCard({
     variables: {id: card.id},
     update: (cache) => {
       const existingCards = cache.readQuery({ query: QUERY_CARDS})
       const newCards = existingCards.cards.filter(t => (t.id !== card.id))
       cache.writeQuery({
         query: QUERY_CARDS,
         data: {cards: newCards}
       })
     }
   })
    */
   
  return (
    <div>
        <div className='logincard'>
          <div className='login-card-outer'>
            <div className='login-card-header'>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280</p>
              <div className='login-card-body'>
      <form className="flex-row justify-center justify-space-between-md align-stretch"
      onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Enter Front Text"
          value={frontText}
          className="form-input col-12 col-md-9"
          onChange={handleFrontChange}
        ></textarea>
        <textarea
          placeholder="Enter Back Text"
          value={backText}
          className="form-input col-12 col-md-9"
          onChange={handleBackChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
      </div></div></div></div>
      <div className="wholecard">
        <div className="cardflip-div">
      {card.map(frontcard =>{
      return <div className="flip-card" id="flip-card">
      <div className="flip-card-inner" key={frontcard.id}>
        <div  className="flip-card-front"><br></br><br></br>{frontcard.frontText}</div>
        <div  className="flip-card-back"><br></br><br></br><br></br><br></br>{frontcard.backText}</div>
        </div>
        <button className="btn btn2 col-12 col-md-3" type="submit"  >Delete</button>
        </div>
        
      })}
      
       </div>
    </div>
  
   
    </div>
  );
};

export default Sub2;

/*
   {card.map(frontcard =>{
        return <div key={frontcard.id}>
        <div className="frontcard">{frontcard.frontText}</div>
        </div>
      })}

      {card.map(frontcard =>{
        return <div key={frontcard.id}>
        <div className="backcard">{frontcard.backText}</div>
        </div>
      })} 


import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../utils/mutations';
import { QUERY_CARDS, QUERY_ME } from '../utils/queries';
import Sub3 from './sub3';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';

const Sub2 = () => {
    const [addCard, { error }] = useMutation(ADD_CARD);

    const [formState, setFormState] = useState({frontText:'', backText:''});

    const handleFormSubmit = async event => {
        event.preventDefault();

        const mutationResponse = await addCard({
            variables: {
                frontText: formState.frontText,
                backText: formState.backText
            }
        });
    }

    const handleChange = event => {
        const { name, value } = event.target;
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
            <label htmlFor="firstName">Front Text:</label>
            <textarea
              placeholder="Front"
              name="front"
              type="firstName"
              id="frontText"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Back Text</label>
            <textarea
              placeholder="Back"
              name="back"
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
};

export default Sub2;
*/