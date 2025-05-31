<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold mb-6">Your Profile</h1>
    <div class="bg-white p-6 shadow rounded-lg max-w-lg">
      <p><span class="font-semibold">Name:</span> John Doe</p>
      <p><span class="font-semibold">Email:</span> john@example.com</p>
      <p class="mt-4"><NuxtLink to="/orders" class="text-blue-600 underline">View Order History</NuxtLink></p>
    </div>
  </div>
</template>
