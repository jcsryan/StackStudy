import React, {useState} from 'react';
import './App.css';
import Card from '../src/components/cardbody/index'
import Navbar from './components/navbar'


function App() {
  const [currentPage, handlePageChange] = useState('About');
  

  return (
    <div className="App">
      <header className="App-header">
        <Navbar currentPage={currentPage} handlePageChange={handlePageChange}></Navbar>
      </header>
      <body>
      <Card ></Card>
      </body>     
      <footer>

      </footer>
    </div>
  );
}

export default App;
