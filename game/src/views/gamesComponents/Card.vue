<script setup lang="ts">
const props = defineProps({
  name: String,
  url: String,
  image: String,
})
</script>
<style>
.imageCover {
  background-size: cover;
}
</style>
<template>
  <div
    v-bind:style="{ backgroundImage: 'url(' + props.image + ')' }"
    class="max-w-sm bg-white imageCover rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
  >
    <div style="background-color: #4444" class="w-100 h-100 bg-red">
      <a href="#"> </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <router-link :to="props.url">
              <a href="#"> {{ props.name }}</a>
            </router-link>
          </h5>
        </a>
        <p class="mb-3 font-normal text-white">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <a
          :href="props.url"
          class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Play now
          <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
