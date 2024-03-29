<script setup lang="ts">
import { ref } from 'vue'
import * as router from '@/router/index'
import { Helpers } from 'shared'

interface NavbarItem {
  title: string
  destination: string
}

const navbarItems: NavbarItem[] = [
  {
    title: 'Home',
    destination: router.HomeRoute
  },
  {
    title: 'Shop',
    destination: router.ShopRoute
  },
  {
    title: 'Fun',
    destination: router.FunnyRoute
  },
  {
    title: 'Personal',
    destination: router.PersonalRoute
  }
]

const defaultMenuClasses = 'w-full md:block md:w-auto'

const changeColorNav = (id: string) => {
  const dict = navbarItems.map((item) => ({ name: item.destination }))

  document.addEventListener('click', function () {
    dict.forEach((element) => {
      document.getElementById(element.name)!.style.backgroundColor = 'white'
    })
  })
}

let menuOpen = false
let menuClasses = ref<string>('hidden ' + defaultMenuClasses)
let isLogged = ref<boolean>(Helpers.isLogged())
const toggleMenu = () => {
  menuOpen = !menuOpen
  if (menuOpen) menuClasses.value = defaultMenuClasses
  else menuClasses.value = 'hidden ' + defaultMenuClasses
}

const login = () => {
  router.redirect('/login')
}

const logout = () => {
  // TODO maybe an alert
  Helpers.doLogout()
  window.location.reload()
  router.redirect('/')
}

const root = import.meta.env.BASE_URL
</script>

<template>
  <div class="animate-in fade-in zoom-in duration-500">
    <nav class="px-2 sm:px-4">
      <div class="container justify-between flex flex-wrap items-center mx-auto">
        <a class="flex items-center ml-2">
          <img alt="animal house logo" src="/logoTransparent.png" width="80" />
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

        <div id="mobile-menu flex w-full" style="flex: auto" :class="menuClasses">
          <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li
              v-for="item in navbarItems"
              :key="item.destination"
              :id="item.destination"
              v-on:click="changeColorNav(item.destination)"
              class="text-black hover:bg-green-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              <router-link :to="item.destination">
                <a
                  href="#"
                  class="hover:-translate-y-1 duration-300 block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  {{ item.title }}
                </a>
              </router-link>
            </li>
            <li class="flex flex-1 justify-start md:justify-end">
              <router-link :to="router.LoginRoute" v-if="isLogged" class="hover:-translate-y-1 duration-300 self-center ml-3">
                <a
                  
                  v-on:click="changeColorNav('isLogin')"
                  @click="logout()"
                  href="#"
                  class="hover:-translate-y-1 hover:scale-110 duration-300 text-black hover:bg-yellow-100 lg:bg-yellow-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </a>
              </router-link>
                <div class="flex gap-5" v-else>
                <a
                  v-on:click="changeColorNav('isLogin')"
                  @click="login()"
                  href="#"
                  class="hover:bg-yellow-100 lg:bg-yellow-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/frontoffice/register"
                  class="hover:bg-yellow-100 lg:bg-yellow-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </a>
                </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
