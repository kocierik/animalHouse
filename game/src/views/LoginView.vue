<script lang="ts" setup>
import { ref } from 'vue'
import ErrorBox from '@/components/common/ErrorBox.vue'
import { ApiRepository, ApiResponse, Helpers, JsonUser } from 'shared'
import { redirect } from '@/router';

/* If the user is already logged redirect to main page */
if (Helpers.isLogged()) {
  redirect('/')
}

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

  let resp = await ApiRepository.login(username.value, password.value)
  if (!resp.esit) {
    if (resp.statusCode === 403) {
      error.value = 0
    } else {
      error.value = 4
    }
    return
  } else {
    Helpers.doLogin(resp.data.token)
    const resp2: ApiResponse<JsonUser.JsonAuthInfo> = await ApiRepository.getCurrentUser()
    if (resp2.esit) {
      Helpers.setUserId(resp2.data!.id)
      redirect('/')
    }
  }
}

const goToRegister = () => {
  redirect('/register', true)
}

const imageUrl = import.meta.env.BASE_URL + "/login.jpg"
</script>

<template>
  <div class="bg-white animate-in fade-in zoom-in duration-500">
    <div class="flex justify-around p-8">
      <div
        class="hidden bg-cover lg:block lg:w-2/4"
        :style="`
          border-radius: 1rem;
          background-image: url(${imageUrl});
          background-size: contain;
          background-position: right;
          background-repeat: no-repeat;`
        "
      />

      <div class="flex justify-start items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1 rounded-lg shadow-lg p-6">
          <div class="text-center">
            <h2 class="text-4xl font-black text-center text-text">Login</h2>
            <p class="mt-3 font-bold text-text-500">Sign in to access your account</p>
          </div>
          <div class="mt-8">
            <div class="my-10" v-if="error >= 0">
              <ErrorBox :mex="errors[error]" />
            </div>
            <div>
              <label for="username" class="block font-bold mb-2 text-sm text-text">Username</label>
              <input
                v-model="username"
                type="username"
                name="username"
                id="username"
                placeholder="Your Username"
                class="block w-full px-4 py-2 mt-2 text-text placeholder-gray-400 bg-white border border-lgreen rounded-full"
              />
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="text-sm font-bold text-text">Password</label>
                <a href="#" class="text-sm text-text-400 focus:text-green-500 hover:text-green-500 hover:underline"
                  >Forgot password?</a
                >
              </div>
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                class="block w-full px-4 py-2 mt-2 text-text placeholder-gray-400 bg-white border border-lgreen rounded-full"
              />
            </div>
            <div class="mt-6">
              <button
                @click="doLogin"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="w-full px-4 py-2 tracking-wide font-extrabold text-text transition-colors duration-200 transform bg-lyellow rounded-full hover:bg-dyellow"
              >
                Sign in
              </button>
            </div>
          </div>
          <p class="mt-6 font-bold text-sm text-center text-text-400">
            Don&#x27;t have an account yet?
            <a href="#" @click="goToRegister" class="text-green-500 focus:outline-none focus:underline hover:underline">
              Sign up </a
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
