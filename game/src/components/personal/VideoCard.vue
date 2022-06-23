<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { video } from '../../network/models/VideoLink'
import { AnimalType } from '../../../../shared/animalPics'
const props = defineProps<{ animal: AnimalType }>()

const getRandomVideo = (animal: AnimalType) => {
  const number = Math.floor(Math.random() * 3)
  const uri = 'https://www.youtube.com/embed/' + video.get(animal)[number] + '?autoplay=1&mute=1'
  return uri
}
</script>

<template>
  <div>
    <iframe width="420" height="315" :src="getRandomVideo(props.animal)"> </iframe>
  </div>
</template>
