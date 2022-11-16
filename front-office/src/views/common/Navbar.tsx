/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helpers, ApiRepository, JsonUser } from 'shared';

const Navbar = () => {
  const history = useLocation()
  const navigate = useNavigate()
  const [infoProfile, setInfoProfile] = useState(false)
  const [picture,setPicture] = useState<string>("")
  const [user,setUser] = useState<JsonUser.JsonUser>()
  const [isLogged, setLogged] = useState(Helpers.isLogged)

  const showInfo = () => {
    setInfoProfile(!infoProfile)
  }
  const [infoProfileMobile, setInfoProfileMobile] = useState(false)
  const showInfoMobile = () => {
    setInfoProfileMobile(!infoProfileMobile)
  }
  const [nav, setNav] = useState(false)
  const showNav = () => {
    setNav(!nav)
  }

  const getUserPicture = async () =>{
    if(Helpers.getUserId()){
     const data =  (await (ApiRepository.getPicture(Helpers.getUserId()!))).data
     setPicture(data!)
    }
  }

    const getUserInfo = async () => {
    const user = (await ApiRepository.getCurrentUser()).data
    if (user) {
      const userInfo = (await ApiRepository.getUserInfoById(user.id)).data
      setUser(userInfo)
    }
  }

  useEffect(() => {
    getUserPicture()
    getUserInfo()
  },[])

  return (
    <div data-aos="fade-up" data-aos-duration="500" className="">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                onClick={() => {navigate("/")}}
                style={{"filter": "invert(1)"}}
                  className="h-10 w-10 cursor-pointer"
                  src="/logoTransparent.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <span
                    style={{ backgroundColor: history.pathname === '/' ? 'indigo' : '' }}
                    className="hover:-translate-y-1 hover:scale-105 duration-300 text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium active"
                  >
                    <Link to="/">Dashboard</Link>
                  </span>
                  <span
                    style={{ backgroundColor: history.pathname === '/shopping/' ? 'indigo' : '' }}
                    className="hover:-translate-y-1 hover:scale-105 duration-300 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Link to="/shopping/">Shopping</Link>
                  </span>

                  <span
                    style={{ backgroundColor: history.pathname === '/community/' ? 'indigo' : '' }}
                    className="hover:-translate-y-1 hover:scale-105 duration-300 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Link to="/community/">Community</Link>
                  </span>
                </div>
              </div>
            </div>
            { user ?
            <div className="hidden md:block z-20	">
              <div className=" ml-4 flex items-center md:ml-6">
                <Link to="/checkout/">
                  <button
                    type="button"
                    className="hover:-translate-y-1 hover:scale-105 duration-300 bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="sr-only">favorites</span>
                  </button>
                </Link>
                <div  className="ml-3 relative">
                  <div>
                    <button 
                      onClick={showInfo}
                      type="button"
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={picture}
                        alt=""
                      />
                    </button>
                  </div>
                  {infoProfile && (
                    <div  
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      data-aos="zoom-in"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                      z-10
                    >
                      <span
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        <a className='cursor-pointer' onClick={() => {navigate("/profile/"); setInfoProfile(!infoProfile)}}>Your Profile</a>
                      </span>

                      <span
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        <a className='cursor-pointer' onClick={() => {navigate("/checkout/"); setInfoProfile(!infoProfile)}}>Cart</a>
                      </span>

                      <a
                      className='cursor-pointer block px-4 py-2 text-sm text-gray-700' onClick={() => {localStorage.clear(); navigate("/login"); setUser(null!); setInfoProfile(!infoProfile)}}
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div> :                 
                  <a onClick={() => navigate("/login")} className="hover:-translate-y-1 hover:scale-105 duration-300 text-gray-300 bg-indigo-800 hover:bg-indigo-900 cursor-pointer hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                </a>
            }
            <div   className="-mr-2 flex md:hidden ">
              <button
                onClick={showNav}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {nav && (
          <div  data-aos="zoom-in" className="md:hidden" id="mobile-menu">
            <div data-aos="zoom-in" className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <span
                style={{ backgroundColor: history.pathname === '/' ? 'indigo' : '' }}
                className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                <a className=' text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer block px-4 py-2 text-sm text-gray-700' onClick={() => {navigate("/"); setNav(!nav)}}>Dashboard</a>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/service/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <a className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer block px-4 py-2 text-sm text-gray-700' onClick={() => {navigate("/service/"); setNav(!nav)}}>Service</a>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/shopping/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <a className=' text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer block px-4 py-2 text-sm text-gray-700' onClick={() => {navigate("/shopping/"); setNav(!nav)}}>Shopping</a>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/community/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <a onClick={() => {navigate("/community/"); setNav(!nav)}}  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Community</a>
              </span>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700" onClick={showInfoMobile}>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={() => {navigate("/")}}
                    src={picture}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user?.firstName} {user?.lastName}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                </div>
                              </div>
              {infoProfileMobile && (
                <div  data-aos="zoom-in" className="mt-3 px-2 space-y-1">
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    <a onClick={() => {navigate("/profile/"); setNav(!nav)}} >Your Profile</a>
                  </span>

                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    <a onClick={() => {navigate("/checkout/"); setNav(!nav)}}>Cart</a>
                  </span>

                  <a onClick={() => {localStorage.clear(); navigate("/login"); setUser(null!); setNav(!nav)}}  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
