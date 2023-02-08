<template>
  <div class="flex">
    <button
      tabindex="0"
      @click="state.showPopupGridSize = !state.showPopupGridSize"
      :class="{
        'bg-emerald-500 hover:bg-emerald-600': state.showPopupGridSize
      }"
      class="ml-auto mr-3 px-3 py-2 select-none transition-colors rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.15)] bg-zinc-700 hover:bg-zinc-600 text-white"
    > 
    <span class="hidden"> grid size</span>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        ></path>
      </svg>
    </button>

    <button
      tabindex="0"
      class="px-3 py-2 select-none transition-colors rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.15)] bg-zinc-700 hover:bg-zinc-600 text-white focus:outline-none"
      @click="newGame"
    >
    <span class="hidden">new game</span>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { state } from '../store'
import { newGame } from '../game'
</script>
