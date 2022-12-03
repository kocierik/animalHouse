<script lang="ts" setup>
import ErrorBox from '@/components/common/ErrorBox.vue';
import ProductCard from '@/components/home/ProductCard.vue';
import { ApiRepository, ProductMarked } from 'shared';
import { onBeforeMount, ref } from 'vue';

const products = ref<ProductMarked.IProductMarked[]>([])
const loading = ref<boolean>(true)
const isError = ref<boolean>(false)
const error = ref<string>("")

const fetchProducts = async () => {
    const response = await ApiRepository.getMarketProducts()
    isError.value = response.esit
    if (response.esit) {
        products.value = response.data!
    } else {
        error.value = response.error!.mex
    }
}

onBeforeMount(async () => {
    loading.value = true
    await fetchProducts()
    loading.value = false
})

</script>
<template>
    <div class="h-full p-20">
        <!-- Loading -->
        <div v-if="loading">
            <h1>Loading...</h1>
        </div>
        <!-- Content -->
        <div v-else>
            <!-- Error -->
            <div v-if="error" class="flex justify-center">
                <ErrorBox  :mex="error"/>
            </div>
            <!-- Success -->
            <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
                <div v-for="product of products" :key="product._id" class="hover:-translate-y-3 duration-300">
                    <ProductCard class="m-4" :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>