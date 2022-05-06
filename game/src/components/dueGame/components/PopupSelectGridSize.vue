<template>
  <div class="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div class="text-white font-bold text-3xl mb-8">Select grid size:</div>
    <div class="w-full flex justify-evenly">
      <button
        type="button"
        v-for="size in gridSizes"
        :key="size"
        @click="onSelectGridSize(size)"
        class="bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 py-2 text-white rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.15)] text-xl"
      >
        {{ `${size}x${size}` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { state, setGameGridSize } from '../store'
import { hasGame, newGame } from '../game'

const gridSizes = [3, 4, 5]

const onSelectGridSize = (size: number) => {
  setGameGridSize(size)
  state.showPopupGridSize = false

  if (!hasGame()) {
    newGame()
  }
}
</script>
