import React, { useState } from 'react'
import { ApiRepository, ApiResponse, Helpers, JsonUser } from 'shared'
import ErrorBox from './common/ErrorBox'

export default function Login() {
  /* If the user is already logged redirect to main page */
  if (Helpers.isLogged()) {
    window.location.href = '/'
  }

  const errors = [
    'invalid username or password',
    'username can not be empty',
    'password can not be empty',
    'check your internet connection'
  ]

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(-1)

  const doLogin = async () => {
    if (username === '') setError(1)
    else if (password === '') setError(2)

    if (error !== -1) return

    let resp = await ApiRepository.login(username, password)
    if (!resp.esit) {
      if (resp.statusCode === 403) {
        setError(0)
      } else {
        setError(4)
      }
      return
    } else {
      Helpers.doLogin(resp.data.token)
      const resp2: ApiResponse<JsonUser.JsonAuthInfo> = await ApiRepository.getCurrentUser()
      if (resp2.esit) {
        Helpers.setUserId(resp2.data?.id!)
        window.location.href = '/'
      }
    }
  }

  return (
    <>
      <div className="bg-white" data-aos="fade-up" data-aos-duration="500">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/4"
            style={{
              //border-radius: 1rem;
              backgroundImage:
                'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1470&q=80)'
            }}
          >
            <div
              //style="border-radius: 1rem"
              className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"
            >
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
                <h2 className="text-4xl font-bold text-center text-gray-700">Login</h2>

                <p className="mt-3 text-gray-500">Sign in to access your account</p>
              </div>

              <form
                className="mt-8"
                onSubmit={async (e) => {
                  e.preventDefault()
                  await doLogin()
                }}
              >
                <div className="my-10">{error != -1 ? <ErrorBox text={errors[error]} /> : <div />}</div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
                    Email Address
                  </label>
                  <input
                    onChange={(event) => setUsername(event.target.value)}
                    type="text"
                    name="username"
                    id="email"
                    placeholder="username"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                  </div>
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?
                  <a
                    href="#"
                    /* click="
                  () => {
                    isLogin = false
                    error = -1
                  }
                "*/
                    className="text-green-500 focus:outline-none focus:underline hover:underline"
                  >
                    {' '}
                    Sign up
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
