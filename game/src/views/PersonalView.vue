<script setup lang="ts">
import ViewTitle from '@/components/common/ViewTitle.vue'
import FactCard from '@/components/personal/FactCard.vue'
import ImageCard from '@/components/personal/ImageCard.vue'
import MusicCard from '@/components/personal/MusicCard.vue'
import AddImageCard from '@/components/personal/AddImageCard.vue'
import * as router from "@/router/index"
import * as lsh from "@/helpers/localStoreHelper"
import { AnimalType} from 'shared'
import { ref } from 'vue'

const animals = ref<AnimalType[]>()
const a = localStorage.getItem(lsh.PersonalAnimals)
if(a === null)
  window.location.href = router.PersonalizeRoute
else {
  animals.value = JSON.parse(a);
}
</script>

<template>
  <main>
    <ViewTitle 
      :title="'Personal'" 
      :background="'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true'"/>
      <div class="md:flex md:flex-wrap">
        <FactCard  v-for="a in animals" :animal="a" class="m-10"/>
        <ImageCard v-for="a in animals" :animal="a" class="m-10"/>
        <MusicCard v-for="a in animals" :animal="a" class="m-10"/>
        <AddImageCard />
    </div>
  </main>
</template>
