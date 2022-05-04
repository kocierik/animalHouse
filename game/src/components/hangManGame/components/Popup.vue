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
      if (props.status === 'win')
        return swal('Congratulations! You won! 😃', ' do you want play again?', {
          buttons: ['Another time!', 'I want retry!'],
        });
      if (props.status === 'lose')
        return swal('Unfortunately you lost. 😕', ' do you want play again?', {
          buttons: ['Another time!', 'I want retry!'],
        });
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
