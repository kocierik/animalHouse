import React, { useRef, useState, useEffect } from 'react'
import Setting from '../common/Setting'
import { IsettingInfo } from './Profile'
import { JsonAnimal, ApiRepository, Helpers, JsonUser, JsonReservation } from 'shared'
import defaultImage from './defaultImage.jpg'
import { ToastContainer, toast } from 'react-toastify'
const AnimalCard = (props: {
  index: number
  animal: JsonAnimal.JsonAnimal
  isOptionEnable: boolean
  allAnimals: JsonAnimal.JsonAnimal[]
  setUserAnimals: React.Dispatch<React.SetStateAction<JsonAnimal.JsonAnimal[]>>
  user: JsonUser.JsonUser
  setUser: React.Dispatch<React.SetStateAction<JsonUser.JsonUser | undefined>>
  setViewModalReservation: React.Dispatch<React.SetStateAction<boolean>>
  viewModalReservation: boolean
  setAnimalReservation: React.Dispatch<React.SetStateAction<JsonReservation.IReservation[]>>
}) => {
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
      setting: () => {
        setCanWrite(true)
      }
    },
    {
      name: 'delete',
      setting: async () => {
        toast.warn('A pet is forever :)', { position: toast.POSITION.TOP_CENTER })
        //   if (Helpers.getUserId()) {
        //     try {
        //       const animal = (await ApiRepository.deleteAnimal(props.animal._id!)).data
        //       const newAnimals = props.allAnimals.filter((item) => item._id !== animal?._id)
        //       props.setUserAnimals(newAnimals)
        //     } catch (error: any) {
        //       throw new Error('errore salvataggio descrizione -> ', error)
        //     }
        //   }
        // }
      }
    },
    {
      name: 'reservation',
      setting: async () => {
        props.setViewModalReservation(true)
        const resp = await ApiRepository.getAnimalReservations(props.animal._id!)
        if (resp.esit) props.setAnimalReservation(resp.data!)
      }
    }
  ]

  const [animals, setAnimals] = useState(settingAnimals)

  const saveChangesAnimal = async () => {
    if (Helpers.getUserId()) {
      const changesAnimal: JsonAnimal.JsonAnimal = {
        name: animalName.current?.value!,
        type: animalType.current?.value!,
        userId: Helpers.getUserId()!,
        age: parseInt(animalAge.current?.value!),
        picture: undefined //TODO
      }
      await ApiRepository.editAnimal(props.animal._id!, changesAnimal)
      window.location.reload()
    }
  }

  const updateAnimalPhoto = async () => {
    if (Helpers.getUserId()) {
      if (file) {

        const resp = await ApiRepository.putAnimalPicture(props.animal._id!, file)

        if (resp) {
          setImageProfileAnimal(resp?.data?.picture?.filename)
        }
        setFile(undefined)
      }
    }
    await getImage()
  }

  const getImage = async () => {
    const user = (await ApiRepository.getCurrentUser()).data
    if (user) {
      if (props.animal.picture?.filename) {
        const image = (await ApiRepository.getPicture(props.animal.picture?.filename!)).data
        setImageProfileAnimal(image)
      }
    }
  }

  useEffect(() => {
    updateAnimalPhoto()
    getImage()
  }, [file, props.animal._id])

  return (
    <div tabIndex={0}
      data-aos="zoom-in"
      className="w-full flex flex-col max-w-sm bg-white flex-end rounded-lg border border-gray-200 shadow-md pb-8 py-1 "
    >
      {props.isOptionEnable && <Setting settingInfoDesk={animals} />}

      <div className="flex flex-col items-center">
        <div>
          <img
            style={{
              borderWidth: canWrite ? '1px' : '0px',
              borderColor: 'whitesmoke',
              opacity: canWrite ? '0.7' : '1',
              cursor: canWrite ? 'pointer' : 'default'
            }}
            onClick={async () => {
              if (canWrite) {
                animalImage.current?.click()
                setFile(animalImage.current?.files![0])
                await updateAnimalPhoto()
              }
            }}
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={imageProfileAnimal ? imageProfileAnimal : '/defaultImage.jpg'}
            alt={props.animal.name}
          />
          <label htmlFor={props.animal._id} className='hidden'>animal image</label>
          <input
            style={{ display: 'none' }}
            type="file"
            id={props.animal._id}
            ref={animalImage}
            onChange={async () => {
              animalImage.current?.click()
              setFile(animalImage.current?.files![0])
              await updateAnimalPhoto()
            }}
          />
        </div>
        <label htmlFor={props.animal.name} className='hidden'>name</label>
        <ToastContainer />

        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className=" bg-white mb-1 text-xl font-medium text-gray-90 text-center"
          disabled={!canWrite}
          id={props.animal.name}
          defaultValue={props.animal.name}
          ref={animalName}
        />
        <label htmlFor={props.animal.type} className='hidden'>type</label>
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className="bg-white text-md text-center text-gray-500"
          disabled={!canWrite}
          id={props.animal.type}
          defaultValue={props.animal.type}
          ref={animalType}
        />
        <label htmlFor={props.animal.age.toString()} className='hidden'>age</label>
        <input
          style={{
            borderWidth: canWrite ? '1px' : '0px',
            borderColor: 'whitesmoke',
            borderRadius: '10px'
          }}
          className="bg-white text-xs	 text-center text-gray-500"
          disabled={!canWrite}
          id={props.animal.age.toString()}
          defaultValue={props.animal.age}
          ref={animalAge}
        />
        <div className="p-2">
          {canWrite && (
            <input
              type="button"
              style={{
                borderWidth: '1px',
                borderColor: 'whitesmoke',
                borderRadius: '2px',
                padding: '4px',
                cursor: 'pointer'
              }}
              value="save"
              onClick={async () => {
                setCanWrite(false)
                await saveChangesAnimal()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AnimalCard
