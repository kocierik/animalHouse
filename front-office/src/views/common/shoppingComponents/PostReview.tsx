import React, { HTMLAttributes, useEffect, useRef } from 'react'
import { ApiRepository, JsonReview } from 'shared';
import useState from 'react';

interface IProps {
  post: boolean
  setPost: React.Dispatch<React.SetStateAction<boolean>>
  productId: string
}

const PostReview = (props : IProps) => {
  const {post, setPost, productId} = props
  const [textComment, setTextComment] = React.useState('')

  const postComment = async () =>{
    //const user = await ApiRepository.getCurrentUser()
    
    setPost(!post)
    
    const data : JsonReview.IReview = {
      username: "erik",
      productId: productId,
      comment: textComment,
      star: 4,
      date: new Date()
    }
    setTextComment("")
    await (await ApiRepository.postProductReview(productId,data)).data
  }

  return (
    <>
      {/* Card Base */}
    <div className="max-w-2xl mx-auto pb-16  px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        {/* Top Half - Avatar & Text Box */}
        <div className="flex flex-col 	 content-start p-4">
          <div className="flex mb-8">
            <span className="">
              <img
                src="/imageprofile.jpg"
                className="rounded-full flex-initial max-h-12 w-12 sm:max-h-14 sm:w-14  duration-150"
                alt="User profile"
              />
            </span>
            <div className="flex flex-1 px-5 items-center">
              <span className="font-black	text-lg	">erik</span>
            </div>
          </div>
          <div className="flex ">
            <textarea
              value={textComment} onChange={(e) => setTextComment(e.target.value)}
              id="post-input"
              rows={3}
              placeholder="What do you think about this article?"
              className="w-1/2 flex flex-1 w-10 rounded font-sans placeholder-gray-400 self-start ml-3 sm:ml-4 mt-2 sm:mt-3 text-sm sm:text-base focus:outline-none"
            />
          </div>
        </div>

        {/* Lower Half - Photo/Video & Post Buttons */}
        <div className="flex p-2 justify-end sm:p-4 mr-5">
          <button onClick={postComment}
            className="hover:-translate-y-1 hover:scale-105 duration-300 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-white sm:font-medium sm:text-base text-sm bg-green-500 hover:bg-green-600 duration-150"
          >
            Post It
          </button>
        </div>
      </div>
    </>
  )
}

export default PostReview