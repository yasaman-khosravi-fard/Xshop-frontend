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

<!--              <td class="p-3 border">-->
                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                      :to="`/auth/admin/product/update/${product.id}`"
                      class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow transition"
                  >
                    Update
                  </NuxtLink>

                  <button
                      @click="handleDelete(product.id)"
                      class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow transition"
                  >
                    Delete
                  </button>

                  <span class="inline-flex items-center gap-2">
    <label class="relative inline-flex items-center cursor-pointer">
      <input
          type="checkbox"
          class="sr-only peer"
          :checked="product.quantity > 0"
          @change="toggleAvailability(product)"
      />
      <span
          class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"
      ></span>
      <span
          class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-full transition-transform duration-300"
      ></span>
    </label>
    <span
        class="text-xs font-medium"
        :class="product.status > 0 ? 'text-green-600' : 'text-red-600'"
    >
      {{ product.status > 0 ? 'available' : 'unavailable' }}
    </span>
  </span>
                </div>
<!--              </td>-->


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


// function goToProduct(productId) {
//   router.push(`/auth/admin/product/view/${productId}`);
// }


import { useRoute , useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
async function handleDelete(id) {
  const confirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

  if (!confirmed) return;

  try {
    await $fetch(`${apiBase}/api/delete-product/${id}`, {
      method: "DELETE",
    });

    alert("Product deleted successfully.");
    router.go(0)
  } catch (error) {
    console.error("Failed to delete product:", error);

    alert("Something went wrong while deleting the product.");
  }
}


async function toggleAvailability(id) {

  console.log("change availability")
  // try {
  //   await $fetch(`${apiBase}/api/update-product-availability/${id}`, {
  //     method: "PUT",
  //     body: { quantity: newQuantity },
  //   });
  //
  //   // Update local state
  //   product.quantity = newQuantity;
  // } catch (error) {
  //   console.error("Failed to update availability:", error);
  //   alert("Error updating availability");
  // }
}
</script>
