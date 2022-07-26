import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'
import Shopping from './views/Shopping'
import Community from './views/Community'
import Service from './views/Service'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping/" element={<Shopping />} />
      <Route path="/community/" element={<Community />} />
      <Route path="/service/" element={<Service />} />
    </Routes>
  )
}

export default App
