import React from 'react';

import {QUERY_CARD} from '../utils/queries'
import { useQuery } from '@apollo/react-hooks';

function Sub2() {
    const {data} = useQuery(QUERY_CARD)
    const card = data?.subjects[1] || []
    console.log(card)
    return(
        <div className="container">
            <div className="subjectlist">
                <ul>
               
                </ul>
            </div>
        <div classname="sub1container">
            <textarea className="usertext"></textarea>
            <p>2</p>
        </div>
         </div>
    )
}

export default Sub2;