import React from 'react'

const Setting = (props: { setCanWrite: (arg0: boolean) => void; canWrite: any }) => {
  return (
    
    <div className='flex p-5 self-end' onClick={() => props.setCanWrite(!props.canWrite)}>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="inline-block flex flex-end text-gray-500  flex-col justify-end  focus:ring-2 focus:outline-none focus:ring-gray-100  rounded-lg text-sm"
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
      >
        <ul className="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100   "
            >
              Edit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100   "
            >
              Export Data
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100   "
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Setting
