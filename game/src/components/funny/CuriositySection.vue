<script lang="ts" setup>
import { fetchCatFacts, fetchFakeFact } from '@/network/api'
import { AnimalType } from 'shared'
import { onBeforeMount, ref } from 'vue'

const fact = ref<string>()

const fetchFacts = async () => {
  const animalTypes = [
    AnimalType.Bunny,
    AnimalType.Cat,
    AnimalType.Dog,
    AnimalType.Duck,
    AnimalType.Fox,
    AnimalType.Koala,
    AnimalType.Lizard,
    AnimalType.Panda
  ]
  const randomIndex = Math.ceil(((Math.random() * 10) % animalTypes.length) - 1)
  const response = await fetchFakeFact(animalTypes[randomIndex])
  fact.value = response.data?.data[0]
}

onBeforeMount(async () => {
  await fetchFacts()
})
</script>
<template>
  <div v-if="fact" class="p-5 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
    <h1 class="text-text font-black text-6xl text-center mb-10">Curiosity</h1>
    <div class="shadow rounded-xl w-50 p-4">
      <h2 class="font-black text-2xl text-text">Did you know that...</h2>
      <p class="my-2">
        {{ fact }}
      </p>
      <button
        @click="fetchFacts"
        class="rounded-2xl text-s bg-lyellow hover:dyellow font-black text-text py-2 px-3 hover:-translate-y-1 hover:scale-105 duration-300"
      >
        Another
      </button>
    </div>
  </div>
</template>
