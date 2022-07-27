<script lang="ts" setup>
import { login } from '@/network/api'
import { ref } from 'vue'
import * as lh from '@/helpers/loginHelper'
import ErrorBox from '@/components/common/ErrorBox.vue'
import Footer1 from '../components/common/Footer.vue'
import { AnimalType } from '../../../shared/animalPics'

let username = ref<string>('')
let password = ref<string>('')
let error = ref<number>(-1)
let isLogin = true

const errors = [
  'invalid username or password',
  'username can not be empty',
  'password can not be empty',
  'check your internet connection',
]

const doLogin = async () => {
  if (username.value === '') error.value = 1
  else if (password.value === '') error.value = 2

  if (error.value !== -1) return

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

console.log(lh.isLogged())
</script>

<template>
  <!-- component -->
  <div class="bg-white">
    <div class="flex justify-center h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/4"
        style="
          border-radius: 1rem;
          background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
        "
      >
        <div style="border-radius: 1rem" class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Brand</h2>

            <p class="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores,
              repellendus perferendis libero suscipit nam temporibus molestiae
            </p>
          </div>
        </div>
      </div>

      <div v-if="isLogin" class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700">Login</h2>

            <p class="mt-3 text-gray-500">Sign in to access your account</p>
          </div>

          <div class="mt-8">
            <div class="my-10" v-if="error >= 0">
              <ErrorBox :title="'Ups, something went wrong :/'" :mex="errors[error]" />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm text-gray-600">Email Address</label>
              <input
                v-model="username"
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm text-gray-600">Password</label>
                <a href="#" class="text-sm text-gray-400 focus:text-green-500 hover:text-green-500 hover:underline"
                  >Forgot password?</a
                >
              </div>

              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <button
                @click="doLogin"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>

            <p class="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <a
                href="#"
                @click="
                  () => {
                    isLogin = false
                    error = -1
                  }
                "
                class="text-green-500 focus:outline-none focus:underline hover:underline"
                >Sign up</a
              >.
            </p>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700">Register</h2>

            <p class="mt-3 text-gray-500">Sign up to create your account</p>
          </div>

          <div class="mt-8">
            <div class="my-10" v-if="error >= 0">
              <ErrorBox :title="'Ups, something went wrong :/'" :mex="errors[error]" />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm text-gray-600">Email Address</label>
              <input
                v-model="username"
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm text-gray-600">Password</label>
                <a href="#" class="text-sm text-gray-400 focus:text-green-500 hover:text-green-500 hover:underline"
                  >Forgot password?</a
                >
              </div>

              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <label for="email" class="block mt-5 text-sm text-gray-600">Select your animals</label>
            <div class="flex justify-between flex-wrap flex-row pt-3">
              <div class="flex items-center mr-4" v-for="animal in AnimalType">
                <input
                  id="green-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-green-600 bg-green-400 rounded border-green-300 focus:ring-green-300 focus:ring-2"
                />
                <label for="green-checkbox" class="ml-2 p-1 text-sm font-medium text-gray-900 dark:text-gray-600">{{
                  animal
                }}</label>
              </div>
            </div>
            <div class="mt-6">
              <button
                @click="doLogin"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
                Sign up
              </button>
            </div>

            <p class="mt-6 text-sm text-center text-gray-400">
              have an account?
              <a
                href="#"
                class="text-green-500 focus:outline-none focus:underline hover:underline"
                @click="
                  () => {
                    isLogin = true
                    error = -1
                  }
                "
                >Sign in</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer1 />
</template>
