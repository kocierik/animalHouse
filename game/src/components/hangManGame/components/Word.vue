<template>
  <div class="word">
    <span class="letter" v-for="(letter, i) in letters" :key="i">
      {{ correctLetters.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    letters: { type: Array, required: true },
    correctLetters: { type: Array, default: () => [] }
  }
}
</script>
