<template>
  <div class="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
    <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-medium">{{ product.name }}</h3>
      <p class="text-sm text-gray-600">{{ product.description }}</p>
      <p class="mt-2 font-bold text-primary">${{ product.price }}</p>
    </div>
  </div>
</template>