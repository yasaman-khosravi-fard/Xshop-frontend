<template>
  <div class="container mx-auto px-4 py-20">
    <div v-if="errors.length > 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <ul class="mb-0 list-disc list-inside">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
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
        <!-- Toggle Edit Mode -->
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">
            {{ isEditing ? "Edit Product" : "Product Details" }}
          </h1>
          <button
              @click="isEditing = !isEditing"
              class="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            {{ isEditing ? "Cancel" : "Edit Product" }}
          </button>
          <button
              @click="handleDelete"
              class="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
          >
            Delete Product
          </button>
        </div>

        <!-- Editable Fields -->
        <div v-if="isEditing" class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Title</label>
            <input
                v-model="form.title"
                class="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block text-sm font-medium">Description</label>
            <textarea
                v-model="form.description"
                rows="4"
                class="w-full border border-gray-300 px-3 py-2 rounded"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium">Price</label>
            <input
                v-model="form.price"
                type="number"
                class="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block text-sm font-medium">Stock Quantity</label>
            <input
                v-model="form.quantity"
                type="number"
                class="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
          <button
              @click="updateProduct"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>


        </div>

        <!-- Read-Only Product Info -->
        <div v-else>
          <p class="text-gray-600 mb-2">
            <strong>Title:</strong> {{ product.title }}
          </p>
          <p class="text-gray-600 mb-2">
            <strong>Description:</strong> {{ product.description }}
          </p>
          <p class="text-xl text-blue-600 font-semibold mb-2">
            Price: {{ product.price }}
          </p>
          <p class="text-xl text-blue-600 font-semibold mb-2">
            Stock: {{ product.quantity }}
          </p>
        </div>
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

// Fetch product
const { data: product } = await useAsyncData(`product-${route.params.id}`, () =>
    $fetch(`${apiBase}/api/show-product/${route.params.id}`)
);

import { useRouter } from "vue-router";
const router = useRouter();
const errors = ref([]);

async function handleDelete() {
  const confirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

  if (!confirmed) return;

  try {
    await $fetch(`${apiBase}/api/delete-product/${route.params.id}`, {
      method: "DELETE",
    });

    alert("Product deleted successfully.");
    router.push("/auth/admin/product"); // Redirect to shop or products list
  } catch (error) {
    console.error("Failed to delete product:", error);
    alert("Something went wrong while deleting the product.");
  }
}


// Image logic
const selectedImage = ref("");
watchEffect(() => {
  if (product.value?.images?.length) {
    selectedImage.value = product.value.images[0].image_url;
  }
});

// Cart (if needed)
const cart = useCartStore();
function addToCart(product) {
  cart.addItem(product);
  console.log(product, " is added");
}

// --- Edit Mode ---
const isEditing = ref(false);
const form = ref({
  title: "",
  description: "",
  price: 0,
  quantity: 0,
});

// Sync form with fetched product data
watchEffect(() => {
  if (product.value) {
    form.value.title = product.value.title;
    form.value.description = product.value.description;
    form.value.price = product.value.price;
    form.value.quantity = product.value.quantity;
  }
});

async function updateProduct() {
  try {
    const response = await $fetch(`${apiBase}/api/update-product/${route.params.id}`, {
      method: "PUT",
      body: {
        title: form.value.title,
        description: form.value.description,
        price: form.value.price,
        quantity: form.value.quantity,
      },
    });

    console.log("Product updated:", response);
    isEditing.value = false;

    product.value = { ...product.value, ...form.value };
  } catch (error) {
    errors.value = Object.values(error.data).flat();
    console.log(errors.value);
  }
}
</script>
