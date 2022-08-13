import React, { useState } from 'react'
import avatar from '../assets/imageprofile.jpg'
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
        <div className="flex content-start p-4">
          <img
            src={avatar}
            className="rounded-full flex-initial max-h-12 w-12 sm:max-h-14 sm:w-14 mb-8 duration-150"
            alt="User profile"
          />
          <textarea
            id="post-input"
            rows={3}
            placeholder="What is on your pet mind?"
            value={inputText}
            className="flex-grow rounded font-sans placeholder-gray-400 self-start ml-3 sm:ml-4 mt-2 sm:mt-3 text-sm sm:text-base focus:outline-none"
            onChange={onChange}
          />
        </div>

        {/* Lower Half - Photo/Video & Post Buttons */}
        <div className="flex justify-between p-2 sm:p-4">
          <button className="flex items-center px-3 sm:px-4 sm:py-2 text-sm space-x-2 max-h-10 rounded-full bg-green-500 hover:bg-green-600 text-white duration-150">
            <FaPhotoVideo />
            <p>Photo/Video</p>
          </button>
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white sm:font-medium sm:text-base text-sm bg-green-500 hover:bg-green-600 duration-150"
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
