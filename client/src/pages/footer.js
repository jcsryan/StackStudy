import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_DONATION } from '../utils/queries';

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const session = stripe.checkout.sessions.retrieve(
    'cs_test_i1IU2VmKp0Zt3UeN9VUqyFZid3yN1F14sFViByN3h1ussOVyQ44NYcoj'
    );


const Footer = () => {
    const newSession = session;
    const data = 99;
    const [isClicked, setClicked] = useState(false);
    function buttonPress(status) {
        setClicked(status.isClicked)
    }
    useEffect(() => {
         stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: 'cs_test_i1IU2VmKp0Zt3UeN9VUqyFZid3yN1F14sFViByN3h1ussOVyQ44NYcoj' })
            })
        
    }, [data]);
    if (buttonPress =! isClicked) {
    return (
        <div>
            <button onClick={buttonPress}>Donate $0.99!</button>
        </div>
    )
    }
};

export default Footer

