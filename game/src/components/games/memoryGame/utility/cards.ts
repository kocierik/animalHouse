import { ref } from 'vue'
import { AnimalType, getAnimalPicture } from 'shared'
import gatto from '../assets/gatto.webp'
const a = ref<string>()
const b = ref<string>()
const c = ref<string>()
const d = ref<string>()
const e = ref<string>()
const f = ref<string>()
a.value = await getAnimalPicture(AnimalType.Bunny)
b.value = await getAnimalPicture(AnimalType.Panda)
c.value = await getAnimalPicture(AnimalType.Dog)
d.value = await getAnimalPicture(AnimalType.Lizard)
e.value = await getAnimalPicture(AnimalType.Cat)
f.value = await getAnimalPicture(AnimalType.Koala)

export interface Card {
  firstName?: string
  id?: number
  view?: boolean,
  bg?: string
  selected?: boolean
  opacity?: number
  bgOut?: string
}

export const defaultCard: Card = {
  firstName: '',
  id: 0,
  view: true,
  bg: gatto,
  bgOut: '',
  selected: false,
  opacity: 1,
}

const cards = ref<Card[]>([
  {
    firstName: 'Frank',
    id: 1,
    view: true,
    bg: gatto,
    bgOut: a.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Frank',
    id: 2,
    view: true,
    bg: gatto,
    bgOut: a.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Vic',
    id: 3,
    view: true,
    bg: gatto,
    bgOut: b.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Vic',
    id: 4,
    view: true,
    bg: gatto,
    bgOut: b.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Gina',
    id: 5,
    view: true,
    bg: gatto,
    bgOut: c.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'Gina',
    id: 6,
    view: true,
    bg: gatto,
    bgOut: c.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo1',
    id: 7,
    view: true,
    bg: gatto,
    bgOut: d.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo1',
    id: 8,
    view: true,
    bg: gatto,
    bgOut: d.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo2',
    id: 9,
    view: true,
    bg: gatto,
    bgOut: e.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo2',
    id: 10,
    view: true,
    bg: gatto,
    bgOut: e.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo3',
    id: 11,
    view: true,
    bg: gatto,
    bgOut: f.value,
    selected: false,
    opacity: 1,
  },
  {
    firstName: 'bo3',
    id: 12,
    view: true,
    bg: gatto,
    bgOut: f.value,
    selected: false,
    opacity: 1,
  },
])

cards.value = cards.value.sort(() => Math.random() - 0.5)

export default cards
