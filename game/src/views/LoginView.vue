<script lang="ts" setup>
import { login } from '@/network/api'
import { ref } from 'vue'
import * as lh from '@/helpers/loginHelper'

let username = ref<string>("")
let password = ref<string>("")
let error = ref<number>(-1)

const errors = [ 
  "invalid username or password",
  "username can not be empty", 
  "password can not be empty",
  "check your internet connection" ]

const doLogin = async () => {
  if (username.value === "")
    error.value = 1
  else if (password.value === "")
    error.value = 2
  if (error.value !== -1)
    return

  let resp = await login(username.value, password.value) 
  if (!resp.esit) {
    if (resp.statusCode === 403) {
      error.value = 0
    } else {
      error.value = 4 
    }
    return
  } else {
    lh.doLogin(resp.data.token)
    window.location.href = '/'
  }
}

if (lh.isLogged()) {
  window.location.href = '/'
}

</script>

<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div href="#" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 flex justify-center">
            <img class="object-contain w-full" src="/public/login.jpg"/>
          </div>
          <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
            <div v-if="error >= 0">
                {{ errors[error] }} 
              </div>

              <!-- Email input -->
              <div class="mb-6">
                <input
                  v-model="username"
                  type="text"
                  class="form-control block w-full px-7 py-3 text-xl font-normal text-gray-800 bg-white bg-clip-padding border-2 border-solid border-gray-800 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Email address"/>
              </div>

              <!-- Password input -->
              <div class="mb-6">
                <input
                  v-model="password"
                  class="form-control block w-full px-7 py-3 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-800 rounded-3xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Password"/>
              </div>

              <div class="flex justify-between items-center mb-6">
                <a href="#!"
                  class="text-emerald-500 hover:text-emerald-600 focus:text-emarald-600 active:text-emarld-800 duration-200 transition ease-in-out">
                  Forgot password?
                </a>
              </div>

              <!-- Submit button -->
              <button
                @click="doLogin"
                class="inline-block px-7 py-3 font-bold bg-emerald-400 text-xl leading-snug rounded-3xl shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Sign in
              </button>

              <div
                class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 mb-0">OR</p>
              </div>

              <button
                class="inline-block px-7 py-3 font-bold bg-yellow-300 text-xl leading-snug rounded-3xl shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                style=""
                href="#!"
                role="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                Signup
              </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
