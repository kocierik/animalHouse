import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { ApiRepository, Helpers, JsonUser, JsonReservation, Jsonlocation } from 'shared';
const EditmodalReservationCard = (props :{showModal: boolean, setShowModal: any, openService: string, animalReservation : JsonReservation.IReservation[]}) => {
    const openRef = useRef<HTMLDivElement>(null)
    const [user,setUser] = useState<JsonUser.JsonUser>()
    const [locationSelect,setLocationSelect] = useState<string>("Select...")
    const [locations,setLocations] = useState<Jsonlocation.ILocation[]>()
    const [information,setInformation] = useState<ChangeEvent<HTMLTextAreaElement>>(null!)
    const [date,setDate] = useState<string>()
    const [selectedService, setSelectedService] = useState<string>(null!)
    const [infoReservation, setInfoReservation] = useState<JsonReservation.IReservation>(null!)
    const [locationReservation, setLocationReservation] = useState<Jsonlocation.ILocation>(null!)

    const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    
  const getUserInfo = async () => {
    if(Helpers.getUserId()){
        const id = Helpers.getUserId()
        const data = (await ApiRepository.getUserInfoById(id!)).data
        setUser(data)
    }
  }


  const getSelectedService = async (id: string) => {
        const resp = await ApiRepository.getSingleReservation(id)
        if(resp){
            setInfoReservation(resp.data!)
            setDate(resp.data?.date)
            setLocationSelect(resp.data?.locationId!)
            await getLocationBySelect(resp.data?.locationId!)
        }
        else {
            toast.warning("error in a selected Service")
        }
    }

  const getLocationBySelect = async (locationId: string) => {
        const data = (await ApiRepository.getLocationById(locationId)).data
        setLocationReservation(data!)
  }

    const getAllLocation = async () => {
        const data = (await ApiRepository.getLocations()).data
        setLocations(data!)
  }

    const editReservation = async () => {
        if(Helpers.getUserId()){
            if(locationSelect != "Select..."){
                const reservation : JsonReservation.IReservation = {
                    userId: Helpers.getUserId()!,
                    date: date!,
                    information: information?.target?.value,
                    locationId: locationSelect
                }
                await ApiRepository.putReservation(infoReservation._id!,reservation)

                await toast.success('Prenotation changed!', {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                })
                await sleep(2000)
                props.setShowModal(!props.showModal)
            } else {
                toast.warn('You should compile all the form correctly!', {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
        } else {
            toast.warn('You should login first!', {
                position: toast.POSITION.TOP_CENTER
            })
        }
  } 

  useEffect(() => {
    getUserInfo()
    getAllLocation()
  },[])

  return (
    <>
            <div data-aos="fade-in" className="py-12 flex   transition duration-150 ease-in-out z-10 absolute top-20 right-0 bottom-0 left-0" ref={openRef!}>
                <div data-aos="zoom-in" role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div data-aos="zoom-in" className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                     <div className='flex flex-1 justify-end'>
                     <svg  onClick={() => props.setShowModal(false)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x cursor-pointer" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <line x1="18" y1="6" x2="6" y2="18" />
                                      <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                  </div>
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">{props.openService.charAt(0).toUpperCase() +props.openService.slice(1)}</h1>
                                 <ToastContainer/>
                            <label htmlFor="selectService" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Select a Service</label>
                            <select onChange={(value) => { setSelectedService(value.target.value); getSelectedService(value.target.value); }} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                                <option>Select...</option>
                                  {props.animalReservation.map((service, i) => {
                                      return (
                                          <option key={i} value={service._id}>
                                              {service.serviceName}
                                          </option>
                                      );
                                  })}
                            </select>
                        {infoReservation  && (
                        <div data-aos="zoom-in"><label htmlFor="information" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">More Information</label><div className="relative mb-5 mt-2">
                              <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z"></path>
                                      <circle cx="12" cy="12" r="9"></circle>
                                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                      <polyline points="11 12 12 12 12 16 13 16"></polyline>
                                  </svg>
                              </div>
                              <textarea rows={2} maxLength={100} onChange={(text) => setInformation(text)} defaultValue={infoReservation.information} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-16 text-sm border-gray-300 rounded border resize-none" />
                          </div><label htmlFor="data" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label><div className="relative mb-5 mt-2">
                                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                  </div>
                                  <input id="data" onChange={(value) => setDate(value.target.value)} defaultValue={infoReservation.date} type="datetime-local" min={new Date().toISOString().slice(0, 16)} max={"2024-01-00T10:00"} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" required />
                              </div><label htmlFor="location" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Select a Location</label><div className="relative mb-5 mt-2">
                                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                  </div>
                                  <select onChange={(value) => setLocationSelect(value.target.value)} defaultValue={infoReservation.locationId}   className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                                      {locations?.map((location, i) => {
                                          return (
                                              <option key={i} value={location._id}>
                                                  {location.name}
                                              </option>
                                          );
                                      })}
                                  </select>
                              </div><div className="flex items-center justify-start w-full">
                                  <button onClick={async () => await editReservation()} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => props.setShowModal(!props.showModal)}>Cancel</button>
                              </div><button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => props.setShowModal(!props.showModal)} aria-label="close modal" role="button">
                              </button></div>
                        )}
                    </div>
                </div>
            </div>
    </>
  )
}

export default EditmodalReservationCard