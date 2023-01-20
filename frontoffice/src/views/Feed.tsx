import { postsData } from './common/feedComponents/posts'
import PostCard from './common/feedComponents/PostCard'
import FeedCard from './common/feedComponents/FeedCard'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Feed() {
  const [posts, setPosts] = useState(getInitialPosts())

  useEffect(() => {
    const temp = JSON.stringify(posts)
    localStorage.setItem('posts', temp)
  }, [posts])

  function getInitialPosts() {
    const temp: any = localStorage.getItem('posts')
    const savedPosts = JSON.parse(temp)
    return savedPosts || postsData
  }

  function getTimestamp() {
    var today = new Date()
    var yyyy = today.getFullYear()
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var dd = String(today.getDate()).padStart(2, '0')
    var hr = String(today.getHours()).padStart(2, '0')
    var min = String(today.getMinutes()).padStart(2, '0')
    var sec = String(today.getSeconds()).padStart(2, '0')

    let timestamp = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + min + ':' + sec

    return timestamp
  }

  const addPostToFeed = (content: any) => {
    let k = uuidv4()
    const newPost = {
      key: k,
      id: k,
      name: 'Fake Guy',
      location: 'OH, USA',
      timestamp: getTimestamp(),
      content: content,
      likes: 0,
      comments: [],
      isLiked: false
    }
    setPosts([newPost, ...posts])
  }

  const addCommentToPost = (comment: any, pId: any) => {
    let k = uuidv4()
    const newComment = {
      key: k,
      id: k,
      name: 'Fake Guy',
      title: 'Bot Lane',
      timestamp: getTimestamp(),
      content: comment,
      likes: 0,
      isLiked: false
    }
    setPosts((prevState: any[]) =>
      prevState.map((post) => {
        if (post.id === pId) {
          console.log(`Map ID: ${post.id}`)
          console.log(`Passed ID: ${pId}`)
          return {
            ...post,
            comments: [newComment, ...post.comments]
          }
        }
        return post
      })
    )
  }

  const deleteComment = (pId: any, cId: any) => {
    setPosts((prevState: any[]) =>
      prevState.map((post) => {
        if (post.id === pId) {
          post.comments = [
            ...post.comments.filter((c: { id: any }) => {
              return c.id !== cId
            })
          ]
          return {
            ...post
          }
        }
        return post
      })
    )
  }

  const likeComment = (pId: any, cId: any) => {
    setPosts((prevState: any[]) =>
      prevState.map((post) => {
        if (post.id === pId) {
          post.comments = [
            ...post.comments.map((c: { id: any; isLiked: boolean }) => {
              if (c.id === cId) {
                c.isLiked = !c.isLiked
                return {
                  ...c
                }
              }
              return c
            })
          ]
          return {
            ...post
          }
        }
        return post
      })
    )
  }

  const likePost = (pId: any) => {
    setPosts((prevState: any[]) =>
      prevState.map((post) => {
        if (post.id === pId) {
          return {
            ...post,
            isLiked: !post.isLiked
          }
        }
        return post
      })
    )
  }

  return (
    <>
      <div
        id="main"
        data-aos="zoom-in"
        data-aos-duration="500"
        className="mb-5 mt-5 flex flex-1 flex-col p-5 items-center"
      >
        <PostCard addPostProps={addPostToFeed} />
        {posts.map(
          (data: {
            id: any
            name: any
            location: any
            timestamp: any
            content: any
            likes: any
            comments: any
            isLiked: any
          }) => {
            return (
              <FeedCard
                key={uuidv4()}
                id={data.id}
                name={data.name}
                location={data.location}
                timestamp={data.timestamp}
                content={data.content}
                likes={data.likes}
                comments={data.comments}
                isLiked={data.isLiked}
                addCommentProps={addCommentToPost}
                handleLikeProps={likePost}
                handleCommentDeleteProps={deleteComment}
                handleCommentLikeProps={likeComment}
              />
            )
          }
        )}
      </div>
    </>
  )
}

export default Feed
