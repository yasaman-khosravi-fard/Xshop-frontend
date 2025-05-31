<template>
  <div>
    <!-- Navbar -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">MyShop</h1>
        <nav class="space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-500">Home</NuxtLink>
          <NuxtLink to="/shop" class="text-gray-700 hover:text-blue-500">Shop</NuxtLink>
          <NuxtLink to="/about" class="text-blue-600 font-semibold">About</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500">Contact</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- About Hero -->
    <section class="bg-gray-100 py-16 text-center">
      <h2 class="text-4xl font-bold mb-4">About MyShop</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Learn more about who we are, what we do, and why we care about giving you the best products.
      </p>
    </section>

    <!-- Company Info -->
    <section class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4">Our Mission</h3>
          <p class="text-gray-700">
            At MyShop, our mission is to provide high-quality, affordable products to our customers with exceptional customer service.
          </p>
        </div>
        <div>
          <h3 class="text-2xl font-semibold mb-4">Our Values</h3>
          <ul class="list-disc pl-5 text-gray-700 space-y-2">
            <li>Customer Satisfaction</li>
            <li>Honesty and Transparency</li>
            <li>Quality Assurance</li>
            <li>Community Engagement</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="bg-gray-50 py-12">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl font-semibold mb-6">Meet Our Team</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="h-32 w-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
            <h4 class="font-bold">Jane Doe</h4>
            <p class="text-gray-600 text-sm">CEO & Founder</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="h-32 w-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
            <h4 class="font-bold">John Smith</h4>
            <p class="text-gray-600 text-sm">CTO</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="h-32 w-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
            <h4 class="font-bold">Sara Lee</h4>
            <p class="text-gray-600 text-sm">Head of Marketing</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6 mt-12">
      <div class="container mx-auto px-4 text-center">
        &copy; 2025 MyShop. All rights reserved.
      </div>
    </footer>
  </div>
</template>
