<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import SixCard from '@/components/common/SixCard.vue'
/*import Billing from '@/components/common/Billing.vue'
import Carousel from '@/components/common/carousel.vue'
import TeamCards from '@/components/common/TeamCards.vue'
import NewsLetter from '@/components/common/NewsLetter.vue'
import Testimonials from '@/components/common/Testimonials.vue'*/
import Shop from '@/components/common/Shop.vue'
</script>
<template>
  <Header />
  <div class="flex flex-1 flex-end">
    <div class="flex flex-1 flex-col flex-end">
      <div class="flex-1 pt-10 pb-10">
        <Shop />
        <SixCard />
      </div>
    </div>
  </div>
</template>
