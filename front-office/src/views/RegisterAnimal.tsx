import React, { useEffect, useState } from "react"
import { ApiRepository, ApiResponse, JsonAnimal, Helpers } from 'shared'
import ErrorBox from './common/ErrorBox'

const RegisterAnimal = () => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")

  const [name, setName ] = useState("")
  const [type, setType] = useState("")
  const [age, setAge] = useState(-1)

  const [doneClickable, setDoneClickable] = useState(false)

  const register = async () => {
    if (!doneClickable) return;
    setIsError(false)
    const input: JsonAnimal.JsonAnimal = {
        name: name,
        type: type,
        age: age as number
      }

    const response = await ApiRepository.registerAnimal([ input ], Helpers.getUserId())
    if (response.esit) {
      window.location.href = "/"
    } else {
      console.log(response.error!.mex)
      setError(response.error!.mex)
      setIsError(true)
    }
  }

  useEffect(() => {
    setDoneClickable(name !== "" && type !== "" && age !== -1)
  }, [name, type, age])

  return <>
  <div className="bg-white">
    <div className="flex justify-center h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-2/4"
        style={{
        //border-radius: 1rem;
          backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1470&q=80)",
        }}>
        <div 
        //style="border-radius: 1rem" 
        className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-4xl font-bold text-white">Brand</h2>

            <p className="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores,
              repellendus perferendis libero suscipit nam temporibus molestiae
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-center text-gray-700">Nice to meet you!</h2>
            <p className="mt-3 text-gray-500">Tell me more about you</p>
          </div>
          <div className="mt-8">
            { isError? <ErrorBox text={error} /> : <div/> }
            { /* Name */ }
            <div>
              <label htmlFor="name" className="block mt-6 mb-2 text-sm text-gray-600">Name</label>
              <input
                onChange={event => setName(event.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            { /* Type */ }
            <div>
              <label htmlFor="type" className="block mt-6 mb-2 text-sm text-gray-600">Surname</label>
              <input
                type="text"
                onChange={event => setType(event.target.value)}
                name="type"
                id="type"
                placeholder="type"
                className="block w-full px-4 py-2 mt-2 mt-6 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            { /* age */ }
            <div>
              <label htmlFor="age" className="block mb-2 mt-6 text-sm text-gray-600">Email Address</label>
              <input
                type="text"
                name="age"
                onChange={event => setAge(event.target.value)}
                id="age"
                placeholder="age"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={register}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className={(doneClickable? "bg-green-500 hover:bg-green-600  " : "bg-green-300 ") + " w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm rounded-md focus:outline-none"}>
                Done!
              </button>
            </div>

            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?
              <a
                href="#"
               /* click="
                  () => {
                    isLogin = false
                    error = -1
                  }
                "*/
                className="text-green-500 focus:outline-none focus:underline hover:underline"
                > Sign in</a>!
            </p>
        </div>
      </div>
      </div>
    </div>
  </div>
</>
}

export default RegisterAnimal
