<template>
  <div id="gameHang" class="animate-in fade-in zoom-in duration-500">
    <div class="flex justify-center p-4">Guess the {{ currentWord.length }}-letter word</div>
    <div class="flex">
      <!-- A circular progress indicator -->
      <div class="progress-circle pr-5 flex justify-start">
        <div class="flex pc-overlay">{{ progressPercent }}%</div>
        <div
          class="flex pc-background"
          :style="{
            background: `conic-gradient(#ec826f ${degrees}deg, #ddd ${degrees}deg)`
          }"
        ></div>
      </div>

      <!-- The number of times the player has guessed -->
      <div class="tries-count pl-5 flex">{{ tries }} tries</div>
    </div>
    <!-- Displaying the guessed letters -->
    <div class="flex justify-center p-10 flex-wrap">
      <!-- Always remember to provide a key with v-for, 
        so that vue knows exactly what render to do, 
        and what to avoid -->
        <label class="hidden" for="letter">letter</label>
      <input
        readonly
        class="word-display"
        v-for="(l, i) in currentWord.split('')"
        id="letter"
        :key="i"
        :value="getGuessedLetter(i)"
      />
    </div>

    <!-- The alphabet buttons -->
    <div class="button-container flex flex-wrap justify-center">
      <div
        class="button-disabling-overlay"
        :style="{
          pointerEvents: puzzleSolved ? 'all' : 'none',
          background: puzzleSolved ? '#fff7' : '#0000'
        }"
      ></div>
      <button
        :class="getLetterButtonClass(l)"
        v-for="l in alphabets"
        :key="l"
        :title="currentGuess.includes(l) ? `${l} already picked` : `Pick ${l}`"
        :style="{ cursor: currentGuess.includes(l) ? 'default' : 'pointer' }"
        @click="makeGuess(l)"
      >
        {{ l }}
      </button>
    </div>
    <div>{{ message }}</div>
    <div class="flex justify-center p-10"><button id="new_game" @click="loadGame">New Game</button></div>
  </div>
</template>

<script>
import Constants from './Constants'
import swal from 'sweetalert'
import { Helpers, Api, GameConstant, ApiRepository } from 'shared'
export default {
  name: 'WordGame',
  data() {
    return {
      currentWord: '',
      currentGuess: [],
      tries: 0,
      progress: 0,
      message: ''
    }
  },
  mounted() {
    this.loadGame()
  },
  computed: {
    words() {
      return this.currentWord.split(',')
    },
    alphabets() {
      return Constants.ALPHABETS.split('')
    },
    progressPercent() {
      return Math.round((this.progress / this.currentWord.length) * 100)
    },
    degrees() {
      return Math.round((this.progress / this.currentWord.length) * 360)
    },
    puzzleSolved() {
      return this.progress === this.currentWord.length
    }
  },
  methods: {
    reset() {
      this.currentWord = ''
      this.currentGuess = []
      this.tries = 0
      this.progress = 0
      this.message = ''
    },
    async loadGame() {
      this.reset()
      let resp = await Api.get('https://random-word-form.herokuapp.com/random/animal')
      this.currentWord = resp.data[0].toUpperCase()
    },
    getGuessedLetter(index) {
      if (this.currentGuess.includes(this.currentWord[index])) {
        return this.currentWord[index]
      }
      return ''
    },
    getLetterButtonClass(letter) {
      if (this.currentGuess.includes(letter)) return 'letter-button-disabled'
      return 'letter-button'
    },
    makeGuess(letter) {
      if (this.currentGuess.includes(letter)) return
      this.currentGuess.push(letter)
      this.tries++
      // this.currentWord.split("") -> converts the string to an array
      // then the array is filtered upon which of its elements matches the letter
      // the length of the filtered array is how many characters were guessed correctly
      this.progress += this.currentWord.split('').filter((e) => e === letter).length
      if (this.puzzleSolved) {
        // solved
        let point = this.tries
        if (Helpers.isLogged()) {
          swal({
            title: 'Good job!',
            text: `You found the word ${this.currentWord} in ${this.tries} tries! Do you want save your record?`,
            icon: 'warning',
            buttons: true,
            dangerMode: false
          }).then(async (willSave) => {
            console.log(point)
            if (willSave) {
              let totalScore = {
                gameId: GameConstant.HANGMAN,
                score: point
              }
              let response = await ApiRepository.putUserScore(totalScore, Helpers.getUserId())
              console.log(response)
              swal('Poof! Your record is saved!', {
                icon: 'success'
              })
            } else {
              swal('Your record is NOT saved!')
            }
          })
        } else {
          swal({
            title: 'Good job!',
            text: `You found the word ${this.currentWord} in ${this.tries} tries!`,
            icon: 'warning',
            dangerMode: false
          })
        }
        this.loadGame()
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oxyden+Mono&family=Roboto+Slab:wght@400&display=swap');

#gameHang {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1,
h2,
h3 {
  font-weight: 200;
  color: darkcyan;
}
h3 {
  color: #39aaaa;
}
.word-display {
  font-family: 'Oxyden Mono', monospace;
  color: #ec826f;
  height: 2rem;
  max-width: 2rem;

  text-align: center;
  border: 0;
  border-bottom: 2px solid #8aa1a0;
  margin: 0px 0.3vmax;
  font-size: 22px;
  outline: none;
  background-color: transparent;
}
.button-container {
  max-width: 30rem;
}
.button-disabling-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.18s;
}
.letter-button,
.letter-button-disabled {
  display: inline-block;
  text-align: center;

  border: 0;
  background: #0490b3;
  box-shadow: 1px 1px 3px #1116;
  color: #fff;
  margin: 0.5vw;
  padding: 10px;
  font-size: 20px;
  transition: all 0.25s;
}
.letter-button:hover {
  background: #29b9b9;
  transform: scale(1.2);
  box-shadow: 2px 2px 4px #1114;
}
.letter-button-disabled {
  background: #c0c2c188;
  color: #9995;
}
.tries-count {
  display: flex;
  flex: 0 1 100%;
  border: 50px;
  color: #ec826f;
  padding: 10px;
  border-radius: 50px;
  font-size: 14px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.progress-circle {
  display: flex;
  flex: 0 1 30%;
  justify-content: center;
}
.pc-background {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #ddd;
  margin-bottom: 20px;
}
.pc-overlay {
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 14px;
  background: #fff;
  position: absolute;
  margin-top: 8px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#new_game {
  display: flex;
  justify-content: center;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 3px #1112;
  background: #fff;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
#new_game:hover {
  color: #208f8f;
  transform: scale(1.1);
}
#credits {
  font-size: 0.7rem;
  margin-top: 36px;
}
#credits div {
  margin: 0;
}
#credits a {
  color: darkcyan;
}
@media screen and (max-width: 1200px) {
  #app {
    width: 75vw;
  }
}
</style>
