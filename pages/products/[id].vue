<template>
  <div class="container mx-auto px-4 py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Images Section -->
      <div>
        <!-- Main Image with optional modal -->
        <img
            v-if="product.images && product.images.length"
            :src="apiBase + selectedImage"
            alt="Product Image"
            class="w-full h-[400px] object-cover rounded border cursor-pointer"
            @click="showModal = true"
        />

        <!-- Thumbnails -->
        <div class="flex space-x-4 mt-4">
          <img
              v-for="(img, index) in product.images"
              :key="index"
              :src="apiBase + img.image_url"
              alt="Thumbnail"
              @click="selectedImage = img.image_url"
              class="w-20 h-20 object-cover rounded cursor-pointer border-2"
              :class="{
              'border-blue-500': selectedImage === img.image_url,
              'border-transparent': selectedImage !== img.image_url
            }"
          />
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>

        <!-- Availability Badge -->
        <span
            :class="{
            'text-green-600 font-semibold': product.quantity > 0,
            'text-red-600 font-semibold': product.quantity === 0
          }"
            class="inline-block mb-2"
        >
          {{ product.quantity > 0 ? 'In Stock' : 'Sold Out' }}
        </span>

        <p class="text-gray-700 mb-4">Description: {{ product.description }}</p>

        <p class="text-xl text-blue-600 font-semibold mb-4">
          Price: {{ product.price }} Toman
        </p>

        <!-- Quantity Selector -->
        <div class="mb-4 flex items-center gap-2">
          <label class="text-gray-700">Quantity:</label>
          <input
              type="number"
              v-model.number="selectedQuantity"
              min="1"
              :max="product.quantity"
              class="w-20 border rounded px-2 py-1"
          />
        </div>

        <button
            :disabled="product.quantity === 0"
            @click.prevent="addToCart(product)"
            class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length" class="mt-20">
      <h2 class="text-2xl font-bold mb-6">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NuxtLink
            v-for="related in relatedProducts"
            :key="related.id"
            :to="`/products/${related.id}`"
            class="block border rounded-lg p-4 shadow hover:shadow-lg transition hover:bg-gray-50"
        >
          <img
              v-if="related.images && related.images.length"
              :src="apiBase + related.images[0].image_url"
              alt="Related Product"
              class="h-40 w-full object-cover rounded mb-4"
          />
          <h3 class="font-semibold mb-2">{{ related.title }}</h3>
          <p class="text-gray-600">{{ related.price }} Toman</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Modal for zoom -->
    <div
        v-if="showModal"
        @click.self="showModal = false"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <img
          :src="apiBase + selectedImage"
          class="max-w-[90%] max-h-[90%] rounded shadow-lg"
          alt="Zoomed Product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: product, error } = await useAsyncData(
    `product-${route.params.id}`,
    () => $fetch(`${apiBase}/api/show-product/${route.params.id}`)
);

const cart = useCartStore();
const selectedImage = ref("");
const selectedQuantity = ref(1);
const showModal = ref(false);

// Update selected image when product changes
watchEffect(() => {
  if (product.value?.images?.length) {
    selectedImage.value = product.value.images[0].image_url;
  }
});

// Add to cart logic
function addToCart(product) {
  const item = { ...product, quantity: selectedQuantity.value };
  cart.addItem(item);
  console.log(item, "is added to cart");
}

// Related Products
const relatedProducts = ref([]);
watchEffect(async () => {
  if (product.value?.type) {
    const res = await $fetch(
        `${apiBase}/api/get-products-categorized/${product.value.type}`
    );
    // Exclude the current product
    relatedProducts.value = res.filter((p) => p.id !== product.value.id);
  }
});
</script>
