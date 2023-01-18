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
if (a === null) window.location.href = router.PersonalizeRoute
else {
  animals.value = JSON.parse(a)
}
</script>

<template>
  <main class="m-8">
    <h1 class="text-5xl font-black text-text">Personal</h1>
    <section class="bg-white">
      <div class="container px-6 py-10 mx-auto">
      
      <h1 class="text-3xl p-5 font-semibold text-gray-800 capitalize lg:text-4xl ">Animal Music</h1>
      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex"> 
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="/music.jpg" alt="">
                
                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <MusicCard class="m-1" :animal="a"/>
                    <!-- <span class="text-sm text-black-500 dark:text-black-300">On: 20 October 2019</span> -->
                </div>
            </div>
      </div>
      <hr class="m-5">
      <h1 class="text-3xl p-5 font-semibold text-gray-800 capitalize lg:text-4xl ">Animal Video</h1>
      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="/video.jpg" alt="">

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <!-- <Video :animal="a" class="m-1" /> -->
                </div>
            </div>
      </div>
      <hr class="m-5">
      <h1 class="text-3xl p-5 font-semibold text-gray-800 capitalize lg:text-4xl ">Animal Horoscope</h1>

      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="/horoscope.jpg" alt="">

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <HoroscopeCard signType="aries" />
                </div>
        </div>
      </div>
      <hr class="m-5">
      <h1 class="text-3xl p-5 font-semibold text-gray-800 capitalize lg:text-4xl ">Animal Pictures</h1>

      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
        <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
            <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="/picsDay.jpg" alt="">

            <div class="flex flex-col justify-between py-6 lg:mx-6">
                <ImageCard :animal="a" class="m-1" />
            </div>
        </div>
      </div>
      </div>
    </section>
  </main>
</template>
