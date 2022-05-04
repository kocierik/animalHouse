<script setup lang="ts">
import * as router from '@/router/index';
import Card from './gamesComponents/Card.vue';

// in <script setup>

const gameList = [
  {
    id: 0,
    name: 'Memory',
    url: router.GameMemory,
  },
  {
    id: 1,
    name: 'Quiz',
    url: router.GameQuiz,
  },
  {
    id: 2,
    name: 'HangMan',
    url: router.GameHangMan,
  },
  {
    id: 3,
    name: '2048',
    url: router.GameDue,
  },
  {
    id: 4,
    name: 'Spot the difference',
    url: router.GameSpot,
  },
  {
    id: 5,
    name: 'Test prova',
    url: router.GameSpot,
  },
];
</script>

<template>
  <div class="flex justify-center flex-wrap p-10 gap-10">
    <div v-for="game in gameList" :key="gameList.id">
      <Card :name="game.name" :url="game.url" />
    </div>
  </div>
</template>

<style></style>
