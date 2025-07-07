<template>
  <div class="container mx-auto px-4 py-20 max-w-3xl">
    <h1 class="text-3xl font-bold mb-6 text-center">Contact Us</h1>
    <p class="text-gray-600 mb-10 text-center">
      We'd love to hear from you. Please fill out the form below.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
            v-model="form.message"
            id="message"
            rows="5"
            class="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </div>

      <!-- Success Message -->
      <p v-if="submitted" class="text-green-600 text-center mt-4">Thank you! Your message has been sent.</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)

function handleSubmit() {
  // You can send form data to your backend API or email service here
  console.log("Form submitted:", form)

  // Clear the form and show success message
  submitted.value = true
  form.name = ''
  form.email = ''
  form.message = ''

  // Hide success message after 5 seconds
  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>
