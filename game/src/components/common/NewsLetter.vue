<template>
  <!-- component -->
  <div class="2xl:mx-auto 2xl:container mx-4 py-16">
    <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->
    <div class="w-full relative flex items-center justify-center">
      <div
        class="bg-gray-50 bg-opacity-100 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40"
      >
        <h1 class="text-4xl font-semibold leading-9 text-black text-center">Don’t miss out!</h1>
        <p class="text-base leading-normal text-center text-black mt-6">
          Subscribe to your newsletter to stay in the loop. Our newsletter is sent once in <br />
          a week on every friday so subscribe to get latest news and updates.
        </p>
        <div
          class="sm:border border-gray-200 rounded flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0"
        >
          <input
            class="border border-gray-300 sm:border-transparent rounded text-base w-full font-medium leading-none text-black p-4 focus:outline-none bg-gray-50 placeholder-gray-300"
            placeholder="Email Address"
          />
          <button
            class="focus:outline-none focus:ring-offset-2 rounded focus:ring border border-gray-400 sm:border-transparent w-full sm:w-auto bg-gray-100 py-4 px-6 hover:bg-opacity-75"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
