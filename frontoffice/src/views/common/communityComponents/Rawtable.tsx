import React from 'react'

const Rawtable = (props: { name: string; points: number; data: string; game: string }) => {
  return (
    <tr tabIndex={0} className="hover:-translate-y-1 hover:scale-100 duration-300">
      <td className="px-5 text-center py-5 border-b border-gray-200 bg-white text-sm ">
        <div className="ml-3">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <h1 className="relative">{props.name}</h1>
          </span>
          {/* <p className="text-gray-600 whitespace-no-wrap">000004</p> */}
        </div>
      </td>
      <td className=" py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{props.points}</p>
      </td>
      <td className="border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          {/* <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span> */}
          <span className="relative">{props.game}</span>
        </span>
      </td>
    </tr>
  )
}

export default Rawtable
