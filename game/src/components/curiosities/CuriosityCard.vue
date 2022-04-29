<template>
<div class="content-center">
  <a class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Fact!</h5>
    <p class="font-normal text-gray-700">
      {{ fact }}
    </p>
</a>
<button @click="loadFact()" class="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded-full">
  Button
</button>
</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import fetchCatFacts from "@/network/api"

let fact = ref<string>("loading...")

const loadFact = async () => {
  let resp = await fetchCatFacts();
  if (resp.esit && resp.data !== undefined) {
    fact.value = resp.data.data[0];
  } else {
    fact.value = "Error! Check your internet connection!"
    console.error("Can't fetch facts")
  }
}

onBeforeMount(loadFact);
</script>


<style>
</style>

