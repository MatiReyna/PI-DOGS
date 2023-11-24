import './App.css';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <LandingPage /> } />
        <Route path='/home' element={ <HomePage /> } />
      </Routes>
    </div>
  )
};
export default App;