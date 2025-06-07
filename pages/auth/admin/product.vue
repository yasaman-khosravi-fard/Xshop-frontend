<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold mb-6">Add New Product</h1>

    <form @submit.prevent="submitProduct" class="bg-white shadow-md rounded p-6 max-w-2xl space-y-4">
      <!-- Product Fields -->
      <div>
        <label class="block font-semibold mb-1">Product Name</label>
        <input v-model="productName" type="text" placeholder="Enter product name"
               class="w-full border px-4 py-2 rounded" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Description</label>
        <textarea v-model="description" rows="4" placeholder="Enter product description"
                  class="w-full border px-4 py-2 rounded"></textarea>
      </div>

      <div>
        <label class="block font-semibold mb-1">Price ($)</label>
        <input v-model="price" type="number" placeholder="Enter product price"
               class="w-full border px-4 py-2 rounded" />
      </div>

      <!-- Images -->
      <div>
        <label class="block font-semibold mb-1">Images (Max 3)</label>
        <input type="file" accept="image/*" multiple @change="handleFilesChange"
               class="w-full border px-4 py-2 rounded bg-white" />

        <p v-if="imageError" class="text-red-500 text-sm mt-1">{{ imageError }}</p>

        <div class="mt-2 flex flex-wrap gap-2">
          <div v-for="(img, index) in previewImages" :key="index" class="w-20 h-20 border rounded overflow-hidden">
            <img :src="img" class="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Add Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
    const { public : { apiBase } } = useRuntimeConfig();

const productName = ref('')
const description = ref('')
const price = ref('')
const images = ref([])
const previewImages = ref([])
const imageError = ref('')

const handleFilesChange = (event) => {
  const selected = Array.from(event.target.files)

  if (selected.length > 3) {
    imageError.value = 'You can select up to 3 images only.'
    images.value = []
    previewImages.value = []
    return
  }

  imageError.value = ''
  images.value = selected
  previewImages.value = selected.map(file => URL.createObjectURL(file))
}

const submitProduct = async () => {
  const formData = new FormData()
  formData.append('title', productName.value)
  formData.append('description', description.value)
  formData.append('price', price.value)

  images.value.forEach((file) => {
    formData.append('images[]', file)
  })

  try {
    await $fetch(`${apiBase}/api/add-product`, {
      method: 'POST',
      body: formData
    })

    alert('Product added successfully!')
    // Reset form
    productName.value = ''
    description.value = ''
    price.value = ''
    images.value = []
    previewImages.value = []
  } catch (error) {
    console.error(error)
    alert('Failed to add product.')
  }
}
</script>
