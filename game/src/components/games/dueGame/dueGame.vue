<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GameScoreVue from './components/GameScore.vue'
import GameControlsVue from './components/GameControls.vue'
import PopupTransitionVue from './components/PopupTransition.vue'
import PopupSelectGridSizeVue from './components/PopupSelectGridSize.vue'
import PopupGameoverVue from './components/PopupGameover.vue'
import PopupWinVue from './components/PopupWin.vue'
import { state, canMove } from './store'
import { hasGame, newGame, move } from './game'
import { keysMap } from './utils'
import './style.css'
const gameBoardElement = ref(null)
const setBoardWidth = () => {
  state.boardWidth = gameBoardElement.value.clientWidth
}
const onKeyDown = (e: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  altKey: any
  ctrlKey: any
  metaKey: any
  shiftKey: any
  which: string | number
  preventDefault: () => void
}) => {
  if (!canMove.value) {
    return false
  }
  const modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
  const mapped = keysMap[e.which]
  if (!modifiers && mapped !== undefined) {
    e.preventDefault()
    move(mapped)
  }
}
const touchStartPos = { x: null, y: null, started: false }
const onTouchStart = (e: { touches: { clientY: null }[]; preventDefault: () => void }) => {
  touchStartPos.x = e.touches[0].clientX
  touchStartPos.y = e.touches[0].clientY
  touchStartPos.started = true
  e.preventDefault()
}
const onTouchMove = (e: { preventDefault: () => void; changedTouches: { clientY: number }[] }) => {
  if (!touchStartPos.started) {
    return
  }
  e.preventDefault()
  var dx = e.changedTouches[0].clientX - touchStartPos.x
  var absDx = Math.abs(dx)
  var dy = e.changedTouches[0].clientY - touchStartPos.y
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
</script>

<template>
  <div class="">
    <div class="max-w-[500px] p-10">
      <div class="flex py-3">
        <div
          class="bg-zinc-700 px-4 py-2 text-white font-bold text-4xl rounded-lg shadow-[inset_0_3px_0_rgba(255,255,255,.25)]"
        >
          2048
        </div>
      </div>

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
