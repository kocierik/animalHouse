<script lang="ts" setup>
import VideoCard from '@/components/personal/VideoCard.vue'
import { allVideos } from '@/network/models/VideoLink'

const videos = allVideos()
</script>
<template>
  <div class="flex-col items-center">
    <h1 class="m-3 text-text font-black text-center text-5xl">Video Wall</h1>
    <h2 class="text-text font-bold text-center text-2xl">
      Animal House's videos selection chosen especially for you 💕
    </h2>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <VideoCard v-for="video in videos" :key="video" :video-code="video" />
    </div>
  </div>
</template>
