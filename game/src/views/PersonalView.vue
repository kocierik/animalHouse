<script setup lang="ts">
import ViewTitle from '@/components/common/ViewTitle.vue'
import FactCard from '@/components/personal/FactCard.vue'
import ImageCard from '@/components/personal/ImageCard.vue'
import MusicCard from '@/components/personal/MusicCard.vue'
import AddImageCard from '@/components/personal/AddImageCard.vue'
import * as router from '@/router/index'
import * as lsh from '@/helpers/localStoreHelper'
import type { AnimalType } from 'shared'
import { ref } from 'vue'
import Video from '../components/personal/VideoCard.vue'

const animals = ref<AnimalType[]>()
const a = localStorage.getItem(lsh.PersonalAnimals)
if (a === null) window.location.href = router.PersonalizeRoute
else {
  animals.value = JSON.parse(a)
}
</script>

<template>
  <main>
    <ViewTitle
      :title="'Personal'"
      :background="'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true'"
    />
    <div class="masonry sm:masonry-sm md:masonry-md flex flex-col justify-center">
      <FactCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-10 break-inside flex justify-center" />
      <ImageCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-10 break-inside flex justify-center" />
      <MusicCard v-for="a in animals" :animal="a" v-bind:key="a" class="m-10 break-inside flex flex-1 justify-center" />
      <AddImageCard class="flex self-center" />
      <Video v-for="a in animals" :animal="a" v-bind:key="a" class="m-10 break-inside flex justify-center" />
    </div>
  </main>
</template>
