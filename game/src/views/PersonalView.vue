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
      
      <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:grid grid-cols-2">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
                
                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <MusicCard class="m-1" :animal="a"/>
                    <!-- <span class="text-sm text-black-500 dark:text-black-300">On: 20 October 2019</span> -->
                </div>
            </div>
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <Video :animal="a" class="m-1" />
                </div>
            </div>
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <HoroscopeCard signType="aries" />
                </div>
            </div>
            <div v-for="a in animals" :animal="a" v-bind:key="a" class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <ImageCard :animal="a" class="m-1" />
                </div>
            </div>

        </div>
    </div>
</section>
    <!-- <div>
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
          CHANGE TO ANIMAL SIGN
          <HoroscopeCard signType="aries" />
        </div>
      </div>
    </div> -->
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
