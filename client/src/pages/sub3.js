import React from 'react';

import {QUERY_CARD} from '../utils/queries'
import { useQuery } from '@apollo/react-hooks';

function Sub3() {
    const {data} = useQuery(QUERY_CARD)
    const card = data?.subjects[2] || []
    console.log(card)
    return(
        <div className="container">
            <div className="subjectlist">
                <ul>
               
                </ul>
            </div>
        <div classname="sub1container">
            <textarea className="usertext"></textarea>
            <p>3</p>
        </div>
         </div>
    )
}

export default Sub3;