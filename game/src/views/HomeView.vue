<script setup lang="ts">
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
import Carousel from '../components/common/carousel.vue'
</script>
<template>
  <Header />
  <div class="flex flex-1 flex-end">
    <div class="flex flex-1 flex-col flex-end">
      <Carousel />
      <Footer />
    </div>
  </div>
</template>
