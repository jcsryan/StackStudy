import React from 'react';
import Sub1 from './sub1';
import Sub2 from './sub2';
import Sub3 from './sub3';
import Sub4 from './sub4';
import Sub5 from './sub5';
import Login from './login'
import Signup from './signup'
//import Navbar from '../navbar'


import { QUERY_USER, QUERY_SUBJECT, QUERY_CARD } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
function CardBody(props) {
    
  //  const { loading, data} = useQuery(QUERY_USER);
    const {  data} = useQuery(QUERY_CARD);
  const user = data?.users || [];
  const subject = data?.subjects || [];
 // console.log(subject)
   
     function renderCard (tab)  {
          switch(tab){
            case 'Sub1':
                return <Sub1/>
            case 'Sub2':
                return <Sub2/>
            case 'Sub3':
                return <Sub3/>
            case 'Sub4':
                return <Sub4/>
            case 'Sub5':
                return <Sub5/>
           case 'login':
                return <Login/>
            case 'signup':
                return <Signup/>
                default:
                  return <Login/>
        }
    } 
     
    
    return(
        <div className="container">
            <p>parent</p>
            
            <div classname="cardContainer">
            {renderCard(props.currentPage)}
            </div>
             </div>
    )
}

export default CardBody;
