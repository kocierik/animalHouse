<script setup lang="ts">
import * as router from '@/router/index';
import Card from './gamesComponents/Card.vue';

interface Game {
  id: number;
  name: string;
  url: string;
}

const gameList: Game[] = [
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
    <div v-for="game in gameList" :key="game.id">
      <Card :name="game.name" :url="game.url" />
    </div>
  </div>
</template>

<style></style>
