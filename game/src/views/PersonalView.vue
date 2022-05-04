<script setup lang="ts">
import ViewTitle from '@/components/common/ViewTitle.vue'
import FactCard from '@/components/personal/FactCard.vue'
import ImageCard from '@/components/personal/ImageCard.vue'
import MusicCard from '@/components/personal/MusicCard.vue'
</script>

<template>
  <main>
    <ViewTitle 
      :title="'Personal'" 
      :background="'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true'"/>
    <FactCard />
    <ImageCard />
    <MusicCard />
  </main>
</template>
