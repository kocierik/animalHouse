<template>
  <div class="content-center">
    <div v-if="isLoading" class="flex justify-center">
      <LoadingSpinner />
    </div>
    <a v-else class="block max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div class="p-6">
        <div class="flex justify-start space-x-3">
          <AnimalIcon class="mb-2 text-2xl font-bold tracking-tight" :animal="props.animal" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Fact!</h5>
        </div>
        <p class="font-normal text-gray-700">
          {{ fact }}
        </p>
        <button
          @click="loadFact()"
          class="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full"
        >
          Another one!
        </button>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { fetchCatFacts } from '@/network/api';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import AnimalIcon from '@/components/common/AnimalIcon.vue';
import { AnimalType } from 'shared';

const props = defineProps<{ animal: AnimalType }>();

let fact = ref<string>('loading...');
let isLoading = ref<boolean>(false);

const loadFact = async () => {
  isLoading.value = true;
  let resp = await fetchCatFacts();
  if (resp.esit && resp.data !== undefined) {
    fact.value = resp.data.data[0];
  } else {
    fact.value = 'Error! Check your internet connection!';
    console.error("Can't fetch facts");
  }
  isLoading.value = false;
};

onBeforeMount(loadFact);
</script>

<style></style>
