import React from "react"

const Register = () =>  {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")

  const [pwdMatch, setPwdMatch] = useState(true)

  const register = ()  
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
            { /* Surname */ }
            <div>
              <label htmlFor="surname" className="block mt-6 mb-2 text-sm text-gray-600">Surname</label>
              <input
                type="text"
                onChange={event => setSurname(event.target.value)}
                name="surname"
                id="surname"
                placeholder="surname"
                className="block w-full px-4 py-2 mt-2 mt-6 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            { /* Email */ }
            <div>
              <label htmlFor="email" className="block mb-2 mt-6 text-sm text-gray-600">Email Address</label>
              <input
                type="text"
                name="username"
                onChange={event => setUsername(event.target.value)}
                id="email"
                placeholder="username"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            { /* Password */ }
            <div className="mt-6">
              <label htmlFor="password" className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={event => setPassword(event.target.value)}
                placeholder="your password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            { /* Confirm Password */ }
            <div className="mt-6">
              <label htmlFor="confpassword" className="text-sm text-gray-600">Retype password</label>
              <input
                type="password"
                id="confpassword"
                onChange={event => setPwdMatch(event.target.value === password)}
                placeholder="your password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={register}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
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


export default Register
