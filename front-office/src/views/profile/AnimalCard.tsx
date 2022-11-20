import React, { useRef, useState, useEffect } from 'react'
import Setting from '../common/Setting'
import { IsettingInfo } from './Profile'
import { JsonAnimal, ApiRepository, Helpers, JsonUser, JsonReservation } from 'shared';
import defaultImage from "./defaultImage.jpg"
const AnimalCard = (props: { index: number, animal: JsonAnimal.JsonAnimal, isOptionEnable: boolean, allAnimals: JsonAnimal.JsonAnimal[], user: JsonUser.JsonUser, setUser: React.Dispatch<React.SetStateAction<JsonUser.JsonUser | undefined>>, setViewModalReservation:  React.Dispatch<React.SetStateAction<boolean>>, viewModalReservation: boolean,  setAnimalReservation: React.Dispatch<React.SetStateAction<JsonReservation.IReservation[]>>}) => {
  const animalName = useRef<HTMLInputElement>(null)
  const animalType = useRef<HTMLInputElement>(null) 
  const animalAge = useRef<HTMLInputElement>(null)
  const animalImage = useRef<HTMLInputElement>(null)
  const [canWrite, setCanWrite] = useState(false)
  const [file, setFile] = useState<File>()
  const [imageProfileAnimal, setImageProfileAnimal] = useState<string>()


  const settingAnimals: IsettingInfo[] = [
    {
      name: 'modify',
      setting: () => { setCanWrite(true) }
    },
    {
      name: 'delete',
      setting: async () => {
        if(Helpers.getUserId()){
          try {
            await ApiRepository.deleteAnimal(Helpers.getUserId()!, props.animal._id!)
            const newAnimals = props.allAnimals.filter(item => item._id !== props.animal._id)
            props.setUser({ ...props.user, animals: newAnimals })
          } catch (error: any) {
            throw new Error("errore salvataggio descrizione -> ", error)
          }
        }
      }
    },
    {
      name: 'reservation',
      setting: async () => {
        props.setViewModalReservation(true)
         const resp = await ApiRepository.getAnimalReservations(props.animal._id!) 
         if(resp.esit)
            props.setAnimalReservation(resp.data!)
          console.log(resp.data)
        }
    }
  ]

  const [animals, setAnimals] = useState(settingAnimals)

  const saveChangesAnimal = async () => {
    if(Helpers.getUserId()){
      const defaultPicture: JsonAnimal.JsonPicture = {
        filename: "635c088531e05da80c7faf61",
        mimetype: "image/jpeg",
        size: 2766
      }
      const changesAnimal: JsonAnimal.JsonAnimal = {
        name: animalName.current?.value!,
        type: animalType.current?.value!,
        userId: Helpers.getUserId()!,
        age: parseInt(animalAge.current?.value!),
        picture: defaultPicture
      }
      await ApiRepository.editAnimal(Helpers.getUserId()!, props.animal._id!, changesAnimal)
    }
  }


  const updateAnimalPhoto = async () => {
    if(Helpers.getUserId()){
      if (file) {
        const resp = (await ApiRepository.putAnimalPicture(Helpers.getUserId()!, props.animal._id!, file))
        if (resp) {
          setImageProfileAnimal(resp?.data?.filename)
        }
        setFile(undefined)
      }
    }
    await getImage()
  }

  const getImage = async () => {
    const user = (await ApiRepository.getCurrentUser()).data
    if (user) {
      const userInfo = (await ApiRepository.getUserInfoById(user.id)).data
      if (userInfo?.animals[props.index].picture) {
        const image = (await (ApiRepository.getPicture(userInfo?.animals[props.index].picture?.filename!))).data
        setImageProfileAnimal(image)
      }
    }
  }

  useEffect(() => {
    updateAnimalPhoto()
    // getImage()
  }, [file, props.animal._id])

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
            onClick={async () => {
              if (canWrite) {
                animalImage.current?.click()
                setFile(animalImage.current?.files![0])
                await updateAnimalPhoto()
              }
            }
            }
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={imageProfileAnimal ? imageProfileAnimal : defaultImage}
            alt="your animal"
          />
          <input
            style={{ display: 'none' }}
            type="file"
            ref={animalImage}
            onChange={async () => {
              animalImage.current?.click()
              setFile(animalImage.current?.files![0])
              await updateAnimalPhoto()
            }
            }
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
          {canWrite && <input type="button" style={{ "borderWidth": "1px", "borderColor": "whitesmoke", "borderRadius": "2px", "padding": "4px", "cursor": "pointer" }} value="save" onClick={async () => { setCanWrite(false); await saveChangesAnimal() }} />}
        </div>
      </div>
    </div>
  )
}

export default AnimalCard
