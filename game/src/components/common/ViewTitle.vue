<template>
  <div class="bg-div" :style="`background-image: url(${props.background})`">
    {{ props.title }}
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ title: string; background: string }>()
</script>

<style>
.bg-div {
  width: 100%;
  height: 4em;
  color: white;
  padding-top: 2.5em;
  padding-left: 0.5em;
  background-color: #000;
  font-size: 42pt;
  font-weight: 500;
  text-align: start;
}
</style>
