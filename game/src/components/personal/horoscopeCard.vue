<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { fetchCatFacts } from '@/network/api'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import AnimalIcon from '@/components/common/AnimalIcon.vue'
import type { AnimalType } from 'shared'
import { fetchHoroscope } from '../../network/api'

const props = defineProps<{ sign: string }>()

let fact = ref<string>('loading...')
let isLoading = ref<boolean>(false)

const loadHoroscope = async () => {
  isLoading.value = true
  let resp = await fetchHoroscope()
  if (resp.esit && resp.data !== undefined) {
    fact.value = resp.data.horoscope
  } else {
    fact.value = 'Error! Check your internet connection!'
    // eslint-disable-next-line quotes
    console.error("Can't fetch horoscope")
  }
  isLoading.value = false
}

onBeforeMount(loadHoroscope)
</script>

<template>
  <div class="content-center">
    <div v-if="isLoading" class="flex justify-center">
      <LoadingSpinner />
    </div>
    <a v-else class="block bg-llime max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div class="p-6">
        <div class="flex justify-start space-x-3">
          <AnimalIcon class="mb-2 text-2xl font-bold tracking-tight" :sign="props.sign" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Fact!</h5>
        </div>
        <p class="text-text">
          {{ fact }}
        </p>
      </div>
    </a>
  </div>
</template>

<style></style>
