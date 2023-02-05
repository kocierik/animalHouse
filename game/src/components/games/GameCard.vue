<script setup lang="ts">
import { redirect } from '@/router';

const props = defineProps<{
  name: string
  url: string
  image: string
}>()

</script>
<style>
.imageCover {
  background-size: cover;
}
</style>
<template>
  <div
    data-aos="fade-up"
    v-bind:style="{ backgroundImage: 'url(' + props.image + ')' }"
    class="max-w-sm bg-white imageCover rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
  >
            <router-link :to="props.url">
    <div style="background-color: #4444" class="w-100 h-100 bg-red">
      <a href="#"> </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#" class="text-white text-2xl"> {{ props.name }}</a>
          </h5>
        </a>
        <p class="mb-3 font-bold text-white">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <div
          class="hover:-translate-y-1 duration-300 inline-flex items-center py-2 px-3 text-sm font-black text-center text-text bg-lyellow rounded-2xl hover:bg-dyellow focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Play now
          <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
            </router-link>
  </div>
</template>
