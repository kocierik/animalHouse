import React, { useEffect, useRef, useState } from 'react'
import { ApiRepository, type JsonUser, Helpers, JsonReservation, JsonAnimal } from 'shared'
import EditmodalReservationCard from '../common/serviceComponents/EditmodalReservationCard'
import Setting from '../common/Setting'
import AnimalCard from './AnimalCard'
import DefaultCard from './DefaultCard'

export interface IsettingInfo {
  name: string
  setting: (...args: string[]) => void
}

const Profile = () => {
  const [user, setUser] = useState<JsonUser.JsonUser>()
  const [file, setFile] = useState<File>()
  const [isOptionEnable, setIsOptionEnable] = useState(true)
  const [canWrite, setCanWrite] = useState(false)
  const textValue = useRef<HTMLTextAreaElement>(null)
  const [openNewAnimal, setOpenNewAnimal] = useState(false)
  const [viewModalReservation, setViewModalReservation] = useState(false)
  const [animalReservation, setAnimalReservation] = useState<JsonReservation.IReservation[]>([])
  const [userAnimals, setUserAnimals] = useState<JsonAnimal.JsonAnimal[]>([])

  const sendImage = async () => {
    if (file && Helpers.getUserId()) {
      const resp = await ApiRepository.putUserPicture(Helpers.getUserId()!, file!)
    }
  }

  const settingInfoDescription: IsettingInfo[] = [
    {
      name: 'modify',
      setting: () => setCanWrite(true)
    },
    {
      name: 'delete',
      setting: () => {
        textValue.current!.value = ''
        setCanWrite(true)
      }
    }
  ]

  const [info, setInfo] = useState(settingInfoDescription)
  const [imageProfile, setImageProfile] = useState<string>()

  const getImage = async () => {
    const user = (await ApiRepository.getCurrentUser()).data
    if (user) {
      const userInfo = (await ApiRepository.getUserInfoById(user.id)).data
      setUser(userInfo)
      textValue.current!.value = userInfo?.description!

      const image = (await ApiRepository.getPicture(user.id)).data
      setImageProfile(image)
    }
  }

  const getUserAnimals = async () => {
    const resp = await ApiRepository.findAnimalsUser(Helpers.getUserId()!)
    if (resp.esit) setUserAnimals(resp.data!)
  }

  useEffect(() => {
    getUserAnimals()
    sendImage()
    getImage()
  }, [file])

  const saveDescription = async () => {
    try {
      if (Helpers.getUserId()) {
        let newUser = user
        newUser!.description = textValue.current?.value!
        const result = await ApiRepository.updateUserDescription(Helpers.getUserId()!, { description: textValue.current?.value! })

      }
    } catch (error: any) {
      throw new Error('errore salvataggio descrizione -> ', error)
    }
  }

  return (
    <>
      <main className="profile-page" data-aos="zoom-in" data-aos-duration="500">
        <section className="relative block" style={{ height: '500px' }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1601562219441-29e53a4d4d8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')"
            }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: '70px' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative -mt-20 w-30 h-24 flex  justify-center">
                      <label htmlFor='imageProfile' className='hidden'>profile Image</label>
                      <img
                        id='imageProfile'
                        src={imageProfile}
                        className="lg:-mt-10 lg:w-40 lg:h-40 h-32 w-32 rounded-full shadow-lg bg-white shadow-sm border border-gray-100"
                        alt="personal profile account"
                      />
                      <div className="absolute bottom-0 right-0 h-10 w-10 border-2 border-indigo-800 text-center rounded-full bg-indigo-800 z-2">
                        <label htmlFor='dropProfile' className="font-black text-white text-3xl">+</label>
                        <input
                          type="file"
                          id='dropProfile'
                          className="hidden"
                          onChange={(e) => setFile(e.target.files![0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h1 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">{user?.username} </h1>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt text-lg text-gray-500"></i> {user?.firstName} {user?.lastName}
                  </div>
                </div>
                {viewModalReservation && (
                  <EditmodalReservationCard
                    showModal={viewModalReservation}
                    setShowModal={setViewModalReservation}
                    openService={'Edit service'}
                    animalReservation={animalReservation}
                  />
                )}
                <div data-aos="zoom-in" className="flex flex-col items-center">
                  <div className="w-full   px-4 lg:order-1">
                    <div className="flex  justify-center py-4 lg:pt-4 pt-8 ">
                      <div className="flex items-center flex-col flex-nowrap	  justify-center">
                        <div
                          style={{ flexFlow: 'wrap' }}
                          data-aos="zoom-in"
                          className="flex-col items-center flex-row p-3 text-center  flex justify-center flex-1 gap-5 flex-col lg:flex-row"
                        >
                          {userAnimals?.map((animal, i) => {
                            return (
                              <AnimalCard
                                key={i}
                                index={i}
                                isOptionEnable={isOptionEnable}
                                setUserAnimals={setUserAnimals}
                                animal={animal}
                                allAnimals={userAnimals}
                                setUser={setUser}
                                user={user!}
                                setViewModalReservation={setViewModalReservation}
                                viewModalReservation={viewModalReservation}
                                setAnimalReservation={setAnimalReservation}
                              />
                            )
                          })}
                        </div>
                        <div className="flex justify-center p-4 min-w-24	 mt-5   hover:translate-y-1  hover:bg-gray-100 hover:scale-105 duration-300 rounded-lg  cursor-pointer border">
                          {openNewAnimal ? (
                            <DefaultCard
                              setUser={setUser}
                              user={user!}
                              allAnimals={user?.animals!}
                              setOpenNewAnimal={setOpenNewAnimal}
                              openNewAnimal={openNewAnimal}
                            />
                          ) : (
                            <svg
                              onClick={() => setOpenNewAnimal(!openNewAnimal)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8 min-w-sm  "
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-aos="zoom-in" className="mt-10 w-full py-10 border-t border-gray-300">
                  <span className="text-3xl font-semibold leading-normal mb-2 text-gray-800 p-3">Description</span>
                  <div className="flex w-full flex-wrap justify-center ">
                    <div className="flex flex-1  justify-center flex-col items-center bg-white rounded-lg border border-gray-200 shadow-md ">
                      {isOptionEnable && (
                        <div style={{ width: '100%', display: 'contents' }}>
                          <Setting settingInfoDesk={info} />{' '}
                        </div>
                      )}
                      <label htmlFor='description' className='hidden'>description</label>
                      <textarea
                        ref={textValue}
                        style={{
                          borderWidth: canWrite ? '1px' : '0px',
                          borderColor: '#E3E3E3',
                          borderRadius: '10px'
                        }}
                        id='description'
                        className=" flex w-11/12	 mt-10 mb-7 flex-1 border-0 focus:border-0 ring-0 text-center 	m-5"
                        disabled={!canWrite}
                        onBlur={async () => {
                          setCanWrite(false)
                          await saveDescription()
                        }}
                        maxLength={300}
                        rows={5}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Profile
