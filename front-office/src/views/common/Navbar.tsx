/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helpers } from 'shared'

const Navbar = () => {
  const history = useLocation()
  const [infoProfile, setInfoProfile] = useState(false)

  const [isLogged, setLogged] = useState(Helpers.isLogged)

  const showInfo = () => {
    setInfoProfile(!infoProfile)
  }
  const [infoProfileMobile, setInfoProfileMobile] = useState(false)
  const showInfoMobile = () => {
    setInfoProfileMobile(!infoProfileMobile)
  }
  const [nav, setNar] = useState(false)
  const showNav = () => {
    setNar(!nav)
  }
  return (
    <div         data-aos="fade-up"  data-aos-duration="1500" className="">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
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
                    style={{ backgroundColor: history.pathname === '/service/' ? 'indigo' : '' }}
                    className="hover:-translate-y-1 hover:scale-105 duration-300 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Link to="/service/">Service</Link>
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
                <div className="ml-3 relative">
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
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  {infoProfile && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                      z-10
                    >
                      <a
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                      >
                        <Link to="/profile/">Your Profile</Link>
                      </a>

                      <a
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-1"
                      >
                        <Link to="/checkout/">Cart</Link>
                      </a>

                      <a
                        className="block px-4 py-2 text-sm text-gray-700"
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
            </div>
            <div className="-mr-2 flex md:hidden">
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
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <span
                style={{ backgroundColor: history.pathname === '/' ? 'indigo' : '' }}
                className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                <Link to="/">Dashboard</Link>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/service/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/service/">Service</Link>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/shopping/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/shopping/">Shopping</Link>
              </span>

              <span
                style={{ backgroundColor: history.pathname === '/community/' ? 'indigo' : '' }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Link to="/community/">Community</Link>
              </span>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700" onClick={showInfoMobile}>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
                <Link to="/checkout/" className="flex flex-1">
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex flex-1 justify-end  flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">cart</span>

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
                  </button>
                </Link>
              </div>
              {infoProfileMobile && (
                <div className="mt-3 px-2 space-y-1">
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    <Link to="/profile/">Your Profile</Link>
                  </a>

                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                    <Link to="/checkout/">Cart</Link>
                  </a>

                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
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
