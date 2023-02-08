import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { ApiRepository } from 'shared'

const LikeButtons = (props: { likes: number, postId: string, userLikes: string[], isLiked: boolean, setIsLiked: Dispatch<SetStateAction<boolean>> }) => {

  const [userId, setUserId] = useState(props.userLikes.find((value) => value == localStorage.getItem('userId')))

  const handlePostLike = async (): Promise<void> => {
    if (userId) {
      const likeUsers = props.userLikes.filter((value) => value !== userId)

      await ApiRepository.editForumPost(localStorage.getItem('userId')!, props.postId, { userLikes: likeUsers })
      setUserId('')
    } else {

      await ApiRepository.editForumPost(localStorage.getItem('userId')!, props.postId, { userLikes: [...props.userLikes, localStorage.getItem('userId')!] })
      // props.userLikes.push(localStorage.getItem('userId')!)
      setUserId(localStorage.getItem('userId')!)
    }
    props.setIsLiked(!props.isLiked)
  }


  return (
    // COLORE LIKE E COMMENTO STATIC
    <div className='flex justify-start pl-2 pb-3 ml-2  rounded-b-lg'>
      {/* Like Button */}
      <button
        className={
          userId
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
