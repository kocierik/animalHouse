<script setup lang="ts">
import './memory.css';
import { defaultCard } from './utility/cards';

import type { Card } from './utility/cards';
import cards from './utility/cards';
import swal from 'sweetalert';

let selectOne: Card = defaultCard;
let selectTwo: Card = defaultCard;
let result: Card[];

const resetValue = (): void => {
  cards.value.map((x) => {
    x.selected = false;
    x.opacity = 1;
    x.bg = defaultCard.bg;
  });
  selectOne = defaultCard;
  selectTwo = defaultCard;
  result = [];
};

const checkCard = (card: Card): void => {
  console.log(card.id);
  if (selectOne == defaultCard) {
    card.selected = true;
    card.bg =
      'https://media-assets.vanityfair.it/photos/614c461ca8e3915bdc20fc3c/4:3/w_1144,h_858,c_limit/Pesce-come-sceglierlo-P.jpg';
    selectOne = card;
    card.opacity = 0.5;
  } else if (selectTwo == defaultCard) {
    card.bg = 'https://www.zooplus.it/magazine/wp-content/uploads/2018/09/goldfisch-768x512.jpg';
    card.opacity = 0.5;

    card.selected = true;
    selectTwo = card;
  }
  result = cards.value.filter((x) => x.selected == true);
  if (selectOne == selectTwo) {
    card.opacity = 1;
    selectOne = defaultCard;
    card.bg = defaultCard.bg;
    result[0].selected = false;
    selectTwo = defaultCard;
    result = [];
  }
  if (result.length > 1) {
    if (result[0].firstName == result[1].firstName) {
      cards.value.filter((x) => {
        if (result[0] == x || result[1] == x) {
          x.view = 'hidden';
          x.selected = false;
        }
      });
      if (cards.value.filter((x) => x.view == 'hidden').length == cards.value.length) swal('You Win!');
    }
    setTimeout(resetValue, 1000);
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
          <div class="value" @click="checkCard(card)"><img v-bind:src="card.bg" /></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@import './memory.css';
</style>
