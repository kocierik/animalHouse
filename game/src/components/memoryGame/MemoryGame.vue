<script setup lang="ts">
import './memory.css';

import { ref } from 'vue';
import type { Card } from './utility/cards';
import cards from './utility/cards';

const defaultCard: Card = { firstName: ' ', id: 0, view: 'visible', bg: '', selected: false, opacity: 1 };

let selectOne: Card = defaultCard;
let selectTwo: Card = defaultCard;
let result: Card[];
const checkCard = (card: Card): void => {
  console.log(card.id);
  if (selectOne == defaultCard) {
    card.selected = true;
    selectOne = card;
    card.opacity = 0.5;
  } else if (selectTwo == defaultCard) {
    card.selected = true;
    selectTwo = card;
  }
  result = cards.value.filter((x) => x.selected == true);
  if (selectOne == selectTwo) {
    card.opacity = 1;
    selectOne = defaultCard;
    result[0].selected = false;
    selectTwo = defaultCard;
    result = [];
  }
  if (result.length > 1) {
    console.log(result);
    if (result[0].id == result[1].id) {
      console.log('UGOALI');
      result[0].opacity = 1;
      result[0].selected = false;
      selectOne = defaultCard;
      selectTwo = defaultCard;
      result = [];
      return;
    }
    if (result[0].firstName == result[1].firstName) {
      cards.value.filter((x) => {
        if (result[0] == x || result[1] == x) {
          x.view = 'hidden';
          x.selected = false;
        }
      });
    } else {
      console.log(result.map((x) => console.log(x)));
      console.log('NO');
    }
    cards.value.map((x) => {
      x.selected = false;
      x.opacity = 1;
    });
    selectOne = defaultCard;
    selectTwo = defaultCard;
    result = [];
  }
};
</script>

<template>
  <section class="main">
    <div class="game">
      <div id="memory">
        <div
          class="card"
          v-for="card in cards"
          :key="card.id"
          :style="{ visibility: card.view, opacity: card.opacity }"
        >
          <div class="value" @click="checkCard(card)">{{ card.firstName }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@import './memory.css';
</style>
