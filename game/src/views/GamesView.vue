<script setup lang="ts">
import QuizGame from '../components/quizGame/QuizGame.vue';
import MemoryGame from '../components/memoryGame/MemoryGame.vue';
import * as router from '@/router/index';
</script>

<template>
  <main>
    <router-link :to="router.GameMemory">
      <a
        href="#"
        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
      >
        Home
      </a>
    </router-link>
  </main>
</template>
