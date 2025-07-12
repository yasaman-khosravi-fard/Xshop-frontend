<template>
  <div class="max-w-7xl mx-auto px-4">
  <div class="min-h-screen bg-white text-gray-800">
    <!-- Navbar -->


    <!-- Search Bar (preserved and working) -->
    <div class="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 mb-6 px-6">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
          @click="applySearch"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Find
      </button>
    </div>

    <div v-if="filteredProducts"
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


    <!-- Products by Category (filtered by search query) -->
    <div v-if="types.length && products.length" class="space-y-12 mt-8 px-6">
      <div
          v-for="(productGroup, index) in products"
          :key="types[index]"

      >
        <h2 class="text-2xl font-bold mb-4 capitalize">{{ types[index].type }}</h2>

        <div
            :id="`carousel-${types[index]}`"
            class="overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
            ref="carousel"
        >          <div v-if="productGroup.length" class="flex space-x-4">
            <NuxtLink
                v-for="product in productGroup"
                :key="product.id"
                :to="`/products/${product.id}`"
                class="w-64 bg-white shadow rounded-lg flex-shrink-0">

          <!--                class="w-72 bg-white shadow rounded-lg overflow-hidden flex-shrink-0 transition hover:shadow-lg">-->

              <img
                  v-if="product.images && product.images.length"
                  :src="apiBase + product.images[0].image_url"
                  alt="Product Image"
                  class="h-40 w-full object-cover rounded"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold truncate">{{ product.title }}</h3>
                <p class="text-gray-500 text-sm mt-1 line-clamp-2">{{ product.description }}</p>
                <p class="text-blue-600 font-bold mt-2">{{ product.price }} Toman</p>
                <button
                    @click.prevent="addToCart(product)"
                    class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>


    <div v-else class="text-center py-20">
      <p>Loading products...</p>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
const {
  public: { apiBase },
} = useRuntimeConfig();
const groupedProducts = ref(null)
const types = ref([]);
const products = ref([]);


  onMounted(async () => {
    try {
      const typeResponse = await $fetch(`${apiBase}/api/get-types`);
      types.value = typeResponse.types;
      console.log(typeResponse.types)

      // Fetch products for each type
      const productFetches = types.value.map(async (type) => {
        try {
          const res = await $fetch(`${apiBase}/api/get-products-categorized/${type.type}`);
          return res; // return products for this type
        } catch (err) {
          console.error(`Failed to load products for type ${type}:`, err);
          return []; // fallback empty array
        }
      });

      products.value = await Promise.all(productFetches); // 2D array
      console.log('products' , products.value)

    } catch (error) {
      console.error("Failed to load types", error);
    }
  });




import { useCartStore } from "@/stores/cartStore";
const cart = useCartStore();

function addToCart(product) {
  cart.addItem(product);
  console.log(product, " is added");
}


// Search query input
const searchQuery = ref("");

// Filtered list to display
const filteredProducts = ref([]);
const { data: productsRaw } = await useFetch(`${apiBase}/api/products`);

function applySearch() {
  if (!searchQuery.value) {
    filteredProducts.value = productsRaw.value;
  } else {
    filteredProducts.value = productsRaw.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
}



//animation of carousel
const carousel = ref(null);

onMounted(() => {
  const interval = setInterval(() => {
    if (carousel.value) {
      // Scroll by the width of one item (e.g., 300px)
      carousel.value.scrollBy({ left: 300, behavior: 'smooth' });

      // Optional: loop back to start if scrolled near end
      const maxScroll = carousel.value.scrollWidth - carousel.value.clientWidth;
      if (carousel.value.scrollLeft >= maxScroll - 10) {
        setTimeout(() => {
          carousel.value.scrollTo({ left: 0, behavior: 'smooth' });
        }, 600); // let it finish scrolling before snapping back
      }
    }
  }, 5000); // every 5 seconds

  onUnmounted(() => clearInterval(interval));
});

</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
