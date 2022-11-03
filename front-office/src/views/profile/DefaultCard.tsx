import React, { useRef, useState } from 'react'

const DefaultCard = (props: {setOpenNewAnimal : React.Dispatch<React.SetStateAction<boolean>>, openNewAnimal: boolean}) => {
  const animalName = useRef<HTMLInputElement>(null)
  const animalType = useRef<HTMLInputElement>(null)
  const [canWrite, setCanWrite] = useState(false)

  return (
    <div data-aos="zoom-in"  className="w-full flex flex-col max-w-sm bg-white flex-end rounded-lg border border-gray-200 shadow-md pb-8 py-1 ">
     <div className='flex self-end items-center '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border rounded p-1 bg-gray-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>  
        <svg  xmlns="http://www.w3.org/2000/svg" onClick={() => props.setOpenNewAnimal(!props.openNewAnimal)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5  h-5 flex self-end m-3 border rounded ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src="https://i.pinimg.com/originals/31/7e/b5/317eb50bea6c358da1f073f425ed50e4.jpg"
          alt="your animal"
        />
        <input
          style={{
            borderWidth: '1px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          placeholder="Animal name"
          className=" bg-white mb-1 text-lg m-5 font-medium text-gray-90 text-center"
          ref={animalName}
        />
        <input
          style={{
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          placeholder="Animal type"
          className="bg-white text-sm border  text-center text-gray-500"
          ref={animalType}
        />
      </div>
    </div>
  )
}

export default DefaultCard