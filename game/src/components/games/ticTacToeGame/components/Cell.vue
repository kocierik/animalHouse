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
    label: String
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
      setCell
    }
  }
}
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  font-size: 3em;
  margin: 2px;
  color: rgb(40, 16, 16);
  font-weight: bold;
  border-radius: 1rem;
  border: 1px solid #3c4042;
  background-image: url('../assets/canarinoTris.jpeg');
  background-size: cover;
}
button:focus {
  outline: none;
}

@media screen and (max-width: 700px) {
  button {
    width: 5rem;
    height: 5rem;
    font-size: 2em;
  }
}
</style>
