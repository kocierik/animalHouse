<script setup lang="ts">
import ViewTitle from '@/components/personal/ViewTitle.vue'
import FactCard from '@/components/personal/FactCard.vue'
import ImageCard from '@/components/personal/ImageCard.vue'
import MusicCard from '@/components/personal/MusicCard.vue'
import AddImageCard from '@/components/personal/AddImageCard.vue'
import * as router from '@/router/index'
import type { AnimalType } from 'shared'
import { Helpers } from 'shared'
import { ref } from 'vue'
import Video from '@/components/personal/VideoCard.vue'
import HoroscopeCard from '../components/personal/horoscopeCard.vue'

const animals = ref<AnimalType[]>()
const a = localStorage.getItem(Helpers.LS_PersonalAnimals)
if (!a) 
  router.redirect(router.PersonalizeRoute)
else {
  animals.value = JSON.parse(a)
}
</script>

<template>
  <main class="m-8">
    <h1 class="text-5xl font-black text-text">Personal</h1>
    <div>
      <div class="my-4">
        <h2 class="text-text text-2xl font-extrabold">Facts</h2>
        <div class="flex flex-wrap justify-evenly">
          <FactCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
        </div>
      </div>
      <div class="my-4">
        <h2 class="text-text text-2xl font-extrabold">Pictures of the day</h2>
        <div class="flex flex-wrap justify-evenly">
          <ImageCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
          <AddImageCard class="self-center" />
        </div>
      </div>
      <div class="my-4">
        <h2 class="text-text text-2xl font-extrabold">Our playlists</h2>
        <div class="flex flex-wrap justify-evenly">
          <MusicCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
        </div>
      </div>
      <div class="my-4">
        <h2 class="text-text text-2xl font-extrabold">Videos of the day</h2>
        <div class="flex flex-wrap justify-evenly">
          <Video v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
        </div>
      </div>
      <div class="my-4">
        <h2 class="text-text text-2xl font-extrabold">Horoscope</h2>
        <div class="flex flex-wrap justify-evenly">
          <!-- CHANGE TO ANIMAL SIGN -->
          <HoroscopeCard signType="aries" />
        </div>
      </div>
    </div>
    <!-- 
    <div class="masonry sm:masonry-sm md:masonry-md flex flex-wrap justify-center">
      <FactCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
      <ImageCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
      <MusicCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
      <Video v-for="a in animals" :animal="a" v-bind:key="a" class="m-1" />
      <AddImageCard class="self-center" />
    </div> -->
  </main>
</template>
