import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PersonalView from '@/views/PersonalView.vue'
import PersonalizeView from '@/views/PersonalizeView.vue'
import GamesView from '@/views/GamesView.vue'
import MemoryGame from '@/components/games/memoryGame/MemoryGame.vue'
import QuizGame from '@/components/games/quizGame/QuizGame.vue'
import HangManGame from '@/components/games/hangManGame/hangManGame.vue'
import DueGame from '@/components/games/dueGame/dueGame.vue'
import MinesweeperGame from '@/components/games/minesweeper/MinesweeperGame.vue'
import ticTacToeGame from '@/components/games/ticTacToeGame/ticTacToeGame.vue'
import CardProductHome from '@/components/common/CardProduct.vue'

export const HomeRoute = '/'
export const LoginRoute = '/login'
export const GamesRoute = '/games'
export const PersonalRoute = '/personal'
export const PersonalizeRoute = '/personal/personalize'
export const GameMemory = '/games/memory'
export const GameQuiz = '/games/quiz'
export const GameHangMan = '/games/hangMan'
export const GameDue = '/games/due48'
export const GameMinesweeper = '/games/Minesweeper'
export const GameTicTacToe = '/games/ticTacToeGame'
export const HomeCardProduct = '/home/product/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HomeRoute,
      name: 'home',
      component: HomeView,
    },
    {
      path: LoginRoute,
      name: 'login',
      component: LoginView,
    },
    {
      path: HomeCardProduct + ':id',
      name: 'product',
      component: CardProductHome,
      props: true,
    },
    {
      path: PersonalRoute,
      name: 'personal',
      component: PersonalView,
    },
    {
      path: PersonalizeRoute,
      name: 'personalize',
      component: PersonalizeView,
    },
    {
      path: GamesRoute,
      name: 'games',
      component: GamesView,
    },
    {
      path: GameMemory,
      name: 'memory',
      component: MemoryGame,
    },
    {
      path: GameQuiz,
      name: 'quiz',
      component: QuizGame,
    },
    {
      path: GameHangMan,
      name: 'HangMan',
      component: HangManGame,
    },
    {
      path: GameDue,
      name: 'due48',
      component: DueGame,
    },
    {
      path: GameMinesweeper,
      name: 'MinesweeperGame',
      component: MinesweeperGame,
    },
    {
      path: GameTicTacToe,
      name: 'ticTacToeGame',
      component: ticTacToeGame,
    },
  ],
})

export default router
