<template>
  <main class="flex justify-center p-5">
    <div class="block m-8 p-6 bg-llime rounded-lg border border-gray-200 shadow-md">
      <h1 class="mb-2 text-5xl font-black tracking-tight text-text">Ops!!</h1>
      <h2 class="mb-2 text-3xl font-bold tracking-tight text-text">
        It's seems like we don't know a lot of each others!
      </h2>
      <p class="font-normal text-text">Tell me what are your favourites animals:</p>
      <div class="m-5 flex flex-wrap justify-center space-y-2 space-x-2 items-end">
        <Chip
          tabindex="0"
          v-bind:key="a.name"
          v-for="a in animals"
          :text="a.name"
          image="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg"
          :onClick="a.click"
        />
      </div>
      <div class="flex justify-center">
        <button
          @click="onConfirm"
          class="bg-lyellow hover:bg-dyellow text-text font-bold py-3 px-6 rounded-full inline-flex items-center"
        >
          <span class="text-base">Confirm</span>
        </button>
      </div>
    </div>
  </main>
  <div class="flex justify-center">
    <img alt="animal zebra" src="https://cdn.pixabay.com/photo/2020/02/20/14/37/zebra-4864906_1280.png" />
  </div>
</template>

<script lang="ts" setup>
import { redirect } from '@/router'
import { ApiRepository, Helpers } from 'shared'
import { onBeforeMount, ref } from 'vue'
import Chip from '../components/common/Chip.vue'

interface AnimalChip {
  name: string
  click(): void
  selected: boolean
}

const animals = ref<AnimalChip[]>([])

onBeforeMount(async () => {
  let codes = await ApiRepository.getAnimalCode()
  if (codes.esit) {
    animals.value = codes.data!.map((element) => {
      return {
        name: element.value as string,
        click: () => {
          animals.value[element.code].selected = !animals.value[element.code].selected
        },
        selected: false
      }
    })
  } // TODO handle error
})

const onConfirm = () => {
  const toStore = animals.value.filter((e) => e.selected).map((e) => e.name)
  localStorage.setItem(Helpers.LS_PersonalAnimals, JSON.stringify(toStore))
  redirect('/personal')
}
</script>
