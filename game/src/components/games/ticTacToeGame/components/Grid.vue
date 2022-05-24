<template>
  <div class="flex justify-center flex-col justify-items-center p-5 h-full">
    <h1>Tic Tac Toe</h1>
    <div class="flex flex-col justify-center items-center p-10">
      <div v-if="winner" class="flex"></div>
      <div v-else class="flex p-5">
        <h2>Turn: {{ turn }}</h2>
      </div>
      <div class="flex" v-for="(n, i) in 3" :key="i">
        <div v-for="(n, j) in 3" :key="j">
          <cell :placement="[i, j]" :label="gameGrid[i][j]" @place="setPlace" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './board'
import Cell from './Cell.vue'
import { reactive, ref, computed } from 'vue'
import swal from 'sweetalert'
export default {
  components: {
    Cell,
  },
  setup() {
    const gameGrid = reactive([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
    const board = reactive(new Board(gameGrid))
    const lastWasX = ref(false)
    const setPlace = (e) => {
      if (!board.isGameOver() && gameGrid[e[0]][e[1]] === '') {
        lastWasX.value ? (gameGrid[e[0]][e[1]] = 'O') : (gameGrid[e[0]][e[1]] = 'X')
        lastWasX.value = !lastWasX.value
      }
    }
    const reset = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          gameGrid[i][j] = ''
        }
      }
    }
    const winner = computed(() => {
      if (board.isGameOver()) {
        if (board.has3InARow('X')) {
          swal('Good job!', 'Player X has won!', 'success')
          reset()
          return 'X'
        }
        if (board.has3InARow('O')) {
          swal('Good job!', 'Player O has won!', 'success')
          reset()
          return 'O'
        } else {
          swal('Ops!', 'Its a tie!', 'warning')
          reset()
          return 'Draw'
        }
      } else {
        return false
      }
    })
    const turn = computed(() => {
      return lastWasX.value ? 'O' : 'X'
    })
    return {
      gameGrid,
      winner,
      setPlace,
      turn,
      reset,
    }
  },
}
</script>

<style scoped>
.again {
  margin-top: 15px;
}
h1 {
  font-size: 3rem;
  text-align: center;
}
h2 {
  font-size: 2rem;
  text-align: center;
}
</style>
