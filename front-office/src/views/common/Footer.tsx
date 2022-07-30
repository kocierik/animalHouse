import React from 'react'

const Footer = () => {
  return (
    <footer className="p-2 color_footer rounded-lg shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-around">
        <a className="flex items-center mb-4 sm:mb-0">
          {/* <img src={require('./assets/animalLogo.png')} className="mr-5 h-20 w-18" alt="AnimalHouse Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">AnimalHouse</span>
        </a>
        <ul className="flex flex-wrap items-center justify-center mb-6 text-sm text-black-500 sm:mb-0 dark:text-black-900">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-black-500 sm:text-center dark:text-black-400">
        © 2022{' '}
        <a href="#" className="hover:underline">
          AnimalHouse
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  )
}

export default Footer
