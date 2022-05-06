import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import PersonalView from '@/views/PersonalView.vue';
import PersonalizeView from '@/views/PersonalizeView.vue';
import GamesView from '@/views/GamesView.vue';

export const HomeRoute = "/"
export const GamesRoute = "/games"
export const PersonalRoute = "/personal"
export const PersonalizeRoute = "/personal/personalize"

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
      path: PersonalizeRoute,
      name: 'personalize',
      component: PersonalizeView,
    },
    {
      path: GamesRoute,
      name: 'games',
      component: GamesView,
    },
  ],
});

export default router;
