import React, { useEffect, useRef, useState } from 'react'
import ModalReservationCard from './ModalReservationCard'
import { ApiRepository, JsonService} from 'shared';
import { FaBriefcase } from 'react-icons/fa';
import { BanIcon, CakeIcon, FilmIcon, FireIcon, FlagIcon, GiftIcon, HomeIcon, MapIcon, SunIcon } from '@heroicons/react/solid';

const serviceIcon = [{
    icon: <CakeIcon height={20}/>
},{
    icon: <MapIcon height={20}/>
},{
    icon: <BanIcon height={20}/>
},{
    icon: <SunIcon height={20}/>
},{
    icon: <FireIcon height={20}/>
},{
    icon: <FilmIcon height={20}/>
},{
    icon: <GiftIcon height={20}/>
},{
    icon: <FlagIcon height={20}/>
},{
    icon: <HomeIcon height={20}/>
},
]


const ServiceCard = () => {
    const [showModal,setShowModal] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [openService,setOpenService] = useState("")
    const [services,setServices] = useState<JsonService.IService[]>([])
    const executeScroll = () => {
        scrollRef.current?.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})  
    }

    const getServices = async () =>{
        const resp = await ApiRepository.getServices()
        console.log(resp)
        setServices(resp.data!)
    }

    useEffect(() => {
        getServices()
        if(showModal)
            executeScroll()
    },[showModal])

  return (<>
    <div data-aos="zoom-in" className="px-3 md:lg:xl:px-40  rounded border-t border-b py-20 bg-opacity-10" >
  <h2 className="mb-4 text-3xl font-bold">Services</h2>
    <div ref={scrollRef}>
        {showModal && <ModalReservationCard  showModal={showModal} setShowModal={setShowModal} openService={openService} />}
    </div>
  <div className="grid mb-10 lg:grid-cols-2 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border ">
    {
        services?.map((service,i) => {
        return (
            <div onClick={() => {setShowModal(true); setOpenService(service.title)}}  key={i} className='hover:-translate-y-2 hover:scale-100 duration-300'>
            <div 
            data-aos="zoom-in"
                className="p-10   rounded flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                <span className={service.color}>
                    {serviceIcon[i].icon}
                </span>
                <p className="text-xl font-medium text-slate-700 mt-3">{service.title}</p>
                <p className="mt-2 text-sm text-slate-500">{service.description}</p>
            </div>
            </div>
        )
        })
    }
    </div>
    
        <div data-aos="zoom-in" className="w-full flex flex-col rounded bg-indigo-900 shadow-xl shadow-indigo-200 py-10 px-20 flex justify-between items-center">
            <p className="text-white p-5"> <span className="text-xl font-medium">Still Confused?</span> </p>
            <button onClick={() => setShowModal(true)} className="px-5 py-3 hover:-translate-y-2 hover:scale-100 duration-300 font-medium text-white shadow-xl  hover:bg-indigo-900 duration-150  bg-indigo-800">BOOK AN APPOINTMENT </button>
        </div>
    </div>
    </>
  )
}
export default ServiceCard
