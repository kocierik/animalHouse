import React, { useState } from 'react'
import PostHeader from './PostHeader'
import LikeCommentButtons from './LikeCommentButtons'
import CommentFeed from './CommentFeed'

const FeedCard = (props) => {
  const [comment, setComment] = useState()
  const [drawerState, setDrawerState] = useState(props.comments.length > 0)

  const onChange = (e) => {
    setComment(e.target.value)
  }

  function handlePostLike() {
    props.handleLikeProps(props.id)
  }

  const handleCommentPost = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      props.addCommentProps(comment, props.id)
      setComment('')
    } else {
      alert('You did not enter anything. Please enter text before submitting your comment.')
    }
  }

  function handleCommentLike(cId) {
    props.handleCommentLikeProps(props.id, cId)
  }

  function handleCommentDelete(cId) {
    props.handleCommentDeleteProps(props.id, cId)
  }

  function handleDrawerInteraction() {
    if (props.comments.length === 0) {
      setDrawerState(!drawerState)
    }
  }

  return (
    <>
      {/* Card Base */}
      <div
        data-aos="fade-up"
        className="flex-row p-1 mb-14 container max-w-md sm:max-w-xl h-auto rounded-lg shadow-md bg-gray-50 m-2"
      >
        {/* Top Fourth - Avatar & User/Post Info */}
        <PostHeader name={props.name} location={props.location} timestamp={props.timestamp} />

        {/* Mid-Top Fourth - Post Content */}
        <div className="pl-4 pb-2">
          <p>{props.content}</p>
        </div>

        {/* Mid-Low Fourth - Like/Comment Counters */}
        <div className="space-x-2 pl-4 pb-2 flex text-gray-600 text-sm">
          <p>{props.isLiked ? props.likes + 1 : props.likes} Likes</p>
        </div>

        {/* Lower Fourth - Like & Comment Buttons + Feed */}
        {drawerState ? (
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
        )}
      </div>
    </>
  )
}

export default FeedCard
