<template>
<div class="content-center">
  <a class="block max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
    <div v-if=isLoading class="py=70">
        <span> loading... </span>
    </div>
    <div v-else>
      <img :src=img />
    </div>
</a>
<button @click="loadFact()" class="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full">
  Button
</button>
</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { fetchCatImg } from "@/network/api"

let img = ref<string>("")
let isLoading = ref<boolean>(false)

const loadFact = async () => {
  isLoading.value = true
  let resp = await fetchCatImg()
  if (resp.esit && resp.data !== undefined) {
    img.value = resp.data[0].url
  } else {
    console.error("Can't fetch image")
  }
  isLoading.value = false 
}

onBeforeMount(loadFact);
</script>


<style>
</style>

