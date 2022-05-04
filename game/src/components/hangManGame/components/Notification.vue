<template>
  <div class="notification-container" :class="show ? 'show' : ''">
    <p>You have already entered this letter</p>
  </div>
</template>

<script>
export default {
  props: { show: { type: Boolean, default: false } }
}
</script>
