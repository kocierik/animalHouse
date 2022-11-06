import React, { useRef, useState } from 'react'
import { ApiRepository, Helpers, JsonAnimal, JsonUser } from 'shared';

const DefaultCard = (props: {setOpenNewAnimal : React.Dispatch<React.SetStateAction<boolean>>, openNewAnimal: boolean, allAnimals : JsonAnimal.JsonAnimal[], user : JsonUser.JsonUser ,setUser : React.Dispatch<React.SetStateAction<JsonUser.JsonUser | undefined>>}) => {
  const animalName = useRef<HTMLInputElement>(null)
  const animalType = useRef<HTMLInputElement>(null)
  const animalAge = useRef<HTMLInputElement>(null)

  const saveAnimal = async () =>{
    const animal : JsonAnimal.JsonAnimal = {
      userId: Helpers.getUserId().toString(),
      name: animalName.current?.value!,
      type: animalType.current?.value!,
      age: parseInt(animalAge.current?.value!)
    }
    console.log(Helpers.getUserId())
    await ApiRepository.registerAnimal([animal],Helpers.getUserId())
    .catch(e => console.log("Errore aggiunta animale --> ", e))
    const newAnimals = [...props.allAnimals, animal]
    props.setUser({...props.user, animals: newAnimals} )
    props.setOpenNewAnimal(!props.openNewAnimal)
  }

  return (
    <div data-aos="zoom-in"  className="w-full flex  flex-col max-w-sm bg-white flex-end rounded-lg border border-gray-200 shadow-md pb-8 py-1 ">
     <div className='flex self-end items-center '>
        <svg onClick={ async () => await saveAnimal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border rounded p-1 bg-gray-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>  
        <svg  xmlns="http://www.w3.org/2000/svg" onClick={() => props.setOpenNewAnimal(!props.openNewAnimal)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5  h-5 flex self-end m-3 border rounded ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex flex-col items-center w-max-sm w-100">
        
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
          required
        />
        <input
          style={{
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          placeholder="Animal type"
          className="bg-white text-sm border  text-center text-gray-500"
          ref={animalType}
          required
        />
        <input
          style={{
            borderColor: 'whitesmoke',
            borderRadius: '10px',
            margin: '5px'
          }}
          placeholder="age"
          type="number"
          className="bg-white border w-20 m-0 pt-0 pb-0 pl-0 pr-0 text-center text-gray-500"
          ref={animalAge}
          required
        />
      </div>
    </div>
  )
}

export default DefaultCard