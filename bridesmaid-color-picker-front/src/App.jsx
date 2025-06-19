import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Card from './components/Card.jsx';
import WelcomePage from './views/welcomePage/WelcomePage.jsx';


function App() {


  return (
    <Router>
      <Routes>

        <Route path='/'
        element={<WelcomePage/>}/>

      </Routes>
    </Router>
  )
}

export default App
