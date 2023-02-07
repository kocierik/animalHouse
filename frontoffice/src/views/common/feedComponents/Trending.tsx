import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiRepository, JsonForum } from 'shared'

const Trending = () => {
  const [listForum, setListForum] = useState<JsonForum.IForum[]>([])
  const navigate = useNavigate()
  const getForum = async () => {
    const data = (await ApiRepository.getForum()).data
    if (data) {
      data.map(item => {
        setListForum((list) => [...list, item])
      })
    }
  }

  useEffect(() => {
    getForum()
  }, [])

  return (
    <div style={{ flex: '0 1 30%' }} className="flex lg:pl-10  flex-col p-5  shrink py-4 ">
      <h1 className="mt-6 text-xl font-semibold py-5">Trending Forum</h1>
      {
        listForum?.map((forum, i) => {
          return (
            <div key={i} className="flex w-full py-4 border-b border-gray-300">
              {
                forum.picture ?
                  <img src={forum.picture} className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></img>
                  :
                  <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full"></span>
              }
              <div className="flex flex-col flex-grow ml-2">
                <div className="flex text-sm cursor-pointer">
                  <button onClick={() => { navigate("/forum/" + forum._id) }} className="text-md font-black	 text-indigo-800">{forum.name}</button>
                </div>
                <p className="mt-1 text-sm">{forum.description}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Trending
