<script setup lang="ts">
import './memory.css';

import { ref } from 'vue';
import type { Card } from './utility/cards';
import cards from './utility/cards';

const defaultCard: Card = { firstName: ' ', id: 0, view: 'visible', bg: '', selected: false };

let selectOne: Card = defaultCard;
let selectTwo: Card = defaultCard;
let result: Card[];
const checkCard = (card: Card): void => {
  console.log(card.id);
  // card.view == 'visible' ? (card.view = 'hidden') : (card.view = 'visible');
  if (selectOne == defaultCard) {
    card.selected = true;
    selectOne = card;
  } else if (selectTwo == defaultCard) {
    card.selected = true;
    selectTwo = card;
  }
  result = cards.value.filter((x) => x.selected == true);
  if (result.length > 1) {
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
    cards.value.map((x) => (x.selected = false));
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
        <div class="card" v-for="card in cards" :key="card.id" :style="{ visibility: card.view }">
          <div class="value" @click="checkCard(card)">{{ card.firstName }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@import './memory.css';
</style>
