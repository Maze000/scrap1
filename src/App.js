import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Consola from '../components/Consola';


const App = () => {
  return (
    <div>

      <Router>
       
          <Routes>
          
          <Route path="/" element={<Consola/>} />
        
          </Routes>
       
      </Router>
    </div>
  );
};

export default App;

