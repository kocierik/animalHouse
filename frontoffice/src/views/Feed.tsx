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
  const [forum, setForum] = useState<JsonForum.IForum>()
  const [update, setUpdate] = useState<boolean>(false)

  const idForum = params.id
  if (!idForum)
    // TODO useNavigate() to 404
    return (<div />)

  const getPostForum = async () => {
    const data = (await ApiRepository.getForumPost(idForum!)).data
    if (data) {
      setForumPost(data)
    }
  }
  const getForumName = async () => {
    const data = (await ApiRepository.getForumName(idForum)).data
    if (data) {
      setForum(data)
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
      > {idForum != 'trending' ?
        <>
          <div data-aos-duration="500" data-aos="zoom-in" className='flex flex-1 mt-10 border-x-2 border-slate-100	 flex-col items-center'>
            <div className="flex items-center justify-start m-5">
              <img src={forum?.picture} className="flex-shrink-0 w-40 h-40 bg-gray-400 rounded-full"></img>
              <h1 data-aos="zoom-in"
                data-aos-duration="500" className="text-3xl font-semibold ml-10 mb-5 leading-tight">{forum?.name}</h1>
            </div>
            <PostCard setUpdate={setUpdate} update={update} />
            {forumPost?.reverse().map(
              (data, i: number) => {
                return (
                  <FeedCard
                    key={i}
                    _id={data._id}
                    userId={data.userId}
                    forumId={data.forumId}
                    date={data.date}
                    text={data.text}
                    valid={true}
                    userLikes={data.userLikes}
                    likes={data.likes} />
                )
              }
            )}
          </div>
          <Trending />  </> : <div data-aos="zoom-in"
            data-aos-duration="500" className='flex flex-1 items-center justify-center flex-col'> <Trending /></div>
        }
        {/* <Trending /> */}
      </div>
    </>
  )
}

export default Feed
