// stores/cartStore.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], // Each item: { id, name, price, image, quantity }
    isAuthenticated: false, // Optional: can sync with auth module
  }),
  persist: true,

  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    addItem(product , quantity) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ ...product, quantity: quantity });
      }
      this.saveToStorage();
    },

    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveToStorage();
    },

    increaseQuantity(id) {
      const item = this.items.find((item) => item.id === id);
      if (item) item.quantity++;
      this.saveToStorage();
    },

    decreaseQuantity(id) {
      const item = this.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeItem(id);
      }
      this.saveToStorage();
    },

    clearCart() {
      this.items = [];
      this.saveToStorage();
    },

    loadFromStorage() {
      if (process.client) {
        const data = localStorage.getItem("cart");
        if (data) this.items = JSON.parse(data);
      }
    },

    saveToStorage() {
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(this.items));
      }
    },
  },
});
