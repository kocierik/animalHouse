import React from 'react'

const Rawtable = () => {
  return (
    <tr>
      <td className="px-5 text-center py-5 border-b border-gray-200 bg-white text-sm ">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
          <p className="text-gray-600 whitespace-no-wrap">000004</p>
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
  )
}

export default Rawtable
