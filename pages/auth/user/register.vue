<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
      <form>
        <input type="text" placeholder="Name" class="w-full mb-4 px-4 py-2 border rounded" />
        <input type="email" placeholder="Email" class="w-full mb-4 px-4 py-2 border rounded" />
        <input type="password" placeholder="Password" class="w-full mb-6 px-4 py-2 border rounded" />
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create Account</button>
      </form>
      <p class="mt-4 text-sm text-center">Already have an account? <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink></p>
    </div>
  </div>
</template>
