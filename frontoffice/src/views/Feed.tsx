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
  const [forumName, setForumName] = useState<string>('')
  const [update, setUpdate] = useState<boolean>(false)

  const idForum = params.id
  if (!idForum)
    // TODO redirect to 404
    return <div />

  const getPostForum = async () => {
    const data = (await ApiRepository.getForumPost(idForum!)).data
    if (data) {
      setForumPost(data)
    }
  }
  const getForumName = async () => {
    const data = (await ApiRepository.getForumName(idForum)).data
    if (data) {
      setForumName(data.name)
    }
  }

  useEffect(() => {
    getPostForum()
    getForumName()
  }, [params, update])

  return (
    <>
      <div
        id="main"
        data-aos="zoom-in"
        data-aos-duration="500"
        className="mb-5 mt-5 flex flex-col lg:flex-row md:flex-row sm:flex-col sm:flex-col"
      >
        <div data-aos-duration="500" data-aos="zoom-in" className='flex flex-1 mt-10 flex-col items-center'>
          <h1 className="text-3xl font-semibold mb-5 leading-tight">{forumName}</h1>
          <PostCard setUpdate={setUpdate} update={update} />
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
                  likes={data.likes}
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
