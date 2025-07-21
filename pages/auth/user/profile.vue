<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-md md:flex">
      <!-- Sidebar Navigation -->
      <aside class="md:w-1/4 border-r p-6 space-y-4 bg-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">Account</h2>
        <nav class="space-y-2">
          <button :class="tabClass('orders')" @click="activeTab = 'orders'">🧾 My Orders</button>
          <button :class="tabClass('info')" @click="activeTab = 'info'">👤 Personal Info</button>
          <button class="text-red-600 hover:underline mt-6" @click="logout">🚪 Logout</button>
        </nav>
      </aside>

      <!-- Main Content -->
      <section class="flex-1 p-6">
        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'">
          <h3 class="text-2xl font-semibold mb-4">My Orders</h3>
          <div v-if="orders.length">
            <div
                v-for="order in orders"
                :key="order.id"
                class="border rounded-md p-4 mb-3"
            >
              <p><strong>ID:</strong> {{ order.id }}</p>
              <p><strong>Status:</strong> {{ order.status }}</p>
              <p><strong>Date:</strong> {{ order.date }}</p>
              <p><strong>Total:</strong> ${{ order.total }}</p>
            </div>
          </div>
          <div v-else class="text-gray-500">You have no orders yet.</div>
        </div>

        <!-- Personal Info Tab -->
        <div v-if="activeTab === 'info'">
          <h3 class="text-2xl font-semibold mb-4">Personal Information</h3>
          <form @submit.prevent="updateProfile" class="space-y-4 max-w-lg">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="user.name" type="text" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="user.email" type="email" class="input" disabled />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input v-model="user.phone" type="tel" class="input" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <textarea v-model="user.address" class="input" rows="3" />
            </div>
            <button class="btn-primary" type="submit">Update</button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('orders');

// Example orders – you should replace this with actual API data
const orders = ref([
  { id: 'ORD123', status: 'Delivered', date: '2025-07-10', total: 99.99 },
  { id: 'ORD124', status: 'Processing', date: '2025-07-14', total: 45.5 },
]);

// Example user – should come from auth/user store or API
const user = ref({
  name: 'Yasaman K.',
  email: 'yasaman@example.com',
  phone: '09123456789',
  address: '123 Nuxt Street, Tehran',
});

const logout = () => {
  alert('Logging out...');
  // Implement logout logic or redirect
};

const updateProfile = () => {
  alert('Profile updated!');
  // Replace with actual backend call to save changes
};

const tabClass = (tab) =>
    `w-full text-left px-3 py-2 rounded-md transition font-medium ${
        activeTab.value === tab
            ? 'bg-white text-blue-600 shadow'
            : 'hover:bg-white hover:text-blue-600 text-gray-700'
    }`;
</script>

<!--<style scoped>-->
<!--.input {-->
<!--  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500;-->
<!--}-->
<!--.btn-primary {-->
<!--  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700;-->
<!--}-->
<!--</style>-->
