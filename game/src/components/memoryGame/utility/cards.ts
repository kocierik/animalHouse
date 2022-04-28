import { ref } from 'vue';

export interface Card {
  firstName: string;
  id: number;
  view: boolean;
  bg: string;
}

const cards = ref<Card[]>([
  { firstName: 'Frank', id: 1, view: false, bg: 'white' },
  { firstName: 'Vic', id: 2, view: false, bg: 'white' },
  { firstName: 'Gina', id: 3, view: false, bg: 'white' },
  { firstName: 'Jessi', id: 4, view: false, bg: 'white' },
  { firstName: 'Erik', id: 5, view: false, bg: 'white' },
  { firstName: 'Man', id: 6, view: false, bg: 'white' },
  { firstName: 'MAttia', id: 7, view: false, bg: 'white' },
  { firstName: 'FABBIO', id: 8, view: false, bg: 'white' },
  { firstName: 'Jay', id: 9, view: false, bg: 'white' },
]);

cards.value = cards.value.concat(...cards.value);
cards.value = cards.value.sort(() => Math.random() - 0.5);
export default cards;
