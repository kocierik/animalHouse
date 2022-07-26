import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'
import Shopping from './views/Shopping'
import Community from './views/Community'
import Service from './views/Service'
import Profile from './views/Profile'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping/" element={<Shopping />} />
      <Route path="/community/" element={<Community />} />
      <Route path="/service/" element={<Service />} />
      <Route path="/profile/" element={<Profile />} />
    </Routes>
  )
}

export default App
