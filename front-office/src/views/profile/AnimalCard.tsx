import React, { useRef, useState } from 'react'
import Setting from '../common/Setting'
import { IsettingInfo } from './Profile'
import { JsonAnimal, ApiRepository, Helpers, JsonUser } from 'shared';
import useEffect from 'react';

const AnimalCard = (props: {animal: JsonAnimal.JsonAnimal, isOptionEnable: boolean, allAnimals : JsonAnimal.JsonAnimal[], user : JsonUser.JsonUser ,setUser : React.Dispatch<React.SetStateAction<JsonUser.JsonUser | undefined>>}) => {
  const animalName = useRef<HTMLInputElement>(null)
  const animalType = useRef<HTMLInputElement>(null)
  const animalAge = useRef<HTMLInputElement>(null)
  const animalImage = useRef<HTMLInputElement>(null)
  const [canWrite, setCanWrite] = useState(false)
  const [file, setFile] = useState<File>()
  
    const sendImage = async () => {
    if (file) {
      const resp = await ApiRepository.putUserPicture(Helpers.getUserId(), file!)
      if (!resp.esit) console.log(resp, 'error sendImage')
    }
  }

  const settingAnimals: IsettingInfo[] = [
    {
      name: 'modify',
      setting: () => {setCanWrite(true)}
    },
    {
      name: 'delete',
      setting: async () => {
        try {
          await ApiRepository.deleteAnimal(Helpers.getUserId(),props.animal._id!)
          const newAnimals = props.allAnimals.filter(item => item._id !== props.animal._id)
          props.setUser({...props.user, animals : newAnimals})
        } catch (error :any) {
          throw new Error("errore salvataggio descrizione -> ", error)      
          }
        }
      }
    ]
    
    const [animals, setAnimals] = useState(settingAnimals)

  const saveChangesAnimal = async () => {
    const changesAnimal : JsonAnimal.JsonAnimal = {
      name: animalName.current?.value!,
      type: animalType.current?.value!,
      userId: Helpers.getUserId(),
      age: parseInt(animalAge.current?.value!),
      // picture: 
    }
    console.log(changesAnimal)
    await ApiRepository.editAnimal(Helpers.getUserId(), props.animal._id!, changesAnimal)
  }


  const updateAnimalPhoto = async () => {
    animalImage.current?.click()
    const fileObj = animalImage.current?.files![0]
    if(fileObj){
      console.log("Ok")
    }
    
  }

  return (
    <div data-aos="zoom-in" className="w-full flex flex-col max-w-sm bg-white flex-end rounded-lg border border-gray-200 shadow-md pb-8 py-1 ">
      {props.isOptionEnable && <Setting settingInfoDesk={animals} />}
      
      <div className="flex flex-col items-center">
        <div>

          <img 
            style={{
              borderWidth: canWrite ? '1px' : '0px',
              borderColor: 'whitesmoke',
              opacity: canWrite ? '0.7' : '1',
               cursor: canWrite ? 'pointer' : "default", 
            }}
            onClick={() => canWrite && updateAnimalPhoto()}
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src="https://i.pinimg.com/originals/31/7e/b5/317eb50bea6c358da1f073f425ed50e4.jpg"
            alt="your animal"
          />
          <input
            style={{display: 'none'}}
            type="file"
            ref={animalImage}
            onChange={() => updateAnimalPhoto()}
          />
        </div>
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className=" bg-white mb-1 text-xl font-medium text-gray-90 text-center"
          disabled={!canWrite}
          defaultValue={props.animal.name}
          ref={animalName}
        />
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className="bg-white text-md text-center text-gray-500"
          disabled={!canWrite}
          defaultValue={props.animal.type}
          ref={animalType}
        />
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className="bg-white text-xs	 text-center text-gray-500"
          disabled={!canWrite}
          defaultValue={props.animal.age}
          ref={animalAge}
        />
        <div className='p-2'>
        {canWrite &&  <input type="button" style={{"borderWidth": "1px", "borderColor": "whitesmoke", "borderRadius": "2px", "padding" : "4px", "cursor": "pointer"}} value="save" onClick={async () => {setCanWrite(false); await saveChangesAnimal()}} /> }
        </div>
      </div>
    </div>
  )
}

export default AnimalCard
