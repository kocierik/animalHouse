<script setup lang="ts">
import * as router from '@/router/index'
import { createToaster } from  "@meforma/vue-toaster"
import { Helpers } from 'shared'
const toaster = createToaster({
  /* options */
})
if (!Helpers.isLogged())
  toaster.show('Hey! You should register to save your scores!', {
    type: 'success',
    position: 'top',
    queue: false,
    duration: 3000,
    max: 1,
  })

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
      'https://www.creativefabrica.com/wp-content/uploads/2020/01/05/wave-colorful-background-Graphics-1-1-580x387.jpg',
  },
  {
    id: 2,
    name: 'HangMan',
    url: router.GameHangMan,
    bgImage: 'https://i.pinimg.com/600x315/58/40/4c/58404cb23b6a60cea480ed7576553b9a.jpg',
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
  <div class="animate-in fade-in zoom-in duration-500 flex flex-1 flex-col">
    <div class="flex justify-center align-center lg:h-screen flex-wrap p-10 gap-10">
      <div
        v-for="game in gameList"
        :key="game.id"
        class="hover:-translate-y-1 hover:scale-105 duration-300 self-center pb-5"
      >
        <Card :name="game.name" :url="game.url" :image="game.bgImage" />
      </div>
    </div>
  </div>
</template>
