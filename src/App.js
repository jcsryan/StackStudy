/*import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Provider } from 'react-redux';



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
  return (
  <ApolloProvider> 
    <Router>
    <div>
      <Provider store={store}>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/success" component={Success} />
          <Route component={NoMatch} />
        </Switch>
      </Provider>
    </div>
  </Router>
  </ApolloProvider>
  )
}

export default App;


*/










import React, {useState} from 'react';
import './App.css';
import Navbar from './components/navbar'
import CardBody from '../src/components/cardbody/index';


function App() {
  const [currentPage, handlePageChange] = useState('Sub1');
  

  return (
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
  );
}

export default App;
