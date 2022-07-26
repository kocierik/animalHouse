import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'
import Shopping from './views/Shopping'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping/" element={<Shopping />} />
    </Routes>
  )
}

export default App
