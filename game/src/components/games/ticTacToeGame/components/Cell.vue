<template>
  <button @click="setCell()" class="flex">
    {{ label }}
  </button>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    placement: Array,
    label: String,
  },
  setup(props, { emit }) {
    const place = ref(props.placement)
    const label = ref(props.label)
    watch(() => {
      label.value = props.label
    })
    const setCell = () => {
      emit('place', place.value)
    }

    return {
      place,
      // eslint-disable-next-line vue/no-dupe-keys
      label,
      setCell,
    }
  },
}
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 2px;
  font-size: 2em;
  font-weight: bold;
  border: 1px solid #3c4042;
  background: #606368;
}
button:focus {
  outline: none;
}
</style>
