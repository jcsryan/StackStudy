import React, {useState} from 'react';
import './App.css';
import Navbar from './components/navbar'
import CardBody from '../src/components/cardbody';
import Login from './components/login'

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({

  uri: '/graphql',
})

function App() {
  const [currentPage, handlePageChange] = useState('Sub1');

  return (
    <ApolloProvider client={client}>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange}></Navbar>
      <CardBody currentPage={currentPage} handlePageChange={handlePageChange}></CardBody>  
    </ApolloProvider>
  ); 
}

export default App;


/* 


*/