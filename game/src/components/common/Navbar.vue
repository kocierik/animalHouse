<script setup lang="ts">
import { ref } from 'vue'
import * as router from '@/router/index'
import * as lh from '@/helpers/loginHelper'

const defaultMenuClasses = 'w-full md:block md:w-auto'

const changeColorNav = (id: string) => {
  const dict = [{ name: 'isHome' }, { name: 'isPersonal' }, { name: 'isGames' }]

  document.addEventListener('click', function () {
    dict.forEach((element) => {
      document.getElementById(element.name).style.backgroundColor = 'white'
    })
    document.getElementById(id).style.backgroundColor = '#eafff1'
  })
}

let menuOpen = false
let menuClasses = ref<string>('hidden ' + defaultMenuClasses)
let isLogged = ref<boolean>(lh.isLogged())
const toggleMenu = () => {
  menuOpen = !menuOpen
  if (menuOpen) menuClasses.value = defaultMenuClasses
  else menuClasses.value = 'hidden ' + defaultMenuClasses
}

const login = () => {
  window.location.href = '/login'
}

const logout = () => {
  // TODO maybe an alert
  lh.doLogout()
  window.location.href = '/'
}
</script>

<template>
  <div class="border-2 border-y-green-100 rounded shadow-lg">
    <nav class="border-gray-200 px-2 sm:px-4 py-2.5 shadow">
      <div class="container justify-between flex flex-wrap items-center mx-auto">
        <a href="/" class="flex items-center ml-2">
          <span class="p-1 mr-5 self-center text-xl font-semibold whitespace-nowrap">Animal House</span>
        </a>
        <button
          @click="toggleMenu"
          data-collapse-toggle="mobile-menu"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <div id="mobile-menu flex w-full " style="flex: auto" :class="menuClasses">
          <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li
              id="isHome"
              v-on:click="changeColorNav('isHome')"
              class="text-black hover:bg-green-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              <router-link :to="router.HomeRoute">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Home
                </a>
              </router-link>
            </li>
            <li
              id="isPersonal"
              v-on:click="changeColorNav('isPersonal')"
              class="text-black hover:bg-green-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              <router-link :to="router.PersonalRoute">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Personal
                </a>
              </router-link>
            </li>
            <li
              id="isGames"
              v-on:click="changeColorNav('isGames')"
              class="text-black hover:bg-green-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              <router-link :to="router.GamesRoute">
                <a
                  href="#"
                  class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Games
                </a>
              </router-link>
            </li>
            <li class="flex flex-1 justify-start md:justify-end">
              <router-link :to="router.LoginRoute" class="self-center ml-3">
                <a
                  v-if="isLogged"
                  v-on:click="changeColorNav('isLogin')"
                  @click="logout()"
                  href="#"
                  class="text-black hover:bg-yellow-100 bg-yellow-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </a>
                <a
                  v-else
                  v-on:click="changeColorNav('isLogin')"
                  @click="login()"
                  href="#"
                  class="shadow-inner hover:bg-yellow-100 bg-yellow-200 hover:text-black px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
