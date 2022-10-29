import React from 'react'

const AnimalCard = () => {
  return (
  <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-10 ">
    <div className="flex flex-col items-center">
        <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://i.pinimg.com/originals/31/7e/b5/317eb50bea6c358da1f073f425ed50e4.jpg" alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 ">Bonnie Green</h5>
        <span className="text-sm text-gray-500">Cat</span>
    </div>
</div>

  )
}


export default AnimalCard