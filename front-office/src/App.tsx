import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
