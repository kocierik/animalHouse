<script setup lang="ts">
import CuriositySection from '@/components/funny/CuriositySection.vue'
import GamesSection from '@/components/funny/GamesSection.vue'
import VideoSection from '@/components/funny/VideoSection.vue'
</script>

<template>
  <div class="sm:p-3 xl:p-10">
    <div>
      <GamesSection class="mb-10" />
      <VideoSection class="my-10" />
      <CuriositySection class="my-10" />
    </div>
  </div>
</template>
