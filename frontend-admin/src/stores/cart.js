import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// localStorage key
const CART_STORAGE_KEY = 'jd_cart_items'

// 从 localStorage 读取购物车数据
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 验证数据格式
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (e) {
    console.error('读取购物车数据失败:', e)
  }
  return []
}

// 保存购物车数据到 localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('保存购物车数据失败:', e)
  }
}

export const useCartStore = defineStore('cart', () => {
  // 从 localStorage 初始化购物车数据
  const cartItems = ref(loadCartFromStorage())

  // 监听购物车变化，自动保存到 localStorage
  watch(
    cartItems,
    (newItems) => {
      saveCartToStorage(newItems)
    },
    { deep: true }
  )

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
