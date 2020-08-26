import React from 'react';

import {QUERY_CARDS} from '../utils/queries'
import { useQuery } from '@apollo/react-hooks';

function Sub4() {
    const {data} = useQuery(QUERY_CARDS)
    const card = data?.subjects[3] || []
    console.log(card)
    return(
        <div className="container">
            <div className="subjectlist">
                <ul>
               
                </ul>
            </div>
        <div classname="sub1container">
            <textarea className="usertext"></textarea>
            <p>4</p>
        </div>
         </div>
    )
}

export default Sub4;