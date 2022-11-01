import React, { useRef, useState } from 'react'
import Setting from '../common/Setting'
import { IsettingInfo } from './Profile'
import { JsonAnimal } from 'shared';

const AnimalCard = (props: {animal: JsonAnimal.JsonAnimal, isOptionEnable: boolean}) => {
  const animalName = useRef<HTMLInputElement>(null)
  const animalType = useRef<HTMLInputElement>(null)
  const [canWrite, setCanWrite] = useState(false)
  console.log(props)

  const settingAnimals: IsettingInfo[] = [
    {
      name: 'modify',
      setting: () => setCanWrite(true)
    },
    {
      name: 'delete',
      setting: () => {
        animalName.current!.value = ''
      }
    }
  ]

  const [animals, setAnimals] = useState(settingAnimals)

  return (
    <div className="w-full flex flex-col max-w-sm bg-white flex-end rounded-lg border border-gray-200 shadow-md pb-8 py-1 ">
      {props.isOptionEnable && <Setting settingInfoDesk={animals} />}

      <div className="flex flex-col items-center">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src="https://i.pinimg.com/originals/31/7e/b5/317eb50bea6c358da1f073f425ed50e4.jpg"
          alt="your animal"
        />
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className=" bg-white mb-1 text-xl font-medium text-gray-90 text-center"
          disabled={!canWrite}
          onBlur={() => setCanWrite(false)}
          defaultValue={props.animal.name}
          ref={animalName}
        />
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className="bg-white text-sm text-center text-gray-500"
          disabled={!canWrite}
          onBlur={() => setCanWrite(false)}
          defaultValue={props.animal.type}
          ref={animalType}
        />
      </div>
    </div>
  )
}

export default AnimalCard
