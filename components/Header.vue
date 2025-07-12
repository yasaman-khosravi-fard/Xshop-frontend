<template>
  <div>
    <!-- Navbar -->
    <header class="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-xl font-bold">XShop</h1>

        <nav class="flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-500"
            >Home</NuxtLink
          >
          <NuxtLink to="/about" class="text-gray-700 hover:text-blue-500"
            >About</NuxtLink
          >
          <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500"
            >Contact</NuxtLink
          >

          <!-- Cart Icon with Badge -->
          <NuxtLink
              v-if="!isAdminRoute"
            to="/cart"
            class="relative text-gray-700 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5h11.8M7 13L5.4 7M16 16a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>

            <!-- Badge -->
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";

const cart = useCartStore();

// Derived cart item count (you can sum quantities or use length)
const cartCount = computed(() =>
  cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isAdminRoute = computed(() => route.path.includes("/admin"));
</script>
