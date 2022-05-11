<script setup lang="ts">
import './memory.css'
import { defaultCard } from './utility/cards'

import type { Card } from './utility/cards'
import cards from './utility/cards'
import swal from 'sweetalert'
let selectOne: Card = defaultCard
let selectTwo: Card = defaultCard
let result: Card[]

const resetValue = (): void => {
  cards.value.map((x) => {
    x.selected = false
    x.opacity = 1
    x.bg = defaultCard.bg
  })
  selectOne = defaultCard
  selectTwo = defaultCard
  result = []
}

const findIt = (x: Card): void => {
  x.view = 'hidden'
  x.selected = false
}

const resume = (): void => {
  cards.value.map((x) => {
    x.selected = false
    x.opacity = 1
    x.bg = defaultCard.bg
    x.view = 'visible'
  })
  cards.value = cards.value.sort(() => Math.random() - 0.5)
}

const checkCard = (card: Card): void => {
  console.log(card.id)
  if (selectOne == defaultCard) {
    card.selected = true
    card.bg = card.bgOut
    selectOne = card
  } else if (selectTwo == defaultCard) {
    card.bg = card.bgOut

    card.selected = true
    selectTwo = card
  }
  result = cards.value.filter((x) => x.selected == true)
  if (selectOne == selectTwo) {
    card.opacity = 1
    selectOne = defaultCard
    card.bg = defaultCard.bg
    result[0].selected = false
    selectTwo = defaultCard
    result = []
  }
  if (result.length > 1) {
    if (result[0].firstName == result[1].firstName) {
      cards.value.filter((x) => {
        if (result[0] == x || result[1] == x) {
          x.view = 'hidden'
          x.selected = false
        }
      })
      if (cards.value.filter((x) => x.view == 'hidden').length == cards.value.length) {
        swal('Good job!', 'You found all the couples!', 'success')
        resume()
      }
    }
    setTimeout(resetValue, 1000)
  }
}
</script>

<template>
  <section class="main">
    <div class="flex p-10">
      <a
        class="bg-stone-100 px-4 py-2 text-black font-bold text-4xl rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)]"
        >Memory Game</a
      >
    </div>
    <div class="game">
      <div id="memory">
        <div
          class="card"
          v-for="card in cards"
          :key="card.id"
          :style="{ visibility: card.view, opacity: card.opacity }"
        >
          <div class="value" @click="checkCard(card)">
            <img v-bind:src="card.bg" class="bg-cover" :style="{ maxWidth: 100, height: 290, backgroundSize: 300 }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@import './memory.css';
</style>
