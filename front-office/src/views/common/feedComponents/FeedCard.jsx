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
          <p>•</p>
          <p>{props.comments.length} Comments</p>
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

            {/* COLORE POSTA UN COMMENTO */}
            <div
              className={
                props.comments.length === 0
                  ? 'flex items-center px-4 pb-4 space-x-4  rounded-b-lg border-b border-gray-300/50'
                  : 'flex items-center px-4 pb-4 space-x-4 border-b border-gray-300/50'
              }
            >
              <img
                src="/imageprofile.png"
                className="rounded-full flex-initial max-h-8 w-8 sm:max-h-10 sm:w-10"
                alt="User profile"
              />
              <form onSubmit={handleCommentPost} className="w-full">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  className="placeholder-gray-300 rounded-full m-1 w-full bg-transparent border-1 border-green-400 focus:outline-none"
                  onChange={onChange}
                />
              </form>
            </div>

            {/* Comment Feed */}
            <CommentFeed
              comments={props.comments}
              commentLikeHandler={handleCommentLike}
              commentDeleteHandler={handleCommentDelete}
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
