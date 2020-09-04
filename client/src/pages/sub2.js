import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CARD } from '../utils/mutations';
import { QUERY_ME, QUERY_CARDS } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function refreshPage(){
  window.location.reload(false)
}

//import Sub3 from './sub3';
//import Auth from '../utils/auth';
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
      return <div className="center-me">
      <div className="flip-card">
      <div className="flip-card-inner" key={frontcard.id}>
        <div  className="flip-card-front"><br></br><br></br>{frontcard.frontText}</div>
        <div  className="flip-card-back"><br></br><br></br><br></br><br></br>{frontcard.backText}</div>
        </div>
        </div>
        </div>
      })}
       </div>
    </div>
  
   
    </div>
  );
};

export default Sub2;
