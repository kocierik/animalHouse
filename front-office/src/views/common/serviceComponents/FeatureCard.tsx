import React, { useEffect, useRef, useState } from 'react'
import ModalCard from './ModalCard'

const FeatureCard = () => {
    const [showModal,setShowModal] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const executeScroll = () => {
        scrollRef.current?.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})  
    }

    useEffect(() => {
        executeScroll()
    },[showModal])

  return (
    <div className="flex flex-col">
      <div ref={scrollRef}>
        {showModal && <ModalCard  showModal={showModal} setShowModal={setShowModal} />}
    </div>
  <h2 className="mb-4 text-2xl font-bold">Most Used Services</h2>

  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div className="flex hover:-translate-y-3 hover:scale-105 duration-300  items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>

      <div className="ml-4 cursor-pointer" onClick={() => setShowModal(true)}>
        <h2 className="font-semibold">Find Partner</h2>
        <p className="mt-2 text-sm text-gray-500">Last used 1 days ago</p>
      </div>
    </div>

    <div className="flex items-start hover:-translate-y-3 hover:scale-105 duration-300 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <div className="ml-4 cursor-pointer" onClick={() => setShowModal(true)}>
        <h2 className="font-semibold">Veterinary</h2>
        <p className="mt-2 text-sm text-gray-500">Last used 2 days ago</p>
      </div>
    </div>
    <div className="flex items-start hover:-translate-y-3 hover:scale-105 duration-300 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <div className="ml-4 cursor-pointer" onClick={() => setShowModal(true)}>
        <h2 className="font-semibold">Dog Sitter</h2>
        <p className="mt-2 text-sm text-gray-500">Last used 1 days ago</p>
      </div>
    </div>
    <div className="flex items-start hover:-translate-y-3 hover:scale-105 duration-300 rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>

      <div className="ml-4 cursor-pointer" onClick={() => setShowModal(true)}>
        <h2 className="font-semibold">Pension</h2>
        <p className="mt-2 text-sm text-gray-500">Last used 8 hour ago</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default FeatureCard