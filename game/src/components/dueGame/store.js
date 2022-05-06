import { computed, reactive, ref, watch } from 'vue';
import { getItem, setItem } from './utils';

export const defaultGameState = () => ({
  tiles: [],
  score: 0,
  uid: 0,
  win: false,
  isGameover: false,
});

const size = getItem('game-size', 4);

export const state = reactive({
  size,
  bestScores: getItem('game-bestscores', {}, true),
  currentGame: getItem('game-state-' + size, defaultGameState(), true),
  boardWidth: 0,
  showPopupGridSize: false,
  showPopupWin: false,
});

export const setCurrentGame = (game) => {
  Object.assign(state.currentGame, game);
};

export const setGameGridSize = (size) => {
  state.size = size;
  setItem('game-size', size);
  setCurrentGame(getItem('game-state-' + size, defaultGameState(), true));
};

export const canMove = computed(() => {
  return (
    !state.currentGame.isGameover &&
    !state.showPopupGridSize &&
    !state.showPopupWin
  );
});

watch(
  () => state.currentGame.score,
  (score) => {
    if (score > (state.bestScores[state.size] || 0)) {
      state.bestScores[state.size] = score;
      setItem('game-bestscores', state.bestScores, true);
    }
  }
);
