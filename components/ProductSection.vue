<template>
  <section class="p-6">
    <h2 class="text-2xl font-semibold mb-4">{{ title }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>