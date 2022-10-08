<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import AnimalIcon from '@/components/common/AnimalIcon.vue'
import { fetchHoroscope } from '../../network/api'

const props = defineProps<{ signType: string }>()

let horoscope = ref<string>('loading...')
let isLoading = ref<boolean>(false)

const loadHoroscope = async () => {
  isLoading.value = true
  let resp = await fetchHoroscope(props.signType)
  if (resp.esit && resp.data !== undefined) {
    horoscope.value = resp.data.horoscope
  } else {
    horoscope.value = 'Error! Check your internet connection!'
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
          <!-- <AnimalIcon class="mb-2 text-2xl font-bold tracking-tight" :sign="props.signType" /> -->
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ props.signType }}</h5>
        </div>
        <p class="text-text">
          {{ horoscope }}
        </p>
      </div>
    </a>
  </div>
</template>

<style></style>
