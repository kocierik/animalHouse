import React from 'react'
import { FaCommentDots, FaHeart } from 'react-icons/fa'

const LikeButtons = (props: { isLiked: boolean }) => {


  function handlePostLike(): void {
    throw new Error('Function not implemented.')
  }

  return (
    // COLORE LIKE E COMMENTO STATIC
    <div className='flex justify-start pl-2 pb-3 ml-2  rounded-b-lg'>
      {/* Like Button */}
      <button
        className={
          props.isLiked
            ? 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-red-500 duration-150'
            : 'flex items-center px-2 pt-3 space-x-2 max-h-10 rounded-full bg-transparent text-gray-600 hover:text-red-500 duration-150'
        }
        onClick={() => handlePostLike()}
      >
        <FaHeart className="fill-current" />
        <p>{props.isLiked ? 'Liked' : 'Like'}</p>
      </button>

    </div>
  )
}

export default LikeButtons
