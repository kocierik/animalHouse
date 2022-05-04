import { nextTick } from 'vue';
import { defaultGameState, state, setCurrentGame } from './store';
import { setItem, vectorsMap } from './utils';

const _eachCell = (cb) => {
  for (var x = 0; x < state.size; x++) {
    for (var y = 0; y < state.size; y++) {
      cb(x, y);
    }
  }
};

const getAvailableCells = () => {
  const tiles = [];

  _eachCell((x, y) => {
    if (isCellAvailable({ x, y })) {
      tiles.push({ x, y });
    }
  });

  return tiles;
};

const getRandomAvailableCell = () => {
  var cells = getAvailableCells();

  return cells.length ? cells[Math.floor(Math.random() * cells.length)] : false;
};

const getTileIndex = (pos) =>
  state.currentGame.tiles.findIndex(
    (tile) => tile.x === pos.x && tile.y === pos.y && !tile.t
  );

const isCellAvailable = (pos) => getTileIndex(pos) === -1;

const isWithinBounds = (pos) =>
  pos.x >= 0 && pos.x < state.size && pos.y >= 0 && pos.y < state.size;

const isTileMatcheAvailable = () => {
  for (let index = 0; index < state.currentGame.tiles.length; index++) {
    const tile = state.currentGame.tiles[index];

    for (var direction = 0; direction < 4; direction++) {
      var vector = vectorsMap[direction];

      const index = getTileIndex({
        x: tile.x + vector.x,
        y: tile.y + vector.y,
      });

      if (index !== -1 && state.currentGame.tiles[index].v === tile.v) {
        return true;
      }
    }
  }

  return false;
};

const addRandomTiles = (n) => {
  for (var i = 0; i < n; i++) {
    const randomCell = getRandomAvailableCell();
    if (randomCell) {
      state.currentGame.tiles.push({
        ...randomCell,
        v: Math.random() < 0.9 ? 2 : 4,
        i: ++state.currentGame.uid,
      });
    }
  }
};

export const move = (direction) => {
  for (var index = state.currentGame.tiles.length - 1; index >= 0; --index) {
    if (state.currentGame.tiles[index].t) {
      state.currentGame.tiles.splice(index, 1);
    } else {
      state.currentGame.tiles[index].m = 0;
    }
  }

  const vector = vectorsMap[direction];

  let moved = false;

  _eachCell((x, y) => {
    if (vector.x === 1) x = state.size - 1 - x;
    if (vector.y === 1) y = state.size - 1 - y;

    const tileIndex = getTileIndex({ x, y });
    const tile = state.currentGame.tiles[tileIndex];

    if (tile) {
      let pos = { x: tile.x, y: tile.y };

      do {
        pos.x = pos.x + vector.x;
        pos.y = pos.y + vector.y;
      } while (isWithinBounds(pos) && isCellAvailable(pos));

      const previous = { x: pos.x - vector.x, y: pos.y - vector.y };

      const nextTileIndex = getTileIndex(pos);
      const nextTile = state.currentGame.tiles[nextTileIndex];

      if (nextTile && !nextTile.m && !nextTile.t && nextTile.v === tile.v) {
        const tileDest = state.currentGame.tiles[nextTileIndex];
        Object.assign(state.currentGame.tiles[tileIndex], {
          x: tileDest.x,
          y: tileDest.y,
          t: 1,
        });

        state.currentGame.tiles[nextTileIndex].t = true;
        const value = tileDest.v * 2;

        if (value === 2048 && !state.currentGame.win) {
          state.currentGame.win = true;
          state.showPopupWin = true;
        }

        state.currentGame.score += value;

        state.currentGame.tiles.push({
          x: tileDest.x,
          y: tileDest.y,
          v: value,
          m: 1,
          i: ++state.currentGame.uid,
        });

        moved = true;
      } else if (tile.x !== previous.x || tile.y !== previous.y) {
        Object.assign(state.currentGame.tiles[tileIndex], previous);

        moved = true;
      }
    }
  });

  if (moved) {
    addRandomTiles(1);
    setItem(`game-state-${state.size}`, state.currentGame, true);
  } else {
    state.currentGame.isGameover = !(
      state.currentGame.tiles.length < state.size * state.size ||
      isTileMatcheAvailable()
    );
    setItem(`game-state-${state.size}`, state.currentGame, true);
  }
};

export const hasGame = () => {
  return state.currentGame.tiles.length && !state.currentGame.isGameover;
};

export const newGame = () => {
  setCurrentGame(defaultGameState());
  nextTick(() => addRandomTiles(2));
};
