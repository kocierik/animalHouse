<script setup lang="ts">
import * as router from '@/router/index'
import Card from './gamesComponents/Card.vue'
import Footer from '../components/common/Footer.vue'

interface Game {
  id: number
  name: string
  url: string
  bgImage: string
}

const gameList: Game[] = [
  {
    id: 0,
    name: 'Memory',
    url: router.GameMemory,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
  {
    id: 1,
    name: 'Quiz',
    url: router.GameQuiz,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
  {
    id: 2,
    name: 'HangMan',
    url: router.GameHangMan,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
  {
    id: 3,
    name: '2048',
    url: router.GameDue,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
  {
    id: 4,
    name: 'Minesweeper',
    url: router.GameMinesweeper,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
  {
    id: 5,
    name: 'Tic Tac Toe',
    url: router.GameTicTacToe,
    bgImage: 'https://i.pinimg.com/736x/f9/d0/ea/f9d0eab4d516b2b04a97f3e5c3fa8c69.jpg',
  },
]
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex justify-center align-center lg:h-screen flex-wrap p-10 gap-10">
      <div v-for="game in gameList" :key="game.id" class="self-center pb-5">
        <Card :name="game.name" :url="game.url" :image="game.bgImage" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style></style>
