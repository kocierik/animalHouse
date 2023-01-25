import React, { Dispatch, SetStateAction } from 'react'
import { FaHeart } from 'react-icons/fa'
import { ApiRepository } from 'shared'

const LikeButtons = (props: { likes: number, forumId: string, isLiked: boolean, setIsLiked: Dispatch<SetStateAction<boolean>> }) => {


  const handlePostLike = async (): Promise<void> => {
    if (props.isLiked) {
      await ApiRepository.editForumPost(localStorage.getItem('userId')!, props.forumId, { likes: props.likes - 1 })
    } else {
      await ApiRepository.editForumPost(localStorage.getItem('userId')!, props.forumId, { likes: props.likes + 1 })
    }
    props.setIsLiked(!props.isLiked)
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
        <p>{props.isLiked ? 'Liked' : 'Like'} {props.isLiked ? props.likes + 1 : props.likes}</p>
      </button>

    </div>
  )
}

export default LikeButtons
