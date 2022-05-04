<script>
import swal from 'sweetalert';
import { computed } from 'vue';
export default {
  props: {
    status: { type: String, default: '' },
    word: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const finalMessage = computed(() => {
      if (props.status === 'win') {
        emit('reset');
        return swal('Congratulations! You won! 😃');
      }
      if (props.status === 'lose') {
        emit('reset');
        return swal('Unfortunately you lost. 😕');
      }

      return '';
    });

    const reset = () => emit('reset');
    return { finalMessage, reset };
  },
};
</script>
<template>
  <div v-if="finalMessage" class="popup-container" id="popup-container"></div>
</template>
