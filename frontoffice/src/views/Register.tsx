import React, { useState, useEffect } from 'react'
import { ApiRepository, ApiResponse, JsonUser } from 'shared'
import ErrorBox from './common/ErrorBox'
import { useNavigate } from 'react-router-dom'
import { Helpers } from 'shared'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retyped, setRetyped] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')

  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [doneClickable, setDoneClickable] = useState(false)
  const navigate = useNavigate()

  const register = async () => {
    // if (!doneClickable) return alert('Please fill all the fields!')
    setIsError(false)
    const input: JsonUser.JsonRegistration = {
      username: username,
      email: email,
      password: password,
      firstName: name,
      lastName: surname,
      city: city,
      country: country,
      street: street,
      zip: zip
    }

    const response: ApiResponse<JsonUser.JsonUser> = await ApiRepository.register(input)
    if (response.esit) {
      let resp = await ApiRepository.login(username, password)
      if (!resp.esit) {
        setError(response.error!.mex)
        return
      } else {
        Helpers.doLogin(resp.data.token)
        const resp2: ApiResponse<JsonUser.JsonAuthInfo> = await ApiRepository.getCurrentUser()
        if (resp2) {
          Helpers.setUserId(resp2.data?.id!)
          navigate('/')
          window.location.reload()
        }
      }
    } else {
      setError(response.error!.mex)
      setIsError(true)
    }
  }

  useEffect(() => {
    setDoneClickable(
      username !== '' &&
      email !== '' &&
      password !== '' &&
      name !== '' &&
      surname !== '' &&
      city !== '' &&
      zip !== '' &&
      country !== '' &&
      street !== '' &&
      retyped !== '' &&
      retyped === password
    )
  }, [username, email, password, name, surname, city, country, zip, street, retyped, isError])

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center ">
          <div
            className="hidden bg-cover lg:block lg:w-2/4"
            style={{
              backgroundImage: "url('../login.jpg')"
            }}
          >
            <div
              //style="border-radius: 1rem"
              className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"
            >
              <div>
                <h2 className="text-4xl font-bold text-white">Register</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Welcome to our animal website! To access all of our features and content, please log in to your
                  account. If you do not have an account yet, please sign up for one.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="mt-8 flex flex-col">
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
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Surname */}
                <div>
                  <label htmlFor="surname" className="block mt-6 mb-2 text-sm text-gray-600">
                    Surname
                  </label>
                  <input
                    type="text"
                    onChange={(event) => setSurname(event.target.value)}
                    name="surname"
                    id="surname"
                    placeholder="surname"
                    className="block w-full px-4 py-2 mt-2 mt-6 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 mt-6 text-sm text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    id="email"
                    placeholder="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Username */}
                <div>
                  <label htmlFor="username" className="block mb-2 mt-6 text-sm text-gray-600">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}
                    id="username"
                    placeholder="username"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Password */}
                <div className="mt-6">
                  <label htmlFor="password" className="text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="your password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block mb-2 mt-6 text-sm text-gray-600">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    onChange={(event) => setCountry(event.target.value)}
                    id="country"
                    placeholder="country"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* City */}
                <div>
                  <label htmlFor="city" className="block mb-2 mt-6 text-sm text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={(event) => setCity(event.target.value)}
                    id="city"
                    placeholder="city"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Street */}
                <div>
                  <label htmlFor="street" className="block mb-2 mt-6 text-sm text-gray-600">
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    onChange={(event) => setStreet(event.target.value)}
                    id="street"
                    placeholder="street"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                {/* Zip */}
                <div>
                  <label htmlFor="zip" className="block mb-2 mt-6 text-sm text-gray-600">
                    ZIP code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    onChange={(event) => setZip(event.target.value)}
                    id="zip"
                    placeholder="zip"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={async () => register()}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className={
                      (doneClickable ? 'bg-indigo-800 hover:bg-indigo-900  ' : 'bg-indigo-800 ') +
                      ' w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm rounded-md focus:outline-none'
                    }
                  >
                    Done!
                  </button>
                </div>

                <p className="mt-6 text-sm text-center text-indigo-500">
                  Already have an account? {' '}
                  <button
                    onClick={() => navigate('/login')}
                    /* click="
                  () => {
                    isLogin = false
                    error = -1
                  }
                "*/
                    className="text-indigo-600 focus:outline-none focus:underline hover:underline"
                  >
                    {' '}
                    Sign in
                  </button>
                  !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
