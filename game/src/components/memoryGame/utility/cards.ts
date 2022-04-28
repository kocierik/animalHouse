import { ref } from 'vue';

export interface Card {
  firstName: string;
  id: number;
}

const cards = ref<Card[]>([
  { firstName: 'Frank', id: 1 },
  { firstName: 'Vic', id: 2 },
  { firstName: 'Gina', id: 3 },
  { firstName: 'Jessi', id: 4 },
  { firstName: 'Erik', id: 5 },
  { firstName: 'Man', id: 6 },
  { firstName: 'MAttia', id: 7 },
  { firstName: 'FABBIO', id: 8 },
  { firstName: 'Jay', id: 9 },
]);

cards.value = cards.value.concat(...cards.value);
cards.value = cards.value.sort(() => Math.random() - 0.5);
export default cards;
