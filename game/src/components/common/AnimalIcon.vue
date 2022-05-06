<template>
  <span> {{ value }} </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AnimalType } from 'shared';

const props = defineProps<{ animal: AnimalType }>();
let value = ref<string>();

if (props.animal === AnimalType.Cat) value.value = '🐱';
else if (props.animal === AnimalType.Dog) value.value = '🐶';
else if (props.animal === AnimalType.Fox) value.value = '🦊';
else if (props.animal === AnimalType.Duck) value.value = '🦆';
else if (props.animal === AnimalType.Bunny) value.value = '🐰';
else if (props.animal === AnimalType.Lizard) value.value = '🦎';
else if (props.animal === AnimalType.Koala) value.value = '🐨';
else if (props.animal === AnimalType.Panda) value.value = '🐼';
else value.value = '';
</script>
