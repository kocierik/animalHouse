<script lang="ts" setup>
import type { Article } from './articles'

const props = defineProps<{ params: Article }>()

console.log(props)
</script>
<template>
  <div class="overflow-hidden dark:bg-gray-200">
    <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div class="flex justify-center items-center lg:flex-row flex-col gap-8">
        <!-- Preview Images Div For larger Screen-->

        <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <div class="w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
            <img
              src="https://i.ibb.co/bRg2CJj/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1.png"
              alt="Wooden Chair Previw"
            />
          </div>
          <div class="w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
            <div class="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/0jX1zmR/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1-1.png"
                alt="Wooden chair - preview 1"
              />
            </div>
            <div class="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/7zv1N5Q/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-2.png"
                alt="Wooden chair - preview 2"
              />
            </div>
            <div class="bg-gray-100 flex justify-center items-center py-4">
              <img
                src="https://i.ibb.co/0jX1zmR/sam-moqadam-kvmds-Tr-GOBM-unsplash-removebg-preview-1-1.png"
                alt="Wooden chair- preview 3"
              />
            </div>
          </div>
        </div>
        <!-- Description Div -->

        <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <p
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 dark:text-black"
          >
            Home / Furniture / Wooden Stool
          </p>
          <h2 class="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-black mt-4">
            {{ $route.params.id }}
          </h2>

          <div class="flex flex-row justify-between mt-5">
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1.svg"
              alt="stars"
            />
            <img
              class="hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg1dark.svg"
              alt="stars"
            />
          </div>

          <p class="font-normal text-base leading-6 text-gray-600 mt-7">
            {{ $route.params.id }}
          </p>
          <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-black">
            {{ $route.params.id }} $
          </p>

          <div class="lg:mt-11 mt-10">
            <div class="flex flex-row justify-between">
              <p class="font-medium text-base leading-4 text-gray-600">Select quantity</p>
              <div class="flex">
                <span
                  @click="minus()"
                  class="focus:outline-none dark:text-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                  >-</span
                >
                <input
                  id="counter"
                  v-model="counter"
                  aria-label="input"
                  class="border dark:text-black border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1"
                  type="text"
                />
                <span
                  @click="plus()"
                  class="focus:outline-none dark:text-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1"
                  >+</span
                >
              </div>
            </div>
            <hr class="bg-gray-200 w-full my-2" />
            <div class="flex flex-row justify-between items-center mt-4" @click="rotate()">
              <p class="font-medium text-base leading-4 text-gray-600">Dimensions</p>
              <img
                id="rotateSVG"
                v-if="rotateimg == false"
                class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100 dark:hidden"
                src="../svgs/svg4.svg"
                alt="dropdown"
              />
              <img
                id="rotateSVG"
                v-if="rotateimg == true"
                class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform duration-100 dark:hidden rotate-180"
                src="../svgs/svg4.svg"
                alt="dropdown"
              />
            </div>
            <hr class="bg-gray-200 w-full mt-4" />
          </div>

          <button
            class="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-black bg-gray-800 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Add to shopping bag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
