<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded shadow text-center">
        <h2 class="text-lg text-gray-600 mb-2">Total Products</h2>
        <p class="text-2xl font-bold text-blue-600">{{ totalProducts }}</p>
      </div>
      <div class="bg-white p-6 rounded shadow text-center">
        <h2 class="text-lg text-gray-600 mb-2">Transactions</h2>
        <p class="text-2xl font-bold text-green-600">{{ totalTransactions }}</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink to="product" class="bg-blue-600 text-white p-3 rounded shadow hover:bg-blue-700 text-center">
        View All Products
      </NuxtLink>
      <NuxtLink to="transactions" class="bg-green-600 text-white p-3 rounded shadow hover:bg-green-700 text-center">
        View Transactions
      </NuxtLink>
      <NuxtLink to="product/create" class="bg-indigo-600 text-white p-3 rounded shadow hover:bg-indigo-700 text-center">
        Add New Product
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalProducts = ref(0)
const soldOutProducts = ref(0)
const totalTransactions = ref(0)

onMounted(async () => {
  //I should Replace these with actual API calls
  totalProducts.value = 27
  soldOutProducts.value = 5
  totalTransactions.value = 134
})
</script>
