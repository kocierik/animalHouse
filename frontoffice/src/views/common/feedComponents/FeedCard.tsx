import React, { useEffect, useState } from 'react'
import PostHeader from './PostHeader'
import LikeCommentButtons from './LikeCommentButtons'
import CommentFeed from './CommentFeed'
import { ApiRepository, JsonForum } from 'shared'

const FeedCard = (post: JsonForum.IPost) => {
  const [userName, setUsername] = useState<string>('')

  const getUserName = async () => {
    const data = (await ApiRepository.getUserInfoById(post.userId)).data
    if (data) {
      setUsername(data.username)
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
        <PostHeader name={userName} location={post.forumId} timestamp={post.date} />

        {/* Mid-Top Fourth - Post Content */}
        <div className="p-5 ml-20 pb-2 break-words	">
          <p>{post.text}</p>
        </div>

        {/* Mid-Low Fourth - Like/Comment Counters */}
        <div className="space-x-2 pl-4 pb-2 flex text-gray-600 text-sm">
          {/* <p>{props.isLiked ? props.likes + 1 : props.likes} Likes</p> */}
        </div>

        {/* Lower Fourth - Like & Comment Buttons + Feed */}
        {/* {drawerState ? (
          // Drawer Open
          <div>
            <LikeCommentButtons
              isLiked={props.isLiked}
              postLikeHandler={handlePostLike}
              drawerHandler={handleDrawerInteraction}
              drawerState={drawerState}
            />
          </div>
        ) : (
          // Drawer Closed
          <LikeCommentButtons
            isLiked={props.isLiked}
            postLikeHandler={handlePostLike}
            drawerHandler={handleDrawerInteraction}
          />
        )} */}
      </div>
    </>
  )
}

export default FeedCard
