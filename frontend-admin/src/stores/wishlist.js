import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const WISHLIST_STORAGE_KEY = 'jd_wishlist_items'

const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (e) {
    console.error('读取收藏数据失败:', e)
  }
  return []
}

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('保存收藏数据失败:', e)
  }
}

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref(loadWishlistFromStorage())

  watch(
    wishlistItems,
    (newItems) => {
      saveWishlistToStorage(newItems)
    },
    { deep: true }
  )

  const wishlistCount = computed(() => {
    return wishlistItems.value.length
  })

  const isInWishlist = (productId) => {
    return wishlistItems.value.some(item => item.id === productId)
  }

  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      wishlistItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      })
    }
  }

  const removeFromWishlist = (productId) => {
    const index = wishlistItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    }
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      return false
    } else {
      addToWishlist(product)
      return true
    }
  }

  const clearWishlist = () => {
    wishlistItems.value = []
  }

  return {
    wishlistItems,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
  }
})
