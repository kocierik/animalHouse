import React from 'react'

const Trending = () => {
  return (
          <div style={{flex: '0 1 30%'}} className="flex pl-10 flex-col  shrink py-4 ">
          <h3 className="mt-6 font-semibold">See More</h3>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Forum Name</span>
              </div>
              <p className="mt-1 text-sm">Description forum <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>
          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Forum Name</span>
              </div>
              <p className="mt-1 text-sm">Description forum <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>          <div className="flex w-full py-4 border-b border-gray-300">
            <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex text-sm">
                <span className="font-semibold">Forum Name</span>
              </div>
              <p className="mt-1 text-sm">Description forum <a className="underline" href="#">#hashtag</a></p>
            </div>
          </div>
      </div>
  )
}

export default Trending