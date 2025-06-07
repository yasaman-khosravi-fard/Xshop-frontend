<template>
  <div>
    <!-- Navbar -->
    <header class="bg-white shadow">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-xl font-bold">MyShop</h1>
        <nav class="space-x-6">
          <a href="#" class="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">Shop</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">About</a>
          <a href="#" class="text-gray-700 hover:text-blue-500">Contact</a>
        </nav>
      </div>
    </header>

    <!-- Hero Banner -->
    <section class="bg-gray-100 py-20 text-center">
      <h2 class="text-4xl font-bold mb-4">Welcome to MyShop</h2>
      <p class="text-lg text-gray-600 mb-6">
        Find the best products at unbeatable prices.
      </p>
      <button
        class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Shop Now
      </button>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4 py-12">
      <h3 class="text-2xl font-semibold mb-6">Featured Products</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <div class="bg-gray-200 h-40 rounded mb-4">
            <img
              v-if="product.images && product.images.length"
              :src="apiBase + product.images[0].image_url"
              alt="Product Image"
              class="h-40 w-full object-cover rounded"
            />
          </div>
          <h4 class="font-semibold mb-2">{{ product.title }}</h4>
          <h3 class="text-gray-600 mb-2">{{ product.price }}</h3>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <!-- <p v-if="product.images && product.images.length">{{ product.images[0].image_url }}</p> -->
          <button
            class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
  const { public : { apiBase } } = useRuntimeConfig();
const { data: products } = await useFetch(`${apiBase}/api/products`);
</script>
