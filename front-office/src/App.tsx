import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
