<script setup lang="ts">
import { video } from '../../network/models/VideoLink'
import type { AnimalType } from 'shared'

const props = defineProps<{ animal?: AnimalType; videoCode?: string }>()

const getRandomVideo = (animal: AnimalType) => {
  const number = Math.floor(Math.random() * 3)
  const uri = 'https://www.youtube.com/embed/' + video.get(animal)![number] + '?autoplay=1&mute=1'
  return uri
}

const videoFromVideoCode = (code: string) => `https://www.youtube.com/embed/${code}?autoplay=1&mute=1`
</script>

<template>
  <div class="shadow rounded-xl p-5 m-4">
    <iframe class="w-full" v-if="props.animal" :src="getRandomVideo(props.animal)"> </iframe>
    <iframe class="w-full" v-if="props.videoCode" :src="videoFromVideoCode(props.videoCode)"> </iframe>
  </div>
</template>
