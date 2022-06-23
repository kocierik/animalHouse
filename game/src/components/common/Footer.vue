<script setup lang="ts"></script>
<template>
  <footer class="p-4 color_footer rounded-lg shadow md:px-6 md:py-8">
    <div class="sm:flex sm:items-center sm:justify-around">
      <a class="flex items-center mb-4 sm:mb-0">
        <img src="./assets/animalLogo.png" class="mr-5 h-20 w-18" alt="AnimalHouse Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">AnimalHouse</span>
      </a>
      <ul class="flex flex-wrap items-center justify-center mb-6 text-sm text-black-500 sm:mb-0 dark:text-black-900">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-black-500 sm:text-center dark:text-black-400"
      >© 2022 <a href="#" class="hover:underline">AnimalHouse</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<style>
.color_footer {
  background-color: #cfcfcf;
}
</style>
