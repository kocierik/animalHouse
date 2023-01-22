<script setup lang="ts">
import * as router from '@/router/index'

const headerBg = import.meta.env.BASE_URL+ '/homeHeader.jpg'
</script>
<template>
  <header>
    <div
      class="relative overflow-hidden bg-no-repeat bg-cover animate-in fade-in zoom-in duration-500"
      :style="`background-position: 50%; background-image: url(${headerBg}); height: 95vh`"
    >
      <div
        class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style="background-color: #fffa"
      >
        <div class="flex justify-center items-center h-full">
          <div class="text-center text-white px-6 md:px-12">
            <h1 class="text-6xl text-text font-extrabold mt-0 mb-6">The Best Resort</h1>
            <h3 class="text-4xl text-text font-extrabold mb-8">For your Pet</h3>
            <button
              type="button"
              class="hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-lgreen bg-lyellow text-black font-extrabold py-3 px-7 rounded-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              hover:bg-sky-700
            >
              <router-link :to="{ path: router.PersonalRoute }"> Personal Area </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
