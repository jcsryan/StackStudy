import React, {useState} from 'react';
// add these two library import statements
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import Navbar from './pages/navbar'
import Cardbody from './pages/Cardbody'
import Footer from './pages/footer'
const client = new ApolloClient({
  
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});



function App() {
  const [currentPage, handlePageChange] = useState('Login');
  return (
    <ApolloProvider client = {client}>
      <ApolloHooksProvider client={client}>
        <Navbar currentPage={currentPage} handlePageChange={handlePageChange}></Navbar>
      <Cardbody currentPage={currentPage} handlePageChange={handlePageChange}></Cardbody>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
