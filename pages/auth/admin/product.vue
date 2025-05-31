<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold mb-6">Add New Product</h1>

    <form class="bg-white shadow-md rounded p-6 max-w-2xl space-y-4">
      <div>
        <label class="block font-semibold mb-1">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          class="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Description</label>
        <textarea
          rows="4"
          placeholder="Enter product description"
          class="w-full border px-4 py-2 rounded"
        ></textarea>
      </div>

      <div>
        <label class="block font-semibold mb-1">Price ($)</label>
        <input
          type="number"
          placeholder="Enter product price"
          class="w-full border px-4 py-2 rounded"
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Category</label>
        <select class="w-full border px-4 py-2 rounded">
          <option>Select a category</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
          <option>Home</option>
        </select>
      </div>

      <div>
        <label class="block font-semibold mb-1">Image</label>
        <input
          type="file"
          class="w-full border px-4 py-2 rounded bg-white"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  </div>
</template>
