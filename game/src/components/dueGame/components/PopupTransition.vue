<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-200"
    leave-to-class="opacity-0"
    leave-active-class="transition-opacity duration-200"
    ><slot></slot
  ></transition>
</template>
