import React from 'react'

const Trending = () => {
  return (
          <div className="flex flex-col shrink lg:w-1/4 py-4 pl-4">
        <div>
          <h3 className="mt-6 font-semibold">Trending Post</h3>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Username</span>
                <span className="ml-1">@username</span>
              </div>
              <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Username</span>
                <span className="ml-1">@username</span>
              </div>
              <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Username</span>
                <span className="ml-1">@username</span>
              </div>
              <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Trending