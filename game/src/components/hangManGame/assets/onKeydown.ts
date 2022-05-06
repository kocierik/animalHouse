import { onMounted, onUnmounted } from 'vue';

export default function onKeyDown(handler: {
  (this: Window, ev: KeyboardEvent): unknown;
  (this: Window, ev: KeyboardEvent): unknown;
}) {
  onMounted(() => {
    window.addEventListener('keydown', handler);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handler);
  });
}
