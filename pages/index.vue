<template>
  <div>
    <!-- Hero Banner -->
    <section class="bg-gray-100 py-20 text-center">
      <h2 class="text-4xl font-bold mb-4">Welcome to XShop</h2>
      <p class="text-lg text-gray-600 mb-6">
        Find the best products at unbeatable prices.
      </p>

      <!-- Search Bar -->
      <div class="mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="w-full md:w-1/2 border px-4 py-2 rounded"
        />
        <button
          @click="applySearch"
          class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mt-2 md:mt-0"
        >
          Find
        </button>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">Featured Products</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <NuxtLink
          v-for="product in filteredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="block border rounded-lg p-4 shadow hover:shadow-lg transition hover:bg-gray-50"
        >
          <div class="bg-gray-200 h-40 rounded mb-4">
            <img
              v-if="product.images && product.images.length"
              :src="apiBase + product.images[0].image_url"
              alt="Product Image"
              class="h-40 w-full object-cover rounded"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <h4 class="font-semibold mb-2">{{ product.title }}</h4>
            <h3 v-if="product.quantity > 0" class="text-green-600 mb-2">available</h3>
            <h3 v-if="product.quantity == 0" class="text-red-600 mb-2">sold out</h3>
          </div>
          <h3 class="text-gray-600 mb-2">{{ product.price }}</h3>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <!-- <p v-if="product.images && product.images.length">{{ product.images[0].image_url }}</p> -->
          <button
            @click.prevent="addToCart(product)"
            class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const {
  public: { apiBase },
} = useRuntimeConfig();

// Full product list
const { data: productsRaw } = await useFetch(`${apiBase}/api/products`);

// Search query input
const searchQuery = ref("");

// Filtered list to display
const filteredProducts = ref([]);

// On load: show all products
watchEffect(() => {
  if (productsRaw.value) {
    filteredProducts.value = productsRaw.value;
  }
});

function applySearch() {
  if (!searchQuery.value) {
    filteredProducts.value = productsRaw.value;
  } else {
    filteredProducts.value = productsRaw.value.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
}

import { useCartStore } from "@/stores/cartStore";
const cart = useCartStore();

function addToCart(product) {
  cart.addItem(product);
  console.log(product, " is added");
}
</script>
