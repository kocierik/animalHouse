import React, { useEffect, useState } from 'react'
import { ApiRepository, type JsonUser, Helpers } from 'shared';
import AnimalCard from './AnimalCard';


const Profile = () => {

  const [user,setUser] = useState<JsonUser.JsonUser>()
  const [file, setFile] = useState<File>()

  
  const test = {
    email: "man@ah.com",
    username: "erikMan",
    password: "erik",
    firstName: "erik",
    lastName: "koci",
    phone: "3333333333",
    animals: ["cane","gatto"],
    address: {cap: 3434, city: "rimini",contry: "riccione", street:"via annibolina"}
  }

  const sendImage = async () =>{
    if(file){
      const resp = await ApiRepository.postUserPicture(Helpers.getUserId(), file!) 
      if (!resp.esit)
        console.log(resp, "error sendImage")
    }
  }

  const getImage = async () =>{
    const user = (await ApiRepository.getCurrentUser()).data
    if(user){
      console.log(user)
      const userInfo = (await ApiRepository.getUserInfoById(user.id))
      console.log(userInfo)
    }
  }

  useEffect(() =>{
    console.log(file)
    sendImage()
    getImage()
  },[file,])


  

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
                       <img className=" rounded-full -mt-5 border border-gray-100 shadow-sm" src="https://i1.wp.com/www.cinefilos.it/wp-content/uploads/2017/01/Avatar-Sequel.jpg" alt="user image" />
                    <div className="absolute top-0 right-0 h-6 w-6 my-1  border-2 border-white rounded-full bg-gray-300 z-2">
                      <label>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth="2.5" stroke="black" className="w-6 h-6 cursor-pointer ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      <input id="dropzone-file" type="file" className="hidden" onChange={(e) =>setFile( e.target.files![0]) } />
                      </label>
                    </div>
                    </div>
                  </div>
             

                
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">{test?.username} </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt text-lg text-gray-500"></i> {test.firstName} {test.lastName}
                  </div>
                </div>
                
                <div className='flex flex-col items-center'>
                  <div className="w-full   px-4 lg:order-1">
                    <div className="flex flex-col justify-center py-4 lg:pt-4 pt-8">
                      <div className='flex flex-row justify-center items-center'>
                      <div className="mr-4 p-3 text-center flex justify-center flex-1 gap-5 flex-col md:flex-row">
                        <AnimalCard />
                        <AnimalCard />
                      </div>
                      </div>
                  {/* { Helpers.isLogged() &&   <div className="w-full lg:w-4/12  lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0 text-center	">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                      >
                        Connect
                      </button>
                    </div>
                  </div>} */}
                      {/* <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">89</span>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick
                        Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a
                        solid groove structure. An artist of considerable range.
                      </p>
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
