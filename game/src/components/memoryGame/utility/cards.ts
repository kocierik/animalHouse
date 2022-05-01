import { ref, type StyleValue } from 'vue';

export interface Card {
  firstName: string;
  id: number;
  view: StyleValue;
  bg: string;
  selected: boolean;
  opacity: number;
}

export const defaultCard: Card = {
  firstName: '',
  id: 0,
  view: 'visible',
  bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
  selected: false,
  opacity: 1,
};

const cards = ref<Card[]>([
  {
    firstName: 'Frank',
    id: 1,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Frank',
    id: 2,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Vic',
    id: 3,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Vic',
    id: 4,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Gina',
    id: 5,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Gina',
    id: 6,
    view: 'visible',
    bg: 'https://www.my-personaltrainer.it/2021/04/13/alimentazione-gatto_900x760.jpeg',
    selected: false,
    opacity: 1,
  },
  // { firstName: 'Jessi', id: 7, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Jessi', id: 8, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Erik', id: 9, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Erik', id: 10, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Man', id: 11, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Man', id: 12, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'MAttia', id: 13, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'MAttia', id: 14, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'FABBIO', id: 15, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'FABBIO', id: 16, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Jay', id: 17, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
  // { firstName: 'Jay', id: 18, view: 'visible', bg: 'blue', selected: false, opacity: 1 },
]);

cards.value = cards.value.sort(() => Math.random() - 0.5);
export default cards;
