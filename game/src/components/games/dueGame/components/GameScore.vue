<template>
  <div class="flex mb-4">
    <div
      class="bg-zinc-700 px-4 mr-5 py-2 text-white font-bold text-4xl rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)]"
    >
      2048
    </div>
    <div
      class="flex justify-center justify-evenly flex-col ml-auto mr-4 relative bg-zinc-700 px-3 py-1 text-white rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)] text-center"
    >
      <div class="text-xs font-bold uppercase">Score</div>

      <div class="font-bold">{{ state.currentGame.score }}</div>
      <template v-for="s in animate" :key="`s-${s.id}`">
        <transition name="score" appear>
          <span
            class="absolute opacity-0 text-3xl right-4 bottom-0 z-20 text-emerald-500 font-bold whitespace-nowrap"
            :innerText="`+  ${s.v}`"
          ></span>
        </transition>
      </template>
    </div>

    <div
      class="flex justify-center justify-evenly flex-col bg-zinc-700 px-3 py-1 text-white rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)] text-center"
    >
      <div class="text-xs font-bold uppercase">Best Score</div>
      <div class="font-bold">{{ state.bestScores[state.size] || 0 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { state } from '../store'

const animate = ref<{id: number, v: number}[]>([])

let uid = 0

watch(
  () => state.currentGame.score,
  (score, prevScore) => {
    const update = score - prevScore
    if (update > 0) {
      if (animate.value.length > 10) {
        animate.value.shift()
      }
      animate.value.push({ id: ++uid, v: update })
    }
  }
)
</script>
