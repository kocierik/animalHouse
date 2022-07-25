<script lang="ts" setup>
import Product from './Product.vue'
</script>
<template>
  <div x-data="{ cartOpen: false , isOpen: false }" class="bg-white">
    <main class="my-8 text-center">
      <h2 class="text-2xl leading-normal mb-2 font-bold text-black">Check some of our product</h2>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </main>
  </div>
</template>
