<script setup lang="ts">
import * as router from '@/router/index'
import Card from './gamesComponents/Card.vue'
import Footer from '../components/common/Footer.vue'

interface Game {
  id: number
  name: string
  url: string
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
    name: 'Minesweeper',
    url: router.GameMinesweeper,
  },
  {
    id: 5,
    name: 'Tic Tac Toe',
    url: router.GameTicTacToe,
  },
]
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex justify-center align-center h-full flex-wrap p-10 gap-10">
      <div v-for="game in gameList" :key="game.id" class="self-center pb-5">
        <Card :name="game.name" :url="game.url" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style></style>
