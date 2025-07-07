<template>
  <div class="container mx-auto px-4 py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- Images Section -->
      <div>
        <!-- Main Image -->
        <img
            v-if="product.images && product.images.length"
            :src="apiBase + selectedImage"
            alt="Product Image"
            class="w-full h-[400px] object-cover rounded border"
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
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-600 mb-4"> description : {{ product.description }}</p>
        <p class="text-xl text-blue-600 font-semibold mb-4">
          price : {{ product.price }}
        </p>
        <p class="text-xl text-blue-600 font-semibold mb-4">
          stock : {{ product.quantity }}
        </p>
      </div>
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

const {
  data: product,
  pending,
  error,
} = await useAsyncData(`product-${route.params.id}`, () =>
    $fetch(`${apiBase}/api/show-product/${route.params.id}`)
);

const cart = useCartStore();
function addToCart(product) {
  cart.addItem(product);
  console.log(product, " is added");
}

// Selected image logic
const selectedImage = ref("");

watchEffect(() => {
  if (product.value?.images?.length) {
    selectedImage.value = product.value.images[0].image_url;
  }
});
</script>
