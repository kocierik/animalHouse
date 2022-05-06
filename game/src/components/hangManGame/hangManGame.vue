<template>
  <div class="game-container flex-1">
    <Header />
    <Figure :wrong-count="wrongLetters.length" />
    <WrongLetters :wrong-letters="wrongLetters" />
    <Word :letters="letters" :correct-letters="correctLetters" />
    <Popup :status="status" :word="word" @reset="reset" />
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'

import './assets/style.css'

import Header from './components/Header.vue'
import Figure from './components/Figure.vue'
import WrongLetters from './components/WrongLetters.vue'
import Word from './components/Word.vue'
import Popup from './components/Popup.vue'

import onKeydown from './assets/onKeydown'

const words = ['programming']
const randomWord = () => words[Math.floor(Math.random() * words.length)]

export default {
  components: { Header, Figure, Word, WrongLetters, Popup },
  setup() {
    const word = ref(randomWord())
    const guessedLetters = ref([])

    const letters = computed(() => word.value.split(''))
    const wrongLetters = computed(() => guessedLetters.value.filter((l) => !letters.value.includes(l)))
    const correctLetters = computed(() => guessedLetters.value.filter((l) => letters.value.includes(l)))

    const status = computed(() => {
      if (wrongLetters.value.length === 6) return 'lose'
      if (letters.value.every((l) => correctLetters.value.includes(l))) return 'win'
      return ''
    })
    const reset = () => {
      guessedLetters.value = []
      word.value = randomWord()
    }

    const notification = ref(false)
    const showNotification = () => {
      notification.value = true
      setTimeout(() => (notification.value = false), 2000)
    }

    onKeydown((event) => {
      const letter = event.key.toLowerCase()
      if (event.keyCode < 65 || event.keyCode > 90) return
      if (status.value) return
      if (guessedLetters.value.includes(letter)) {
        showNotification()
        return
      }
      guessedLetters.value.push(letter)
    })

    return {
      letters,
      word,
      wrongLetters,
      correctLetters,
      guessedLetters,
      notification,
      status,
      reset,
    }
  },
}
</script>
