import React from 'react'

const Footer = () => {
  return (
    <footer className=" color_footer rounded-lg shadow md:px-6 py-10">
      <div data-aos="zoom-in" data-aos-duration="500" className="sm:flex sm:items-center sm:justify-around p-10">
        <span className="flex justify-center mb-4 sm:mb-0">
          {/* <!-- <img src="./assets/animalLogo.png" className="mr-5 h-20 w-18" alt="AnimalHouse Logo" /> --> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">AnimalHouse</span>
        </span>
        <ul className="flex justify-between flex-wrap items-center justify-center mb-6 text-sm text-black-500 sm:mb-0 dark:text-black-900">
          <li className="flex hover:-translate-y-2 duration-300 mr-4 hover:bg-green-100 p-2 rounded md:mr-6">
            <a href="#">About</a>
          </li>
          <li className="flex mr-4 hover:bg-green-100 hover:-translate-y-2 duration-300 p-2 rounded md:mr-6">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="flex mr-4 hover:bg-green-100 hover:-translate-y-2 duration-300 p-2 rounded md:mr-6">
            <a href="#">Licensing</a>
          </li>
          <li className="flex no-underline hover:bg-green-100 hover:-translate-y-2 duration-300 p-2 rounded">
            <a href="#" className="">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <span className="block  text-sm text-black-500 sm:text-center dark:text-black-400 text-center">
        <div className="flex justify-center p-5">
          <div className="w-8 text-gray-500">
            <span className="hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="hover:-translate-y-3 duration-300 fill-current"
              >
                <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443v1.581z" />
              </svg>
            </span>
          </div>

          <div className="w-8 ml-2 text-gray-500">
            <span className="hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="hover:-translate-y-3 duration-300 fill-current"
              >
                <path d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.905 7.864c.004.082.005.164.005.244 0 2.5-1.901 5.381-5.379 5.381a5.335 5.335 0 0 1-2.898-.85c.147.018.298.025.451.025.886 0 1.701-.301 2.348-.809a1.895 1.895 0 0 1-1.766-1.312 1.9 1.9 0 0 0 .853-.033 1.892 1.892 0 0 1-1.517-1.854v-.023c.255.141.547.227.857.237a1.89 1.89 0 0 1-.585-2.526 5.376 5.376 0 0 0 3.897 1.977 1.891 1.891 0 0 1 3.222-1.725 3.797 3.797 0 0 0 1.2-.459 1.9 1.9 0 0 1-.831 1.047 3.799 3.799 0 0 0 1.086-.299 3.834 3.834 0 0 1-.943.979z" />
              </svg>
            </span>
          </div>
          <div className="w-8 ml-2 text-gray-500">
            <span className="hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="hover:-translate-y-3 duration-300 fill-current"
              >
                <path d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08 0-.443-.156-.856-.527-1.197-.622-.571-1.671-.268-2.862-.268zM8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908.657.406.657.908c.001.502-.293.91-.657.91zm3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908.001.502-.293.91-.656.91zM10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6 9.6-4.298 9.6-9.6S15.302.4 10 .4zm.876 13.539c-.172 0-.514 0-.876.002-.362-.002-.704-.002-.876-.002-.76 0-3.772-.059-3.772-3.689 0-.834.286-1.445.755-1.955-.074-.184-.078-1.232.32-2.236 0 0 .916.1 2.301 1.051.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051.398 1.004.395 2.053.32 2.236.469.51.755 1.121.755 1.955-.001 3.632-3.013 3.69-3.773 3.69z" />
              </svg>
            </span>
          </div>
        </div>
        © 2022{' '}
        <span className="hover:underline">
          AnimalHouse
        </span>
        . All Rights Reserved.
      </span>
    </footer>
  )
}

export default Footer
