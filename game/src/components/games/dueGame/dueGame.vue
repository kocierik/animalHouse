<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PopupTransitionVue from './components/PopupTransition.vue'
import PopupGameoverVue from './components/PopupGameover.vue'
import { state, canMove } from './store'
import { hasGame, newGame, move } from './game'
import { keysMap } from './utils'
import './style.scss'
import swal from 'sweetalert'
import { GameConstant, ApiRepository, Helpers, JsonGames } from 'shared'

let score2048: number

const gameBoardElement = ref<any>(null)
const setBoardWidth = () => {
  state.boardWidth = gameBoardElement.value!.clientWidth
}
const onKeyDown = (e: KeyboardEvent) => {
  if (!canMove.value) {
    saveDbResult()
    return false
  }
  const modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
  const mapped: number = keysMap(e.which)
  if (!modifiers && mapped !== undefined) {
    e.preventDefault()
    move(mapped)
  }
}

interface TouchStartPos {
  x: number | null
  y: number | null
  started: boolean
}

const touchStartPos: TouchStartPos = { x: null, y: null, started: false }
const onTouchStart = (e: { touches: { clientY: number; clientX: number }[]; preventDefault: () => void }) => {
  touchStartPos.x = e.touches[0].clientX
  touchStartPos.y = e.touches[0].clientY
  touchStartPos.started = true
  e.preventDefault()
}
const onTouchMove = (e: { preventDefault: () => void; changedTouches: { clientY: number; clientX: number }[] }) => {
  if (!touchStartPos.started) {
    return
  }
  e.preventDefault()
  var dx = e.changedTouches[0].clientX - touchStartPos.x!
  var absDx = Math.abs(dx)
  var dy = e.changedTouches[0].clientY - touchStartPos.y!
  var absDy = Math.abs(dy)
  if (!canMove.value) {
    touchStartPos.started = false
    return false
  }
  if (Math.max(absDx, absDy) > 5) {
    // (right : left) : (down : up)
    move(absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0)
    touchStartPos.started = false
  }
}
const onTouchEnd = () => {
  touchStartPos.started = false
}
onMounted(() => {
  setBoardWidth()
  window.addEventListener('resize', setBoardWidth)
  document.addEventListener('keydown', onKeyDown)
  gameBoardElement.value.addEventListener('touchstart', onTouchStart, {
    passive: false,
  })
  gameBoardElement.value.addEventListener('touchmove', onTouchMove, {
    passive: false,
  })
  gameBoardElement.value.addEventListener('touchend', onTouchEnd, false)
  if (!hasGame()) {
    newGame()
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setBoardWidth)
  document.removeEventListener('keydown', onKeyDown)
  gameBoardElement.value.removeEventListener('touchstart', onTouchStart, {
    passive: false,
  })
  gameBoardElement.value.removeEventListener('touchmove', onTouchMove, {
    passive: false,
  })
  gameBoardElement.value.removeEventListener('keydown', onKeyDown)
})

const saveDbResult = () => {
  if (state.currentGame.isGameover) {
    if (Helpers.isLogged()) {
      swal({
        title: 'Good job!',
        text: `You have done ${state.currentGame.score} points! Do you want save your record?`,
        icon: 'warning',
        buttons: [true],
        dangerMode: false,
      }).then((willSave) => {
        if (willSave) {
          let totalScore: JsonGames.IGameResult = {
            gameId: GameConstant.DUE48,
            score: state.currentGame.score as number,
          }
          swal('Poof! Your record is saved!', {
            icon: 'success',
          }).then(async () => {
            let userId = Helpers.getUserId()
            if (!userId) return
            let response = await ApiRepository.putUserScore(totalScore, userId)
            console.log(response)
            document.location.reload()
          })
        } else {
          swal('Your record is NOT saved!').then(() => document.location.reload())
        }
      })
    } else {
      swal({
        title: 'Good job!',
        text: `You have done ${state.currentGame.score} points!`,
        icon: 'warning',
        dangerMode: false,
      }).then(() => document.location.reload())
    }
  }
}
</script>

<template>
  <div class="animate-in fade-in zoom-in duration-500 flex justify-center h-full items-center">
    <div class="max-w-[500px] p-10">
      <GameScoreVue />

      <div
        class="game-grid-wrap mb-4 relative overflow-hidden shadow-[inset_0_2px_0_rgba(255,255,255,.15)]"
        :style="{
          '--game-base-fontsize': `${state.boardWidth / (state.size * 2)}px`,
          '--game-grid-size': state.size,
        }"
      >
        <div ref="gameBoardElement" class="game-grid flex backgroundIm">
          <div class="game-cell" v-for="n in state.size * state.size" :key="n"></div>
          <div
            v-for="tile in state.currentGame.tiles"
            :key="tile.i"
            class="game-tile"
            :class="[`game-tile-${tile.v > 65536 ? 'super' : tile.v}`, { 'game-tile-merged': tile.m }]"
            :style="{ transform: `translate(${tile.x * 100}%,${tile.y * 100}%)` }"
          >
            <transition name="tile" appear> <div :innerText="tile.v"></div></transition>
          </div>
        </div>
        <PopupTransitionVue><PopupGameoverVue v-if="state.currentGame.isGameover" /></PopupTransitionVue
        ><PopupTransitionVue><PopupSelectGridSizeVue v-if="state.showPopupGridSize" /></PopupTransitionVue
        ><PopupTransitionVue> <PopupWinVue v-if="state.showPopupWin" /></PopupTransitionVue>
      </div>

      <GameControlsVue />
    </div>
  </div>
</template>
