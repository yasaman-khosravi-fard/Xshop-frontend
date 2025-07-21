<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h1 class="text-3xl font-bold text-center text-gray-800">Create Account</h1>

      <form @submit.prevent="registerUser" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Name -->
          <div class="flex flex-col">
            <label for="name" class="text-sm font-medium text-gray-700">First Name</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                  v-model="form.name"
                  id="name"
                  type="text"
                  required
                  placeholder="John"
                  class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <!-- Lastname -->
          <div class="flex flex-col">
            <label for="lastname" class="text-sm font-medium text-gray-700">Last Name</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                  v-model="form.lastname"
                  id="lastname"
                  type="text"
                  required
                  placeholder="Doe"
                  class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="text-sm font-medium text-gray-700">Address</label>
          <div class="relative">
            <Home class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                v-model="form.address"
                id="address"
                type="text"
                required
                placeholder="123 Main St"
                class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="text-sm font-medium text-gray-700">Phone</label>
          <div class="relative">
            <Phone class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                v-model="form.phone"
                id="phone"
                type="tel"
                required
                placeholder="09XXXXXXXXX"
                class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="text-sm font-medium text-gray-700">Email</label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                v-model="form.email"
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                v-model="form.password"
                id="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full border border-gray-300 rounded-lg px-10 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Sign Up
        </button>

        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="text-blue-600 hover:underline">Login here</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRuntimeConfig } from "#app"
import { User, Mail, Lock, Phone, Home } from "lucide-vue-next"

const form = ref({
  name: "",
  lastname: "",
  address: "",
  phone: "",
  email: "",
  password: ""
})

const { public: { apiBase } } = useRuntimeConfig()

const registerUser = async () => {
  try {
    await $fetch(`${apiBase}/api/register`, {
      method: "POST",
      body: form.value,
    })
    alert("✅ Registration successful!")
    navigateTo("/login")
  } catch (error) {
    console.error(error)
    alert("❌ Registration failed. Please check your inputs.")
  }
}
</script>
