<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Transactions</h1>

    <!-- Filter/Search (optional, can be expanded later) -->
    <div class="mb-4 flex flex-col md:flex-row justify-between gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by user or status..."
        class="border rounded px-3 py-2 w-full md:w-1/3"
      />
    </div>

    <!-- Transactions Table -->
    <div class="overflow-x-auto">
      <table class="w-full border text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 border">Transaction ID</th>
            <th class="p-3 border">User</th>
            <th class="p-3 border">Total Amount</th>
            <th class="p-3 border">Status</th>
            <th class="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="hover:bg-gray-50"
          >
            <td class="p-3 border">{{ transaction.id }}</td>
            <td class="p-3 border">{{ transaction.user_name }}</td>
            <td class="p-3 border">${{ transaction.total.toFixed(2) }}</td>
            <td class="p-3 border">
              <span
                :class="[
                  'font-semibold',
                  transaction.status === 'Completed' ? 'text-green-600' :
                  transaction.status === 'Pending' ? 'text-yellow-600' :
                  'text-red-600'
                ]"
              >
                {{ transaction.status }}
              </span>
            </td>
            <td class="p-3 border">{{ formatDate(transaction.created_at) }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredTransactions.length === 0" class="text-center text-gray-500 p-4">
        No transactions found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Replace this with a real API call
const transactions = ref([])

onMounted(() => {
  // Simulated transaction data
  transactions.value = [
    {
      id: 'TXN12345',
      user_name: 'John Doe',
      total: 129.99,
      status: 'Completed',
      created_at: '2025-06-20',
    },
    {
      id: 'TXN12346',
      user_name: 'Alice Smith',
      total: 89.5,
      status: 'Pending',
      created_at: '2025-06-24',
    },
    {
      id: 'TXN12347',
      user_name: 'Bob Johnson',
      total: 45.0,
      status: 'Failed',
      created_at: '2025-06-27',
    },
  ]
})

const searchQuery = ref('')

const filteredTransactions = computed(() => {
  return transactions.value.filter((t) => {
    return (
      t.user_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>
