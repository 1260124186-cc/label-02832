import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// localStorage key
const FAVORITES_STORAGE_KEY = 'jd_favorites_items'

// 从 localStorage 读取收藏数据
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // 验证数据格式
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (e) {
    console.error('读取收藏数据失败:', e)
  }
  return []
}

// 保存收藏数据到 localStorage
const saveFavoritesToStorage = (items) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('保存收藏数据失败:', e)
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  // 从 localStorage 初始化收藏数据
  const favoriteItems = ref(loadFavoritesFromStorage())

  // 监听收藏变化，自动保存到 localStorage
  watch(
    favoriteItems,
    (newItems) => {
      saveFavoritesToStorage(newItems)
    },
    { deep: true }
  )

  // 检查产品是否已收藏
  const isFavorite = (productId) => {
    return favoriteItems.value.some(item => item.id === productId)
  }

  // 添加到收藏
  const addToFavorites = (product) => {
    if (!isFavorite(product.id)) {
      favoriteItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      })
    }
  }

  // 从收藏中移除
  const removeFromFavorites = (productId) => {
    const index = favoriteItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      favoriteItems.value.splice(index, 1)
    }
  }

  // 切换收藏状态
  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  // 清空收藏
  const clearFavorites = () => {
    favoriteItems.value = []
  }

  return {
    favoriteItems,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites
  }
})
