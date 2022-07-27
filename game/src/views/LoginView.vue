<script lang="ts" setup>
import { login } from '@/network/api'
import { ref } from 'vue'
import * as lh from '@/helpers/loginHelper'
import ErrorBox from '@/components/common/ErrorBox.vue'

let username = ref<string>('')
let password = ref<string>('')
let error = ref<number>(-1)

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
          background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
        "
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Brand</h2>

            <p class="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores,
              repellendus perferendis libero suscipit nam temporibus molestiae
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
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
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm text-gray-600">Password</label>
                <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >Forgot password?</a
                >
              </div>

              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <button
                @click="doLogin"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>

            <p class="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <a href="#" class="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.login-img {
  background-image: url('/login.jpg');
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
