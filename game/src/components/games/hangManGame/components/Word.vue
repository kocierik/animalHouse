<script lang="ts">
export default {
  props: {
    letters: { type: Array, required: true },
    correctLetters: { type: Array, default: () => [] },
  },
}
</script>
<template>
  <div class="word">
    <span class="letter" v-for="(letter, i) in letters" :key="i" @focus="show">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>
