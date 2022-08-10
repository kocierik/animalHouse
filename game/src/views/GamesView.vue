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
    bgImage:
      'https://static.vecteezy.com/ti/vettori-gratis/p1/4676383-colore-onde-sfondo-fluid-flow-ink-splash-abstract-flow-vibrant-color-trendy-poster-colorato-gradient-ink-in-water-3d-wave-liquid-shape-flow-wave-gratuito-vettoriale.jpg',
  },
  {
    id: 1,
    name: 'Quiz',
    url: router.GameQuiz,
    bgImage:
      'https://static.vecteezy.com/system/resources/previews/002/056/882/non_2x/colorful-waves-background-free-vector.jpg',
  },
  {
    id: 2,
    name: 'HangMan',
    url: router.GameHangMan,
    bgImage: 'https://static.vecteezy.com/ti/vettori-gratis/p1/1907561-sfondo-onde-colorate-gratuito-vettoriale.jpg',
  },
  {
    id: 3,
    name: '2048',
    url: router.GameDue,
    bgImage:
      'https://png.pngtree.com/thumb_back/fh260/background/20200719/pngtree-gradient-colorful-abstract-design-image_360031.jpg',
  },
  {
    id: 4,
    name: 'Minesweeper',
    url: router.GameMinesweeper,
    bgImage: 'https://i.pinimg.com/originals/ca/6b/0f/ca6b0f7177229f00b2ec1ea2f48385fd.jpg',
  },
  {
    id: 5,
    name: 'Tic Tac Toe',
    url: router.GameTicTacToe,
    bgImage: 'https://c.neh.tw/thumb/f/720/5fc1c59b4fd94ddd8128.jpg',
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
