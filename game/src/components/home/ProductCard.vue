<script lang="ts" setup>
import { FRONTOFFICE } from '@/const';
import type { ProductMarked } from 'shared';

const props = defineProps<{ product: ProductMarked.IProductMarked}>()

</script>
<template>
  <a :href="`${FRONTOFFICE}/shopping/product/${props.product._id}`">
    <div class="w-full p-3 max-w-sm bg-llime mx-auto rounded-lg shadow-lg overflow-hidden">
      <div
        class="flex items-end justify-end w-full bg-cover"
        :style="`height: 20rem; background-image: url(${props.product.images[0]})`"
      >
        <button
          class="p-2 rounded-full bg-lgreen text-text mx-5 -mb-4 hover:dgreen focus:outline-none focus:bg-green-400"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="px-5 py-3">
        <h3 class="text-text font-extrabold text-2xl">{{ props.product.name }}</h3>
        <span class="text-text text-l font-semibold mt-2">{{ props.product.price }} $</span>
      </div>
    </div>
  </a>
</template>
