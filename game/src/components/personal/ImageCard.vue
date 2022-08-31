<template>
  <div class="content-center flex justify-center">
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>

    <div v-else class="flex flex-col bg-llime flex-1 max-w-sm bg-white rounded-lg border border-gray-200 p-6 shadow-md">
      <div class="flex justify-start space-x-3">
        <AnimalIcon class="mb-2 text-2xl font-bold tracking-tight" :animal="props.animal" />
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Pic of the day</h5>
      </div>
      <img :src="img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import AnimalIcon from '@/components/common/AnimalIcon.vue'
import { AnimalType, getAnimalPicture } from 'shared'

const props = defineProps<{ animal: AnimalType }>()

let img = ref<string>('')
let isLoading = ref<boolean>(false)

onBeforeMount(async () => {
  isLoading.value = true
  if (props.animal === undefined) console.log('Cannot load picture of undefined')
  img.value = await getAnimalPicture(props.animal)
  isLoading.value = false
})
</script>

<style></style>
