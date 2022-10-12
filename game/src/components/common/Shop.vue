<script lang="ts" setup>
import Product from './Product.vue'
import { productArticles } from './articles'
import { FRONTOFFICE } from '@/const'
</script>
<template>
  <div x-data="{ cartOpen: false , isOpen: false }" data-aos="fade-up" class="bg-white">
    <main class="my-8 text-center">
      <h2 class="text-4xl text-text leading-normal mb-2 font-black text-black">Check some of our products</h2>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        <a v-for="article in productArticles" :key="article.id" class="hover:-translate-y-3 duration-300">
          <Product :articleInfo="article" />
        </a>
      </div>
    </main>
    <div data-aos="fade-down" data-aos-easing="linear" class="flex justify-center">
      <a :href="FRONTOFFICE + '/shop'" class="flex justify m-8">
        <button
          class="hover:-translate-y-1 duration-300 bg-lyellow px-6 py-3 rounded-full text-xl text-text font-bold mr-2"
        >
          Go to the shop
        </button>
      </a>
    </div>
  </div>
</template>
