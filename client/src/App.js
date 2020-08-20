import React, {useState} from 'react';
import './App.css';
import Navbar from './components/navbar'
import CardBody from '../src/components/cardbody/index';
import Login from './components/login'

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  const [currentPage, handlePageChange] = useState('Sub1');

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <Navbar currentPage={currentPage} handlePageChange={handlePageChange}></Navbar>
      </header>
      <body>
      <CardBody currentPage={currentPage} handlePageChange={handlePageChange}></CardBody>
      </body>     
      <footer>

      </footer>
    </div> 
    </ApolloProvider>
  ); 
}

export default App;
