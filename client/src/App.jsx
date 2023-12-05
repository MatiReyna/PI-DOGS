import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Detail from './components/Detail/Detail';
import FormPage from './components/FormPage/FormPage';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes> 
        <Route path='/' element={ <LandingPage /> } /> 
        <Route path='/home' element={ <HomePage /> } />
        <Route path='home/detail/:id' element={ <Detail /> } />
        <Route path='/form' element={ <FormPage /> } />
      </Routes>
    </div>
  )
};

export default App;