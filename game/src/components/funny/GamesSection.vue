<script setup lang="ts">
import GameCard from '../games/GameCard.vue'
import { gameList } from '@/oth/games'
import * as router from '@/router/index'
import { Helpers } from 'shared'

const GAME_NO = 3
const games = gameList.filter((_, index) => index < GAME_NO)

const goToMoreGames = () => router.redirect(router.FunnyGamesRoute)
</script>

<template>
  <div class="animate-in fade-in zoom-in duration-500">
    <h1 class="font-black text-6xl text-center text-text">Games</h1>
    <div class="flex justify-center align-center flex-wrap p-4">
      <div
        v-for="game in games"
        :key="game.id"
        class="hover:-translate-y-1 hover:scale-105 duration-300 self-center m-3"
      >
        <GameCard :name="game.name" :url="game.url" :image="game.bgImage" />
      </div>
    </div>
    <div class="flex justify-center my-4">
      <button
        @click="goToMoreGames"
        class="shadow text-text font-black text-xl rounded-3xl bg-lgreen py-2 px-5 hover:-translate-y-1 hover:scale-105 duration-300"
      >
        More games
      </button>
    </div>
  </div>
</template>
