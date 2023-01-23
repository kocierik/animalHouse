import React, { useState } from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import './PostCard.css'

const PostCard = (props) => {
  const [inputText, setInputText] = useState()

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      props.addPostProps(inputText)
      setInputText('')
    } else {
      alert('You did not enter anything. Please enter text before submitting your post.')
    }
  }

  return (
    <>
      {/* Card Base */}
      <div className="flex-row   container max-w-md sm:max-w-xl mb-14 h-auto p-2 rounded-lg shadow-md divide-y divide-solid bg-gray-50">
        {/* Top Half - Avatar & Text Box */}
        <div className="flex flex-col	 content-start p-4">
          <div className="flex mb-8">
            <span>
              <img
                src="/imageprofile.jpg"
                className="rounded-full flex-initial max-h-12 w-12 sm:max-h-14 sm:w-14  duration-150"
                alt="User profile"
              />
            </span>
            <div className="flex flex-1 px-5 items-center">
              <span className="font-black	text-lg	">Erik Koci</span>
            </div>
          </div>
          <div className="flex">
            <textarea
              id="post-input"
              rows={3}
              placeholder="What is on your pet mind?"
              value={inputText}
              className="flex-grow rounded font-sans placeholder-gray-400 self-start ml-3 sm:ml-4 mt-2 sm:mt-3 text-sm sm:text-base focus:outline-none"
              onChange={onChange}
            />
          </div>
        </div>

        {/* Lower Half - Photo/Video & Post Buttons */}
        <div className="flex justify-end p-2 sm:p-4">
          <button
            className="hover:-translate-y-1 hover:scale-105 duration-300 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white sm:font-medium sm:text-base text-sm bg-indigo-800 hover:bg-indigo-900 duration-150"
            onClick={handleSubmit}
          >
            Post It
          </button>
        </div>
      </div>
    </>
  )
}

export default PostCard
