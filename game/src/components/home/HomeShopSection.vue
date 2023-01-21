<script lang="ts" setup>
import Product from './ProductCard.vue'
import { ApiRepository, JsonProduct } from 'shared'
import { onBeforeMount, ref } from 'vue'
import { FRONTOFFICE } from '@/const'

const PROD_NO = 4
const products = ref<JsonProduct.IProduct[]>([])

const fetchProducts = async () => {
  const response = await ApiRepository.getMarketProducts()
  if (response.esit) {
    products.value = response.data!.filter((_, i) => i < PROD_NO)
  }
}

onBeforeMount(async () => {
  await fetchProducts()
})
</script>
<template>
  <div x-data="{ cartOpen: false , isOpen: false }" data-aos="fade-up" class="bg-white">
    <main class="my-8 text-center">
      <h2 class="text-4xl text-text leading-normal mb-2 font-black text-black">Check some of our products</h2>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        <a v-for="product in products" :key="product._id" class="hover:-translate-y-3 duration-300">
          <Product :product="product" />
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
