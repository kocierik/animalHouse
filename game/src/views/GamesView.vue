<script setup lang="ts">
// FIXME: @Erik questo plugin non ha supporto per ts. Prova ad usare questo che
// dovrebbe anche essere meglio: https://github.com/ankurk91/vue-toast-notification
// Dopo ricorda di cancellare anche il commento ts-ignore qua sotto.
//@ts-ignore
import { createToaster } from '@meforma/vue-toaster'
import { Helpers } from 'shared'
import GameCard from '../components/games/GameCard.vue'
import { gameList } from '@/oth/games'

const toaster = createToaster({
  /* options */
})

if (!Helpers.isLogged())
  toaster.show('Hey! You should register to save your scores!', {
    type: 'success',
    position: 'top',
    queue: false,
    duration: 3000,
    max: 1
  })
</script>

<template>
  <div class="animate-in fade-in zoom-in duration-500 flex flex-1 flex-col">
    <div class="flex justify-center align-center lg:h-screen flex-wrap p-10 gap-10">
      <div
        v-for="game in gameList"
        :key="game.id"
        class="hover:-translate-y-1 hover:scale-105 duration-300 self-center pb-5"
      >
        <GameCard :name="game.name" :url="game.url" :image="game.bgImage" />
      </div>
    </div>
  </div>
</template>
