<script setup lang="ts">
import './memory.css';
import type { Card } from './utility/cards';
import cards from './utility/cards';

const checkCard = (card: Card): void => {
  card.view = true;
};
</script>

<template>
  <section class="main">
    <div class="game">
      <div id="memory">
        <div class="card" v-for="card in cards" :key="card.id">
          <div class="value" @click="checkCard(card)">{{ card.firstName }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css">
@import './memory.css';
</style>
