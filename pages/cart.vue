<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>

    <div v-if="cartItems.length === 0" class="text-gray-600">
      Your cart is empty.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-col md:flex-row items-center border-b pb-4 gap-4"
      >
        <img
          v-if="item.images && item.images.length"
          :src="apiBase + item.images[0].image_url"
          alt="Product Image"
          class="w-24 h-24 object-cover rounded-md"
        />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">{{ item.name }}</h2>
          <p class="text-gray-600">Price: {{ formatPrice(item.price) }}</p>

          <div class="flex items-center mt-2 gap-2">
            <button
              @click="decreaseQty(item.id)"
              class="px-2 py-1 border rounded"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button
              @click="increaseQty(item.id)"
              class="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        <div class="text-right">
          <p class="text-lg font-bold">
            {{ formatPrice(item.price * item.quantity) }}
          </p>
          <button
            @click="removeItem(item.id)"
            class="text-red-600 mt-2 text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="mt-8 border-t pt-4 text-right">
        <p class="text-xl font-bold">Total: {{ formatPrice(totalPrice) }}</p>
        <button
          @click="goToCheckout"
          class="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase },
} = useRuntimeConfig();
import { useCartStore } from "~/stores/cartStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);

const formatPrice = (price) => `$${price}`;
const increaseQty = (id) => cartStore.increaseQuantity(id);
const decreaseQty = (id) => cartStore.decreaseQuantity(id);
const removeItem = (id) => cartStore.removeItem(id);
const totalPrice = computed(() => cartStore.total);

const goToCheckout = () => {
  if (!cartStore.isAuthenticated) {
    router.push("/login");
  } else {
    router.push("/checkout");
  }
};
</script>

<style scoped>
.container {
  max-width: 960px;
}
</style>
