<template>
  <body class="overflow-hidden dark:bg-gray-900">
    <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div class="flex justify-center items-center lg:flex-row flex-col gap-8">
        <!-- Description Div -->

        <div class="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <p
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 dark:text-white"
          >
            Home / Furniture / Wooden Stool
          </p>
          <h2 class="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white mt-4">
            Wooden Stool
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
            <p
              class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 dark:text-white duration-100 cursor-pointer"
            >
              22 reviews
            </p>
          </div>

          <p class="font-normal text-base leading-6 text-gray-600 mt-7">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using. Lorem Ipsum is that it has a more-or-less normal distribution of
            letters.
          </p>
          <p class="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 dark:text-white">$ 790.89</p>

          <div class="lg:mt-11 mt-10">
            <div class="flex flex-row justify-between">
              <p class="font-medium text-base leading-4 text-gray-600">Select quantity</p>
              <div class="flex">
                <span
                  @click="minus()"
                  class="focus:outline-none dark:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                  >-</span
                >
                <input
                  id="counter"
                  v-model="counter"
                  aria-label="input"
                  class="border dark:text-white border-gray-300 dark:bg-transparent h-full text-center w-14 pb-1"
                  type="text"
                />
                <span
                  @click="plus()"
                  class="focus:outline-none dark:text-white focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1"
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
            class="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Add to shopping bag
          </button>
        </div>

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
      </div>
      <div class="flex justify-center items-center w-full">
        <div
          class="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10"
        >
          <div>
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg2.svg"
              alt="drink"
            />
            <img
              class="hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg2dark.svg"
              alt="drink"
            />
            <p class="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">Great for drinks</p>
            <p class="text-normal text-base leading-6 text-gray-600 mt-4">
              Here are all the great cocktail recipes you should know how to make, from the margarita to the whiskey
              sour. Cheers!
            </p>
          </div>
          <div>
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg3.svg"
              alt="hardware"
            />
            <img
              class="hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg3dark.svg"
              alt="hardware"
            />
            <p class="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">Durable hardware</p>
            <p class="text-normal text-base leading-6 text-gray-600 mt-4">
              Product durability is a key aspect of achieving a circular economy. ... Moreover, enhancing the durability
              of individual hardware components
            </p>
          </div>
          <div>
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg5.svg"
              alt="Eco-friendly"
            />
            <img
              class="hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg5dark.svg"
              alt="Eco-friendly"
            />
            <p class="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">Eco-friendly</p>
            <p class="text-normal text-base leading-6 text-gray-600 mt-4">
              They re-use, recycle and reduce waste disposal in their lives. They conserve energy and natural resources
            </p>
          </div>
          <div>
            <img
              class="dark:hidden"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg6.svg"
              alt="drink"
            />
            <img
              class="hidden dark:block"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail4-svg6dark.svg

"
              alt="drink"
            />
            <p class="font-semibold text-xl leading-5 text-gray-800 dark:text-white lg:mt-10 mt-9">Minimal Design</p>
            <p class="text-normal text-base leading-6 text-gray-600 mt-4">
              Minimalist interior design is very similar to modern interior design and involves using the bare
              essentials
            </p>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
      rotateimg: false,
    }
  },
  methods: {
    plus() {
      this.counter
      this.counter = this.counter + 1
    },

    minus() {
      var preValue = document.getElementById('counter').value
      if (parseInt(preValue) != 0) {
        this.counter = this.counter - 1
      }
    },

    rotate() {
      if (this.rotateimg == true) {
        this.rotateimg = false
      } else {
        this.rotateimg = true
      }
    },
  },
}
</script>

<style></style>
