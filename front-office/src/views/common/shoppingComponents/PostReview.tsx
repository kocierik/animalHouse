import React, { useRef } from 'react'
import { ApiRepository, JsonReview } from 'shared';

interface prodId {
  productId: string
}

const PostReview = ({productId} : prodId) => {
  const textComment = useRef<HTMLTextAreaElement>(null)
  
  const postComment = async () =>{
    console.log(textComment.current?.value)
    const data : JsonReview.IReview = {
      username: "erik",
      productId: productId,
      comment: "test",
      star: 1,
      date: new Date()
    }
    const val = await (await ApiRepository.postProductReview(productId,data)).data
    console.log(val)
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
              ref={textComment}
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