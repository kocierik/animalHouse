import React from 'react'
import Navbar from './common/Navbar'

const Community = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Game leaderboard</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className=" min-w-full shadow-md rounded-lg overflow-hidden inline-block">
              <table className="min-w-full leading-normal text-center 	">
                <thead>
                  <tr style={{    textAlignLast:"center"}}>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="py-3 pr-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Game
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                          <p className="text-gray-600 whitespace-no-wrap">000004</p>
                        </div>
                      </div>
                    </td>
                    <td className=" py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">20,000</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                    </td>
                    <td className=" border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">HangMan</span>
                      </span>
                    </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
