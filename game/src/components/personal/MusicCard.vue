<template>
  <a
    style="flex-flow: wrap"
    class="flex flex-col self-center align-center max-w-sm bg-llime rounded-lg border border-gray-200 shadow-md p-6"
  >
    <div style="text-align-last: center" class="flex justify-start space-x-3">
      <AnimalIcon class="mb-2 text-2xl font-bold tracking-tight" :animal="props.animal" />
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Our playlist</h5>
    </div>
    <iframe
      class="m-5"
      style="border-radius: 12px"
      src="https://open.spotify.com/embed/playlist/4eTs4UxnzkuIeVVMdBxaKC?utm_source=generator"
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  </a>
</template>

<script lang="ts" setup>
import type { AnimalType } from 'shared'

const props = defineProps<{ animal: AnimalType }>()
</script>
