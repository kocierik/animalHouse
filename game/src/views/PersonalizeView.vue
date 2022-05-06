<template>
  <main class="flex justify-center p-5">
    <div class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h1 class="mb-2 text-5xl font-bold tracking-tight text-gray-900">Ops!!</h1>
      <h2 class="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        It's seems like we don't know a lot of each others!
      </h2>
      <p class="font-normal text-gray-700">Tell me what are your favourites animals:</p>
      <div class="m-5 flex flex-wrap justify-center space-y-2 space-x-2 items-end">
        <Chip
          v-for="a in animals"
          :text="a.name"
          image="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
          :onClick="a.click"
        />
      </div>
      <div class="flex justify-center">
        <button
          @click="onConfirm"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="m-2" width="24" height="24" viewBox="0 0 24 24">
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
          <span class="text-base">Confirm</span>
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Chip from '@/components/common/Chip.vue';
import * as lsh from '@/helpers/localStoreHelper';
import { AnimalType } from 'shared';

interface AnimalChip {
  name: string;
  click(): void;
  selected: boolean;
}

const animals: AnimalChip[] = [
  {
    name: AnimalType.Dog.toString(),
    click: () => {
      animals[0].selected = !animals[0].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Cat.toString(),
    click: () => {
      animals[1].selected = !animals[1].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Fox.toString(),
    click: () => {
      animals[2].selected = !animals[2].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Duck.toString(),
    click: () => {
      animals[3].selected = !animals[3].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Bunny.toString(),
    click: () => {
      animals[4].selected = !animals[4].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Koala.toString(),
    click: () => {
      animals[5].selected = !animals[5].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Panda.toString(),
    click: () => {
      animals[6].selected = !animals[6].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Shiba.toString(),
    click: () => {
      animals[7].selected = !animals[7].selected;
    },
    selected: false,
  },
  {
    name: AnimalType.Lizard.toString(),
    click: () => {
      animals[8].selected = !animals[8].selected;
    },
    selected: false,
  },
];

const onConfirm = () => {
  const toStore = animals.filter((e) => e.selected).map((e) => e.name);
  localStorage.setItem(lsh.PersonalAnimals, JSON.stringify(toStore));
  window.location.href = '/personal';
};
</script>
