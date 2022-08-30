import React from 'react'
import Navbar from './views/common/Navbar'
import Footer from './views/common/Footer'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'
import Shopping from './views/Shopping'
import Community from './views/Community'
import Service from './views/Service'
import Profile from './views/Profile'
import Checkout from './views/Checkout'
import Product from './views/Product'
import Login from './views/Login'
import Register from './views/Register'
import RegisterAnimal from './views/RegisterAnimal'

const App = () => {
  return (
  <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping/" element={<Shopping />} />
      <Route path="/community/" element={<Community />} />
      <Route path="/service/" element={<Service />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="/checkout/" element={<Checkout />} />
      <Route path="/product/" element={<Product />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/register/animal" element={<RegisterAnimal/>} />
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
