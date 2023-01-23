import { postsData } from './common/feedComponents/posts'
import PostCard from './common/feedComponents/PostCard'
import FeedCard from './common/feedComponents/FeedCard'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Trending from './common/feedComponents/Trending'
import { ApiRepository, JsonForum } from 'shared'
import { useParams } from 'react-router-dom'

function Feed() {
  const params = useParams()
  const [forumPost, setForumPost] = useState<JsonForum.IPost[]>([])

  const idForum = params.id
  if (!idForum)
    // TODO redirect to 404
    return <div />

  const getPostForum = async () => {
    const data = await (await ApiRepository.getForumPost(idForum!)).data
    if (data) {
      setForumPost(data)
      console.log(data)
    }
  }

  useEffect(() => {
    getPostForum()
  }, [params])

  return (
    <>
      <div
        id="main"
        data-aos="zoom-in"
        data-aos-duration="500"
        className="mb-5 mt-5 flex flex-1 flex-col p-5 sm:flex-row p-5"
      >
        <div className='flex flex-1 p-5 flex-col items-center'>
          <h1 className="text-3xl font-semibold mb-5 leading-tight">Forum</h1>
          <PostCard />
          {forumPost?.reverse().map(
            (data, i: number) => {
              return (
                <FeedCard
                  key={i}
                  userId={data.userId}
                  forumId={data.forumId}
                  date={data.date}
                  text={data.text}
                  valid={true}
                // likes={1}
                />
              )
            }
          )}
        </div>
        <Trending />
      </div>
    </>
  )
}

export default Feed
