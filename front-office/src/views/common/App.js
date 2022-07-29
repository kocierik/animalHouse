import './App.css'
import { postsData } from './posts.jsx'
import PostCard from './components/PostCard'
import FeedCard from './components/FeedCard'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [posts, setPosts] = useState(getInitialPosts())

  useEffect(() => {
    const temp = JSON.stringify(posts)
    localStorage.setItem('posts', temp)
  }, [posts])

  function getInitialPosts() {
    const temp = localStorage.getItem('posts')
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

  const addPostToFeed = (content) => {
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

  const addCommentToPost = (comment, pId) => {
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
    setPosts((prevState) =>
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

  const deleteComment = (pId, cId) => {
    setPosts((prevState) =>
      prevState.map((post) => {
        if (post.id === pId) {
          post.comments = [
            ...post.comments.filter((c) => {
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

  const likeComment = (pId, cId) => {
    setPosts((prevState) =>
      prevState.map((post) => {
        if (post.id === pId) {
          post.comments = [
            ...post.comments.map((c) => {
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

  const likePost = (pId) => {
    setPosts((prevState) =>
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
    <div id="main" className="App">
      <PostCard addPostProps={addPostToFeed} />
      {posts.map((data) => {
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
      })}
    </div>
  )
}

export default App
