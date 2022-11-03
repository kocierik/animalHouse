<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import SixCard from '@/components/common/SixCard.vue'
import Shop from '@/components/common/Shop.vue'
/*todo test*/
import { ApiRepository } from 'shared';
import { onBeforeMount } from 'vue'

onBeforeMount(async ()=> {
  const x = await ApiRepository.getUserInfoById("635e3a6cb694124241c98aaf") 
  console.log(x)
})
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
