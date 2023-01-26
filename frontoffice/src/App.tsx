import React from 'react'
import Navbar from './views/common/Navbar'
import Footer from './views/common/Footer'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './views/Home'
import Shopping from './views/Shopping'
import Community from './views/Community'
import Service from './views/Service'
import Profile from './views/profile/Profile'
import Checkout from './views/Checkout'
import Product from './views/Product'
import Login from './views/Login'
import Adoption from './views/Adoption'
import Register from './views/Register'
import RegisterAnimal from './views/RegisterAnimal'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Service />} />
        <Route path="/shopping/" element={<Shopping />} />
        <Route path="/community/" element={<Community />} />
        {/* <Route path="/home/" element={<Home />} /> */}
        <Route path="/profile/" element={<Profile />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/shopping/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/animal" element={<RegisterAnimal />} />
        <Route path="/adoption" element={<Adoption/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
