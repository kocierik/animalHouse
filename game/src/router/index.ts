import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PersonalView from '@/views/PersonalView.vue';
import GamesView from '@/views/GamesView.vue';
import MemoryGame from '../components/memoryGame/MemoryGame.vue';
export const HomeRoute = '/';
export const GamesRoute = '/games';
export const PersonalRoute = '/personal';
export const GameMemory = '/games/memory';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HomeRoute,
      name: 'home',
      component: HomeView,
    },
    {
      path: PersonalRoute,
      name: 'personal',
      component: PersonalView,
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
  ],
});

export default router;
