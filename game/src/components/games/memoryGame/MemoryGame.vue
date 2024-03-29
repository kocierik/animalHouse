<script setup lang="ts">
import swal from 'sweetalert'
import { ref, onBeforeMount } from 'vue'
import { Helpers, GameConstant, ApiRepository, JsonGames, AnimalType, getAnimalPicture } from 'shared'
import { assert } from '@vue/compiler-core'

interface MemoryCard {
  id: number
  image: string
  selected: boolean
  guessed: boolean
}

const animalTypes = [
  AnimalType.Cat,
  AnimalType.Bunny,
  AnimalType.Panda,
  AnimalType.Dog,
  AnimalType.Lizard,
  AnimalType.Koala
]
const cards = ref<MemoryCard[]>([])
const moves = ref<number>(0)

const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds))

const findIndex = (id: number): number => cards.value.findIndex((c) => c.id === id)

const generateCards = async () => {
  moves.value = 0
  cards.value = []
  let id = 0
  for (const type of animalTypes) {
    const pic = await getAnimalPicture(type)
    cards.value.push({ id: id, image: pic, selected: false, guessed: false })
    cards.value.push({ id: id + 1, image: pic, selected: false, guessed: false })
    id += 2
  }
  cards.value.sort(() => Math.random() - 0.5)
}

const getOtherSelected = (current: number) => {
  const ids = cards.value.filter((x) => x.selected && x.id !== current).map((x) => x.id)
  assert(ids.length <= 1)
  return ids.length === 1 ? ids[0] : -1
}

const areTweens = (id1: number, id2: number) => Math.trunc(id1 / 2) === Math.trunc(id2 / 2)

const onCardSelected = async (id: number) => {
  // Check if the card could be clicked
  if (cards.value[findIndex(id)].selected || cards.value[findIndex(id)].guessed) return

  moves.value++
  // Make it visible
  cards.value[findIndex(id)].selected = true

  const other = getOtherSelected(id)

  if (other === -1) {
    // Make the user chose another card
    return
  }

  if (areTweens(id, other)) {
    // Mark as guessed
    cards.value[findIndex(id)].guessed = true
    cards.value[findIndex(other)].guessed = true

    if (hasWon()) {
      await showWinMessage()
    } else {
      // Continue the game
      cards.value[findIndex(id)].selected = false
      cards.value[findIndex(other)].selected = false
    }
  } else {
    // Hide them both
    await sleep(1000)
    cards.value[findIndex(id)].selected = false
    cards.value[findIndex(other)].selected = false
  }
}

const hasWon = () => cards.value.filter((x) => !x.guessed).length === 0

const showWinMessage = async () => {
  if (Helpers.isLogged()) {
    const willSave = await swal({
      title: 'Good job!',
      text: `You found all the couples in ${moves.value} tries! Do you want save your record?`,
      icon: 'success',
      // @ts-ignore
      buttons: true,
      dangerMode: false
    })
    if (willSave) {
      let totalScore: JsonGames.IGameResult = {
        gameId: GameConstant.MEMORYGAME,
        score: moves.value
      }
      const userId = Helpers.getUserId()
      if (!userId) return
      let response = await ApiRepository.putUserScore(totalScore, userId)
      if (response.esit) swal('Poof! Your record is saved!', { icon: 'success' })
      else swal('Ups, something wrong appened :/\nTry again later!', { icon: 'error' })
    }
  } else {
    swal({
      title: 'Good job!',
      text: `You found all the couples in ${moves.value} tries!`,
      icon: 'warning',
      dangerMode: false
    })
  }
}

onBeforeMount(async () => {
  await generateCards()
})
</script>

<template>
  <section class="main animate-in fade-in zoom-in duration-500">
    <div class="flex flex-col items-center p-10">
      <h1
        class="bg-stone-100 px-4 py-2 text-black font-bold text-4xl rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)]"
        >Memory Game</h1
      >
      <h2 class="mt-3 text-black text-xl font-bold">Moves: {{ moves }}</h2>
    </div>
    <div class="w-full p-4 flex">
      <div class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="rouned shadow overflow-hidden object-cover aspect-square"
          :style="{ width: 100, height: 100 }"
          v-for="card in cards"
          tabindex="0"
          @click="onCardSelected(card.id)"
          :key="card.id"
        >
          <!-- Hidden -->
          <img  :alt="card.id.toString()"  v-show="!card.guessed && !card.selected" src="/memory.webp" class="w-full h-full object-cover" />
          <!-- Revealed -->
          <img :alt="card.id.toString()"  v-show="card.guessed || card.selected" class="w-full h-full object-cover"  :src="card.image">
        </div>
      </div></div>
      <button class="py-3 px-5 m-5 font-black bg-lyellow rounded-full" @click="generateCards">RESTART</button>
  </section>
</template>

<style lang="css">
.main {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  flex-direction: column;
}
.game {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.value {
  display: flex;
  flex: 1 1 auto;
  max-height: 300px;
  max-width: 300px;
  background-color: whitesmoke;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

@media screen and (max-width: 400px) {
  img {
    max-height: 100px;
  }
}
</style>
