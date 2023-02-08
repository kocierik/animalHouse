import React, { useEffect, useState } from 'react'
import PostHeader from './PostHeader'
import { ApiRepository, JsonForum, JsonUser } from 'shared'
import LikeButtons from './LikeButtons'

const FeedCard = (post: JsonForum.IPost) => {
  const [user, setUser] = useState<JsonUser.JsonUser>()
  const [userPic, setUserPic] = useState<string>('')
  const liked = post.userLikes.find((value) => value == localStorage.getItem('userId'))

  const [isLiked, setIsLiked] = useState<boolean>(liked ? true : false)
  const getUserName = async () => {
    const data = (await ApiRepository.getUserInfoById(post.userId)).data
    if (data) {
      setUser(data!)
      const data2 = (await ApiRepository.getPicture(data._id)).data
      if (data2)
        setUserPic(data2!)
    }
  }
  useEffect(() => {
    getUserName()
  }, [])

  return (
    <>
      {/* Card Base */}
      <div
        data-aos="fade-up"
        className="flex-row p-1 mb-14 container max-w-md sm:max-w-xl h-auto rounded-lg shadow-md bg-gray-50 m-2"
      >
        {/* Top Fourth - Avatar & User/Post Info */}
        <PostHeader
          name={user ? user.username : ""}
          location={post.forumId}
          picture={userPic!}
          timestamp={post.date} />

        {/* Mid-Top Fourth - Post Content */}
        <div className="p-5 ml-20 pb-2 break-words	">
          <p>{post.text}</p>
        </div>

        {/* Mid-Low Fourth - Like/Comment Counters */}
        <div className="space-x-2 pl-4 pb-2 flex text-gray-600 text-sm">
          {/* <p>{props.isLiked ? props.likes + 1 : props.likes} Likes</p> */}
        </div>

        {/* Lower Fourth - Like & Comment Buttons + Feed */}
        <div>
          <LikeButtons
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            likes={post.likes}
            userLikes={post.userLikes}
            postId={post._id!}
          />
        </div>
      </div>
    </>
  )
}

export default FeedCard
