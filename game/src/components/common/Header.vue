<script setup lang="ts">
import * as router from '@/router/index'
</script>
<template>
  <header>
    <!-- Background image -->
    <div
      class="relative overflow-hidden bg-no-repeat bg-cover"
      style="
        background-position: 50%;
        background-image: url('https://www.amoreaquattrozampe.it/wp-content/uploads/2020/04/740cane_jack_russel_AdobeStock.jpeg');
        height: 95vh;
      "
    >
      <div
        class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style="background-color: rgba(0, 0, 0, 0.75)"
      >
        <div class="flex justify-center items-center h-full">
          <div class="text-center text-white px-6 md:px-12">
            <h1 class="text-5xl font-bold mt-0 mb-6">The Best Resort</h1>
            <h3 class="text-3xl font-bold mb-8">For your Pet</h3>
            <button
              type="button"
              class="inline-block px-6 py-2.5 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
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
    <!-- Background image -->
  </header>
</template>
