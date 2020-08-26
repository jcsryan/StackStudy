import React from 'react';

import {QUERY_CARDS} from '../utils/queries'
import { useQuery } from '@apollo/react-hooks';

function Sub5() {
    const {data} = useQuery(QUERY_CARDS)
    const card = data?.subjects[4] || []
    console.log(card)
    return(
        <div className="container">
            <div className="subjectlist">
                <ul>
               
                </ul>
            </div>
        <div classname="sub1container">
            <textarea className="usertext"></textarea>
            <p>5</p>
        </div>
         </div>
    )
}

export default Sub5;