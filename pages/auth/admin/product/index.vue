<!-- pages/admin/products.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">All Products</h1>

    <!-- Filter + Search Bar -->
    <div
      class="flex flex-col md:flex-row items-center justify-between mb-4 gap-4"
    >
      <div>
        <select v-model="filterStatus" class="border rounded p-2">
          <option value="">All</option>
          <option value="in-stock">In Stock</option>
          <option value="sold-out">Sold Out</option>
        </select>
      </div>
      <div>
        <input
          v-model="search"
          placeholder="Search by title..."
          class="border rounded p-2"
        />
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-x-auto">
      <table class="w-full border text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 border">Image</th>
            <th class="p-3 border">Title</th>
            <th class="p-3 border">Price</th>
            <th class="p-3 border">Stock</th>
            <th class="p-3 border">Status</th>
            <th class="p-3 border">Created</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="hover:bg-gray-100 cursor-pointer transition">
<!--            @click="goToProduct(product.id)"-->

            <td class="p-3 border">
              <img
                v-if="product.images && product.images.length"
                :src="apiBase + product.images[0].image_url"
                alt="Product Image"
                class="h-12 w-12 object-cover rounded"
              />
            </td>
            <td class="p-3 border">{{ product.title }}</td>
            <td class="p-3 border">${{ product.price }}</td>
            <td class="p-3 border">{{ product.quantity }}</td>
            <td class="p-3 border">
              <span
                :class="
                  product.quantity === 0
                    ? 'text-red-600 font-semibold'
                    : 'text-green-600 font-semibold'
                "
              >
                {{ product.quantity === 0 ? "Sold Out" : "In Stock" }}
              </span>
            </td>
            <td class="p-3 border">{{ formatDate(product.created_at) }}</td>
            <td class="p-3 border space-x-2">
              <NuxtLink
                :to="`/auth/admin/product/update/${product.id}`"
                class="text-blue-600 hover:underline"
                >update</NuxtLink
              >
              <NuxtLink
                  :to="`/auth/admin/product/view/${product.id}`"
                  class="text-blue-600 hover:underline"
              >preview</NuxtLink
              >
              <button class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="filteredProducts.length === 0"
        class="text-center text-gray-500 p-4"
      >
        No products found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

//api call later
const allProducts = ref([]);

const {
  public: { apiBase },
} = useRuntimeConfig();

// Full product list
const { data: products } = await useFetch(`${apiBase}/api/products`);
// allProducts = products;
const search = ref("");
const filterStatus = ref("");

// Filtering Logic
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchesFilter =
      filterStatus.value === ""
        ? true
        : filterStatus.value === "sold-out"
        ? product.quantity === 0
        : product.quantity > 0;
    return matchesSearch && matchesFilter;
  });
});

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const router = useRouter();

// function goToProduct(productId) {
//   router.push(`/auth/admin/product/view/${productId}`);
// }
</script>
