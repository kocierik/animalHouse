import React, { useEffect, useState } from 'react'
import { ApiRepository, ApiResponse, JsonAnimal, Helpers } from 'shared'
import ErrorBox from './common/ErrorBox'
import Select from 'react-select'

interface SelectProp {
  label: string
  value: number
}

const RegisterAnimal = () => {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [type, setType] = useState(-1)
  const [age, setAge] = useState(-1)

  const [doneClickable, setDoneClickable] = useState(false)

  const [types, setTypes] = useState<SelectProp[]>([])

  const register = async () => {
    if (!doneClickable) return
    setIsError(false)

    const userId = Helpers.getUserId()
    if (userId) {
      const input: JsonAnimal.JsonAnimal = {
        name: name,
        type: 'type', // TODO
        age: age as number,
        userId: userId
      }

      const response = await ApiRepository.registerAnimal(input, userId)
      if (response.esit) {
        window.location.href = '/'
      } else {
        setError(response.error!.mex)
        setIsError(true)
      }
    }

    if (!userId) {
      setIsError(true)
      setError('Must be logged to do this operation')
      return
    }
  }

  const fetchAnimalTypes = async () => {
    const response = await ApiRepository.getAnimalCode()
    if (response.esit) {
      setTypes(response.data!.map((e) => ({ value: e.code, label: e.value } as SelectProp)))
    } else setTypes([])
  }

  useEffect(() => {
    setDoneClickable(name !== '' && type !== -1 && age !== -1)
  }, [name, type, age])

  useEffect(() => {
    fetchAnimalTypes()
  }, [])

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center h-screen block" style={{ backgroundImage: "url('/animalbg.png')" }}>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1 bg-white block p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700">Tell me about your firend!</h2>
                <p className="mt-3 text-gray-500">subtitle</p>
              </div>
              <div className="mt-8">
                {isError ? <ErrorBox text={error} /> : <div />}
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block mt-6 mb-2 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Type */}
                <div>
                  <label htmlFor="type" className="block mt-6 mb-2 text-sm text-gray-600">
                    Surname
                  </label>
                  <Select options={types} onChange={(v) => setType(v?.value ?? -1)} />
                </div>
                {/* age */}
                <div>
                  <label htmlFor="age" className="block mb-2 mt-6 text-sm text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="age"
                    onChange={(event) => setAge(Number(event.target.value))}
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
                    className={
                      (doneClickable ? 'bg-green-500 hover:bg-green-600  ' : 'bg-green-300 ') +
                      ' w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm rounded-md focus:outline-none'
                    }
                  >
                    Done!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterAnimal
