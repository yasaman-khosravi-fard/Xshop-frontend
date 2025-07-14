<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden md:flex">
      <!-- Sidebar -->
      <div class="w-full md:w-1/3 bg-gray-100 p-6 space-y-4">
        <h2 class="text-xl font-bold text-gray-800">My Account</h2>
        <ul class="space-y-2">
          <li>
            <button @click="activeTab = 'profile'" :class="tabClass('profile')">Profile</button>
          </li>
          <li>
            <button @click="activeTab = 'orders'" :class="tabClass('orders')">Orders</button>
          </li>
          <li>
            <button @click="activeTab = 'cart'" :class="tabClass('cart')">Cart</button>
          </li>
          <li>
            <button @click="logout" class="text-red-500 hover:underline">Logout</button>
          </li>
        </ul>
      </div>

      <!-- Main Content -->
      <div class="w-full md:w-2/3 p-6">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-4">
          <h3 class="text-lg font-semibold">Update Profile</h3>
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium">Full Name</label>
              <input v-model="form.name" type="text" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium">Email</label>
              <input v-model="form.email" type="email" class="input" disabled />
            </div>
            <div>
              <label class="block text-sm font-medium">Phone</label>
              <input v-model="form.phone" type="tel" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium">Address</label>
              <textarea v-model="form.address" rows="3" class="input"></textarea>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'">
          <h3 class="text-lg font-semibold mb-2">Your Orders</h3>
          <div v-if="orders.length">
            <div
                v-for="order in orders"
                :key="order.id"
                class="border p-4 rounded-md mb-3"
            >
              <p><strong>Order #:</strong> {{ order.id }}</p>
              <p><strong>Date:</strong> {{ order.date }}</p>
              <p><strong>Total:</strong> ${{ order.total }}</p>
              <p><strong>Status:</strong> {{ order.status }}</p>
            </div>
          </div>
          <div v-else class="text-gray-500">You have no orders.</div>
        </div>

        <!-- Cart Tab -->
        <div v-if="activeTab === 'cart'">
          <h3 class="text-lg font-semibold mb-2">Your Cart</h3>
          <div v-if="cart.length">
            <ul>
              <li
                  v-for="item in cart"
                  :key="item.id"
                  class="flex justify-between border-b py-2"
              >
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span>${{ item.price * item.quantity }}</span>
              </li>
            </ul>
          </div>
          <div v-else class="text-gray-500">Your cart is empty.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Active tab
const activeTab = ref("profile");

// Form data (from API)
const form = ref({
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  address: "123 Main Street",
});

// Dummy data for orders
const orders = ref([
  { id: 1, date: "2025-07-01", total: 99.99, status: "Delivered" },
  { id: 2, date: "2025-06-22", total: 49.5, status: "Pending" },
]);

// Dummy cart
const cart = ref([
  { id: 1, name: "Product A", quantity: 2, price: 25.0 },
  { id: 2, name: "Product B", quantity: 1, price: 49.99 },
]);

const saveProfile = () => {
  alert("Profile updated successfully!");
};

const logout = () => {
  alert("Logged out");
};

const tabClass = (tab) =>
    `w-full text-left px-3 py-2 rounded-md transition ${
        activeTab.value === tab
            ? "bg-white text-blue-600 font-semibold shadow"
            : "hover:bg-white hover:text-blue-600 text-gray-700"
    }`;
</script>

<!--<style scoped>-->
<!--.input {-->
<!--  @apply w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500;-->
<!--}-->
<!--.btn-primary {-->
<!--  @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md;-->
<!--}-->
<!--</style>-->
