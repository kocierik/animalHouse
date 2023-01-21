// Those constants are stored there for technical reasons.
// If you put them into the router/index.ts file you will create a circual dependecy which will break the execution
export const GameMemoryRoute = '/funny/games/memory'
export const GameQuizRoute = '/funny/games/quiz'
export const GameHangManRoute = '/funny/games/hang-man'
export const GameDueRoute = '/funny/games/due48'
export const GameMinesweeperRoute = '/funny/games/minesweeper'
export const GameTicTacToeRoute = '/funny/games/tic-tac-toe'

export interface Game {
  id: number
  name: string
  url: string
  bgImage: string
}

export const gameList: Game[] = [
  {
    id: 0,
    name: 'Memory',
    url: GameMemoryRoute,
    bgImage:
      'https://static.vecteezy.com/ti/vettori-gratis/p1/4676383-colore-onde-sfondo-fluid-flow-ink-splash-abstract-flow-vibrant-color-trendy-poster-colorato-gradient-ink-in-water-3d-wave-liquid-shape-flow-wave-gratuito-vettoriale.jpg'
  },
  {
    id: 1,
    name: 'Quiz',
    url: GameQuizRoute,
    bgImage:
      'https://www.creativefabrica.com/wp-content/uploads/2020/01/05/wave-colorful-background-Graphics-1-1-580x387.jpg'
  },
  {
    id: 2,
    name: 'HangMan',
    url: GameHangManRoute,
    bgImage: 'https://i.pinimg.com/600x315/58/40/4c/58404cb23b6a60cea480ed7576553b9a.jpg'
  },
  {
    id: 3,
    name: '2048',
    url: GameDueRoute,
    bgImage:
      'https://png.pngtree.com/thumb_back/fh260/background/20200719/pngtree-gradient-colorful-abstract-design-image_360031.jpg'
  },
  {
    id: 4,
    name: 'Minesweeper',
    url: GameMinesweeperRoute,
    bgImage: 'https://i.pinimg.com/originals/ca/6b/0f/ca6b0f7177229f00b2ec1ea2f48385fd.jpg'
  },
  {
    id: 5,
    name: 'Tic Tac Toe',
    url: GameTicTacToeRoute,
    bgImage: 'https://c.neh.tw/thumb/f/720/5fc1c59b4fd94ddd8128.jpg'
  }
]
