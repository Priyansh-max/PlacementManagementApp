/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Troublesigning from './pages/Troublesigning'
import Troublesigningsuccess from './pages/Troublesigningsuccess'
import Resetpassword from './pages/Resetpassword'
import Resetpasswordsuccess from './pages/Resetpasswordsuccess'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
            <Route path="/resetpasswordsuccess" element={<Resetpasswordsuccess />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/troublesigning" element={<Troublesigning />} />
            <Route path="/troublesigningsuccess" element={<Troublesigningsuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
