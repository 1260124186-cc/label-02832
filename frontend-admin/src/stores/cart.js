import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const cartCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.qty, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  })

  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.qty += 1
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      })
    }
  }

  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart
  }
})
