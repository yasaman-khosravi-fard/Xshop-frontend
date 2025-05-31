<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form>
        <input type="email" placeholder="Email" class="w-full mb-4 px-4 py-2 border rounded" />
        <input type="password" placeholder="Password" class="w-full mb-6 px-4 py-2 border rounded" />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p class="mt-4 text-sm text-center">Don't have an account? <NuxtLink to="/register" class="text-blue-600">Register</NuxtLink></p>
    </div>
  </div>
</template>
