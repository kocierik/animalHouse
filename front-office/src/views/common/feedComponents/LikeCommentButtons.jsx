import React from 'react'
// import { FaCommentDots, FaHeart } from 'react-icons/fa'

const LikeCommentButtons = (props) => {
  function handlePostLike() {
    props.postLikeHandler()
  }

  function handleDrawerInteraction() {
    props.drawerHandler()
  }

  return (
    <div
      className={
        props.drawerState
          ? 'flex justify-start pl-2 pb-3 bg-gray-100'
          : 'flex justify-start pl-2 pb-3 bg-gray-100 rounded-b-lg'
      }
    >
      {/* Like Button */}
      <button
        className={
          props.isLiked
            ? 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-red-500 duration-150'
            : 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-red-500 duration-150'
        }
        onClick={() => handlePostLike()}
      >
        {/* <FaHeart className="fill-current" /> */}
        <p>{props.isLiked ? 'Liked' : 'Like'}</p>
      </button>

      {/* Comment Button */}
      <button
        className="flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-blue-500 duration-150"
        onClick={() => handleDrawerInteraction()}
      >
        {/* <FaCommentDots className='fill-current' /> */}
        <p>Comment</p>
      </button>
    </div>
  )
}

export default LikeCommentButtons
