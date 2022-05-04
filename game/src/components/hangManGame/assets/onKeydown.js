import { onMounted, onUnmounted } from 'vue'

export default function onKeyDown(handler) {
  onMounted(() => {
    window.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}
