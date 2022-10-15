<template>
  <div class="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div class="text-yellow-400 font-bold text-5xl mb-8" ref="confetti">YOU WIN</div>
    <div class="w-full flex justify-center">
      <button
        type="button"
        @click="state.showPopupWin = false"
        class="bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 py-2 text-white rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.15)] text-xl"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { state } from '../store'
import party from 'party-js'

const confetti = ref(null)
let partyjsTimer: any = null

onMounted(() => {
  partyjsTimer = setInterval(() => {
    party.confetti(confetti.value!, {
      count: party.variation.range(20, 50),
    })
  }, 750)
})

onBeforeUnmount(() => clearInterval(partyjsTimer))
</script>
