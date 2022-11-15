import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ApiRepository, Helpers, JsonUser } from 'shared';

const ModalCard = (props :{showModal: boolean, setShowModal: any}) => {
    const openRef = useRef<HTMLDivElement>(null)
    const [user,setUser] = useState<JsonUser.JsonUser>()
    const [animalSelect,setAnimalSelect] = useState<ChangeEvent<HTMLSelectElement>>(null!)
    const modalHandler = () => {
        props.setShowModal(!props.showModal)
        console.log(animalSelect?.target?.value)
    }

  const getUserAnimal = async () => {
    if(Helpers.getUserId()){
        const id = Helpers.getUserId()
        const data = (await ApiRepository.getUserInfoById(id!)).data
        setUser(data)
    }
  }
  useEffect(() => {
    getUserAnimal()
  },[])

  return (
    <>
                <div className="py-12 flex   transition duration-150 ease-in-out z-10 absolute top-20 right-0 bottom-0 left-0" ref={openRef!}>
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-start text-gray-600 mb-3">
                            <svg  xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                        </div>
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Animal Details</h1>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Select Animal</label>
                        <select  onChange={(value) => setAnimalSelect(value)} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                            <option>Select...</option>
                            { user?.animals.map((animal,i) => {
                                return (
                                    <option key={i} value={animal.name}>
                                        {animal.name}
                                    </option>
                                )
                            })
                             
                            }
                        </select>
                        {/* <input id="name" type="s" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" /> */}
                        <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">More Information</label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <circle cx="12" cy="12" r="9"></circle>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    <polyline points="11 12 12 12 12 16 13 16"></polyline>
                                </svg>
                            </div>
                            <textarea rows={2} maxLength={100}  className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-16 text-sm border-gray-300 rounded border resize-none" /> 
                        </div>
                        <label htmlFor="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                            </div>
                            <input id="expiry" type="datetime-local" min={new Date().toISOString()}  max="2024-06-14T00:00" className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
                        </div>
                        <label htmlFor="structure" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Select a Structure</label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                            </div>
                        <select  onChange={(value) => setAnimalSelect(value)} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                            <option>Select...</option>
                        </select>
                        </div>
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => modalHandler()}>Cancel</button>
                        </div>
                        <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => props.setShowModal(!props.showModal)} aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default ModalCard