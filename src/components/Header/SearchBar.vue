<template>
  <div class="search-bar">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <a href="/">
          <div class="logo-img">
            <span class="logo-text">JD</span>
            <span class="logo-slogan">京东</span>
          </div>
        </a>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-box">
        <div class="search-input-wrap">
          <input 
            v-model="searchKeyword"
            type="text" 
            class="search-input" 
            placeholder="搜索商品"
            @keyup.enter="handleSearch"
            @focus="showHistory = true"
          />
          <button class="search-btn" @click="handleSearch">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </button>
        </div>
        
        <!-- 热门搜索 -->
        <div class="hot-words">
          <a 
            v-for="word in hotWords" 
            :key="word" 
            href="#"
            @click.prevent="selectHotWord(word)"
          >
            {{ word }}
          </a>
        </div>
        
        <!-- 搜索历史下拉 -->
        <div v-if="showHistory && searchHistory.length" class="search-history">
          <div class="history-header">
            <span>搜索历史</span>
            <a href="#" @click.prevent="clearHistory">清空</a>
          </div>
          <div class="history-list">
            <a 
              v-for="item in searchHistory" 
              :key="item" 
              href="#"
              @click.prevent="selectHistory(item)"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>
      
      <!-- 购物车 - 放在最右侧 -->
      <div class="cart">
        <a href="javascript:void(0)" class="cart-btn" @click="handleClick">
          <el-icon><ShoppingCart /></el-icon>
          <span>我的购物车</span>
          <span class="cart-count">{{ cartStore.cartCount }}</span>
        </a>
        
        <!-- 购物车悬浮层 -->
        <div class="cart-dropdown">
          <div v-if="cartStore.cartItems.length === 0" class="cart-empty">
            <el-icon class="empty-icon"><ShoppingCartFull /></el-icon>
            <p>购物车还是空的，快去挑选商品吧！</p>
          </div>
          <div v-else class="cart-list">
            <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" class="item-img" />
              <div class="item-info">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-price">
                  <span class="price">¥{{ item.price }}</span>
                  <span class="qty">x{{ item.qty }}</span>
                </p>
              </div>
              <el-icon class="item-delete" @click="cartStore.removeFromCart(item.id)"><Close /></el-icon>
            </div>
            <div class="cart-footer">
              <span class="total">共 {{ cartStore.cartCount }} 件商品</span>
              <span class="total-price">¥{{ cartStore.totalPrice }}</span>
              <button class="checkout-btn" @click="handleClick">去购物车结算</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, ShoppingCart, ShoppingCartFull, Close } from '@element-plus/icons-vue'
import { showDevelopingToast, showErrorToast } from '@/utils/toast'
import { useCartStore } from '@/stores/cart'
import { createLogger } from '@/utils/logger'

// 从 mock 数据导入
import { hotSearchWords, defaultSearchHistory } from '@/mock/banner'

// 创建日志记录器
const logger = createLogger('SearchBar')

// 搜索配置
const SEARCH_CONFIG = {
  minLength: 1,        // 最小搜索长度
  maxLength: 100,      // 最大搜索长度
  maxHistoryItems: 10  // 最大历史记录数
}

const cartStore = useCartStore()

const searchKeyword = ref('')
const showHistory = ref(false)
const searchError = ref('')

// 使用 mock 数据
const searchHistory = ref([...defaultSearchHistory])
const hotWords = ref(hotSearchWords)

// 输入校验
const validateSearchInput = (keyword) => {
  const trimmed = keyword.trim()
  
  // 空输入校验
  if (!trimmed) {
    return { valid: false, error: '请输入搜索关键词' }
  }
  
  // 长度校验
  if (trimmed.length < SEARCH_CONFIG.minLength) {
    return { valid: false, error: `搜索关键词至少需要${SEARCH_CONFIG.minLength}个字符` }
  }
  
  if (trimmed.length > SEARCH_CONFIG.maxLength) {
    return { valid: false, error: `搜索关键词不能超过${SEARCH_CONFIG.maxLength}个字符` }
  }
  
  // 特殊字符校验（可选，根据需求调整）
  const invalidChars = /[<>]/
  if (invalidChars.test(trimmed)) {
    return { valid: false, error: '搜索关键词包含非法字符' }
  }
  
  return { valid: true, error: '', value: trimmed }
}

// 计算属性：是否可以搜索
const canSearch = computed(() => {
  return searchKeyword.value.trim().length >= SEARCH_CONFIG.minLength
})

const handleSearch = () => {
  logger.debug('触发搜索', { keyword: searchKeyword.value })
  
  // 输入校验
  const validation = validateSearchInput(searchKeyword.value)
  
  if (!validation.valid) {
    logger.warn('搜索校验失败', { error: validation.error })
    searchError.value = validation.error
    showErrorToast(validation.error)
    return
  }
  
  // 清除错误状态
  searchError.value = ''
  const keyword = validation.value
  
  logger.info('执行搜索', { keyword })
  
  // 添加到搜索历史
  if (!searchHistory.value.includes(keyword)) {
    searchHistory.value.unshift(keyword)
    logger.debug('添加到搜索历史', { keyword })
    
    // 限制历史记录数量
    if (searchHistory.value.length > SEARCH_CONFIG.maxHistoryItems) {
      const removed = searchHistory.value.pop()
      logger.debug('移除旧的历史记录', { removed })
    }
  }
  
  showHistory.value = false
  showDevelopingToast()
}

// 选择热门搜索词
const selectHotWord = (word) => {
  logger.debug('选择热门搜索词', { word })
  searchKeyword.value = word
  searchError.value = ''
}

// 选择历史记录
const selectHistory = (item) => {
  logger.debug('选择历史记录', { item })
  searchKeyword.value = item
  searchError.value = ''
}

const clearHistory = () => {
  logger.info('清空搜索历史', { count: searchHistory.value.length })
  searchHistory.value = []
}

const handleClick = () => {
  showDevelopingToast()
}

// 组件初始化日志
logger.debug('SearchBar 组件初始化', { 
  hotWordsCount: hotWords.value.length,
  historyCount: searchHistory.value.length 
})
</script>

<style lang="scss" scoped>
.search-bar {
  background: $color-white;
  padding: $spacing-md 0;
  
  @include respond-to(sm) {
    padding: $spacing-sm 0;
  }
  
  .container {
    display: flex;
    align-items: center;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
    
    @include respond-to(sm) {
      padding: 0 $spacing-sm;
      flex-wrap: wrap;
    }
  }
}

// Logo样式
.logo {
  flex-shrink: 0;
  margin-right: $spacing-xl;
  
  @include respond-to(lg) {
    margin-right: $spacing-lg;
  }
  
  @include respond-to(md) {
    margin-right: $spacing-md;
  }
  
  @include respond-to(sm) {
    margin-right: $spacing-sm;
  }
  
  a {
    display: block;
  }
  
  .logo-img {
    display: flex;
    align-items: center;
    
    .logo-text {
      font-size: 36px;
      font-weight: $font-weight-bold;
      color: $jd-red;
      letter-spacing: -2px;
      
      @include respond-to(md) {
        font-size: 28px;
      }
      
      @include respond-to(sm) {
        font-size: 24px;
      }
    }
    
    .logo-slogan {
      font-size: $font-size-lg;
      color: $jd-red;
      margin-left: $spacing-xs;
      font-weight: $font-weight-medium;
      
      @include respond-to(md) {
        font-size: $font-size-base;
      }
      
      @include respond-to(sm) {
        display: none; // 小屏幕隐藏slogan
      }
    }
  }
}

// 搜索框样式
.search-box {
  flex: 1;
  position: relative;
  max-width: 550px;
  min-width: 0; // 防止flex子元素溢出
  
  @include respond-to(sm) {
    max-width: none;
    order: 3; // 移动端搜索框放到最后一行
    width: 100%;
    margin-top: $spacing-sm;
  }
  
  .search-input-wrap {
    display: flex;
    border: 2px solid $jd-red;
    border-radius: $radius-md;
    overflow: hidden;
    
    .search-input {
      flex: 1;
      height: 40px;
      padding: 0 $spacing-md;
      font-size: $font-size-base;
      border: none;
      outline: none;
      min-width: 0; // 允许收缩
      
      @include respond-to(md) {
        height: 36px;
        padding: 0 $spacing-sm;
        font-size: $font-size-sm;
      }
      
      &::placeholder {
        color: $color-text-placeholder;
      }
    }
    
    .search-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 40px;
      background: $jd-red;
      color: $color-white;
      border: none;
      cursor: pointer;
      transition: background $transition-fast;
      flex-shrink: 0;
      
      @include respond-to(md) {
        width: 60px;
        height: 36px;
        
        span {
          display: none; // 平板端只显示图标
        }
      }
      
      @include respond-to(sm) {
        width: 50px;
      }
      
      .el-icon {
        margin-right: 4px;
        
        @include respond-to(md) {
          margin-right: 0;
        }
      }
      
      &:hover {
        background: $jd-red-dark;
      }
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
  
  .hot-words {
    margin-top: $spacing-sm;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    @include respond-to(sm) {
      display: none; // 小屏幕隐藏热门搜索
    }
    
    a {
      display: inline-block;
      margin-right: $spacing-md;
      font-size: $font-size-xs;
      color: $color-text-secondary;
      
      @include respond-to(md) {
        margin-right: $spacing-sm;
      }
      
      &:hover {
        color: $jd-red;
      }
      
      &:first-child {
        color: $jd-red;
      }
    }
  }
  
  .search-history {
    position: absolute;
    top: 100%;
    left: 0;
    right: 80px;
    background: $color-white;
    border: 1px solid $border-light;
    border-top: none;
    box-shadow: $shadow-md;
    z-index: $z-index-dropdown;
    
    @include respond-to(md) {
      right: 60px;
    }
    
    @include respond-to(sm) {
      right: 50px;
    }
    
    .history-header {
      @include flex-between;
      padding: $spacing-sm $spacing-md;
      border-bottom: 1px solid $border-light;
      font-size: $font-size-xs;
      color: $color-text-placeholder;
      
      a {
        color: $jd-red;
      }
    }
    
    .history-list {
      padding: $spacing-sm;
      
      a {
        display: inline-block;
        padding: $spacing-xs $spacing-sm;
        margin: 2px;
        font-size: $font-size-xs;
        color: $color-text-secondary;
        background: $bg-primary;
        border-radius: $radius-sm;
        
        &:hover {
          color: $jd-red;
          background: rgba($jd-red, 0.1);
        }
      }
    }
  }
}

// 购物车样式 - 放到最右侧
.cart {
  position: relative;
  margin-left: auto; // 关键：使用auto推到最右侧
  flex-shrink: 0;
  
  @include respond-to(sm) {
    margin-left: $spacing-sm;
  }
  
  .cart-btn {
    display: flex;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $border-medium;
    border-radius: $radius-md;
    color: $jd-red;
    background: $color-white;
    transition: all $transition-fast;
    white-space: nowrap;
    
    @include respond-to(md) {
      padding: $spacing-xs $spacing-sm;
    }
    
    .el-icon {
      font-size: 18px;
      margin-right: $spacing-xs;
      
      @include respond-to(sm) {
        margin-right: 0;
      }
    }
    
    span:not(.cart-count) {
      @include respond-to(sm) {
        display: none; // 小屏幕隐藏文字
      }
    }
    
    .cart-count {
      margin-left: $spacing-sm;
      padding: 0 $spacing-sm;
      font-size: $font-size-xs;
      background: $jd-red;
      color: $color-white;
      border-radius: 10px;
      min-width: 20px;
      text-align: center;
      
      @include respond-to(sm) {
        margin-left: $spacing-xs;
        padding: 0 4px;
        min-width: 16px;
        font-size: 10px;
      }
    }
    
    &:hover {
      border-color: $jd-red;
      background: rgba($jd-red, 0.05);
    }
  }
  
  .cart-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    background: $color-white;
    border: 1px solid $border-light;
    box-shadow: $shadow-lg;
    z-index: $z-index-dropdown;
    
    @include respond-to(sm) {
      width: 280px;
      right: -$spacing-sm;
    }
    
    .cart-empty {
      padding: $spacing-xl;
      text-align: center;
      
      @include respond-to(sm) {
        padding: $spacing-lg;
      }
      
      .empty-icon {
        font-size: 48px;
        color: $color-text-placeholder;
        margin-bottom: $spacing-md;
        
        @include respond-to(sm) {
          font-size: 36px;
        }
      }
      
      p {
        font-size: $font-size-sm;
        color: $color-text-secondary;
        
        @include respond-to(sm) {
          font-size: $font-size-xs;
        }
      }
    }
    
    .cart-list {
      max-height: 400px;
      overflow-y: auto;
      
      @include respond-to(sm) {
        max-height: 300px;
      }
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      border-bottom: 1px solid $border-light;
      
      @include respond-to(sm) {
        padding: $spacing-xs $spacing-sm;
      }
      
      &:hover {
        background: $bg-primary;
        
        .item-delete {
          opacity: 1;
        }
      }
      
      .item-img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: $radius-sm;
        background: $bg-primary;
        
        @include respond-to(sm) {
          width: 50px;
          height: 50px;
        }
      }
      
      .item-info {
        flex: 1;
        margin-left: $spacing-sm;
        overflow: hidden;
        
        .item-name {
          font-size: $font-size-xs;
          color: $color-text-primary;
          @include ellipsis(2);
        }
        
        .item-price {
          margin-top: $spacing-xs;
          
          .price {
            color: $jd-red;
            font-weight: $font-weight-bold;
          }
          
          .qty {
            margin-left: $spacing-sm;
            color: $color-text-placeholder;
            font-size: $font-size-xs;
          }
        }
      }
      
      .item-delete {
        opacity: 0;
        color: $color-text-placeholder;
        cursor: pointer;
        transition: opacity $transition-fast;
        
        @include respond-to(sm) {
          opacity: 1; // 移动端始终显示删除按钮
        }
        
        &:hover {
          color: $jd-red;
        }
      }
    }
    
    .cart-footer {
      @include flex-between;
      padding: $spacing-md;
      background: $bg-primary;
      flex-wrap: wrap;
      gap: $spacing-xs;
      
      @include respond-to(sm) {
        padding: $spacing-sm;
      }
      
      .total {
        font-size: $font-size-xs;
        color: $color-text-secondary;
      }
      
      .total-price {
        color: $jd-red;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        
        @include respond-to(sm) {
          font-size: $font-size-base;
        }
      }
      
      .checkout-btn {
        padding: $spacing-sm $spacing-md;
        background: $jd-red;
        color: $color-white;
        border: none;
        border-radius: $radius-md;
        cursor: pointer;
        transition: background $transition-fast;
        
        @include respond-to(sm) {
          padding: $spacing-xs $spacing-sm;
          font-size: $font-size-xs;
        }
        
        &:hover {
          background: $jd-red-dark;
        }
      }
    }
  }
  
  &:hover {
    .cart-dropdown {
      display: block;
    }
  }
}
</style>
