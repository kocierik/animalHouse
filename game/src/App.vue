<script lang="ts" setup>
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
</script>

<template>
  <Navbar />
  <div class="h-100">
    <router-view />
  </div>
  <Footer />
</template>

<style></style>
