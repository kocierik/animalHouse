<script setup lang="ts">
import Header from '../components/common/Header.vue'
import Footer from '../components/common/Footer.vue'
import Carousel from '../components/common/Carousel.vue'
import SixCard from '../components/common/SixCard.vue'
import Billing from '../components/common/Billing.vue'
</script>
<template>
  <Header />
  <div class="flex flex-1 flex-end">
    <div class="flex flex-1 flex-col flex-end">
      <div class="flex-1 pt-10 pb-10">
        <SixCard />
        <Carousel />
        <Billing />
      </div>
      <Footer />
    </div>
  </div>
</template>
