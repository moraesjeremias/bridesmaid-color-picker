import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './views/welcomePage/WelcomePage.jsx';
import ColorsPickPage from './views/colorsPickPage/ColorsPickPage.jsx';


function App() {


  return (
    <Router>
      <Routes>

        <Route path='/'
        element={<WelcomePage/>}/>

        <Route
          path='/colors'
          element={<ColorsPickPage/>}
        />
      </Routes>
    </Router>
  )
}

export default App
