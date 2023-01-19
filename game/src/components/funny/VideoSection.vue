<script lang="ts" setup>
import { AnimalType, Helpers } from 'shared';
import { onBeforeMount, ref } from 'vue'
import VideoCard from '../personal/VideoCard.vue';
import * as router from '@/router/index'

const VIDEO_NO = 3
const randomAnimalTypes = ref<AnimalType[]>()

const goToVideoWall = () => 
    router.redirect(router.FunnyVideosRoute)

const calculateRandomAnimalType = () => {
    const animalTypes = [AnimalType.Bunny, AnimalType.Cat, AnimalType.Dog, AnimalType.Duck, AnimalType.Fox, AnimalType.Koala, AnimalType.Lizard, AnimalType.Panda]
    const randomIndex = Math.ceil((Math.random()*10)% animalTypes.length -1)
    return animalTypes[randomIndex]
}

onBeforeMount(()=> {
    randomAnimalTypes.value = []
    for (let i = 0; i < VIDEO_NO; i++)
        randomAnimalTypes.value.push(calculateRandomAnimalType())
})

</script>
<template>
  <div 
    v-if="randomAnimalTypes"
    class="p-5 animate-in fade-in zoom-in duration-500">
    <h2 class="text-text font-black text-6xl text-center my-5">Videos</h2>
    <div class="flex justify-center flex-wrap ">
        <VideoCard 
            v-for="atype in randomAnimalTypes" 
            :key="atype"
            :animal="atype"
        />
    </div>
    <div class="flex justify-center my-5">
        <button 
            @click="goToVideoWall"
            class="shadow text-text font-black text-xl rounded-3xl bg-lgreen py-2 px-5 hover:-translate-y-1 hover:scale-105 duration-300"> 
            Go to the Video Wall 📺
        </button>
    </div>
  </div>
</template>
