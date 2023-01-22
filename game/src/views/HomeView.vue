<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import SixCard from '@/components/home/SixCard.vue'
import Shop from '@/components/home/HomeShopSection.vue'
import HomeShopSection from '@/components/home/HomeShopSection.vue'
import HealtLinks from '@/components/home/HealtLinks.vue';
</script>
<template>
  <Header />
  <div class="flex flex-1 flex-end">
    <div class="flex flex-1 flex-col flex-end">
      <div class="flex-1 pt-10 pb-10">
        <HomeShopSection />
        <SixCard />
        <HealtLinks />
      </div>
    </div>
  </div>
</template>
