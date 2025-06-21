<template>
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          v-if="product.images && product.images.length"
          :src="apiBase + product.images[0].image_url"
          alt="Product Image"
          class="h-100 w-full object-cover rounded"
        />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-xl text-blue-600 font-semibold mb-4">
          {{ product.price }}
        </p>
        <button
          class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

const {
  data: product,
  pending,
  error,
} = await useAsyncData(`product-${route.params.id}`, () =>
  $fetch(`${apiBase}/api/show-product/${route.params.id}`)
);
</script>
