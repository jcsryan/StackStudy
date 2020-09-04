import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Footer = () => {

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: 'cs_test_v6TJxEz3PJcG8pdHpjOQry90c7zARfXE0SxLGMHU7uDRHgILfNdWP6Um' })
            })
        }
    }, [data]);

    return (
        <div>
            <footer>
            <h1>Donate:</h1>
            </footer>
        </div>
    );
};

export default Footer