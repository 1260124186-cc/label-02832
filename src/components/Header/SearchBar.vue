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
            @click.prevent="searchKeyword = word"
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
              @click.prevent="searchKeyword = item"
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
import { ref } from 'vue'
import { Search, ShoppingCart, ShoppingCartFull, Close } from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const searchKeyword = ref('')
const showHistory = ref(false)
const searchHistory = ref(['iPhone 15', '笔记本电脑', '机械键盘'])
const hotWords = ref(['iPhone 15', '华为Mate60', '笔记本', '空调', '冰箱', '洗衣机'])

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    // 添加到搜索历史
    if (!searchHistory.value.includes(searchKeyword.value)) {
      searchHistory.value.unshift(searchKeyword.value)
      if (searchHistory.value.length > 10) {
        searchHistory.value.pop()
      }
    }
    showHistory.value = false
    showDevelopingToast()
  }
}

const clearHistory = () => {
  searchHistory.value = []
}

const handleClick = () => {
  showDevelopingToast()
}
</script>

<style lang="scss" scoped>
.search-bar {
  background: $color-white;
  padding: $spacing-md 0;
  
  .container {
    display: flex;
    align-items: center;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
}

// Logo样式
.logo {
  flex-shrink: 0;
  margin-right: $spacing-xl;
  
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
    }
    
    .logo-slogan {
      font-size: $font-size-lg;
      color: $jd-red;
      margin-left: $spacing-xs;
      font-weight: $font-weight-medium;
    }
  }
}

// 搜索框样式
.search-box {
  flex: 1;
  position: relative;
  max-width: 550px;
  
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
      
      .el-icon {
        margin-right: 4px;
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
    
    a {
      display: inline-block;
      margin-right: $spacing-md;
      font-size: $font-size-xs;
      color: $color-text-secondary;
      
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
    
    .el-icon {
      font-size: 18px;
      margin-right: $spacing-xs;
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
    
    .cart-empty {
      padding: $spacing-xl;
      text-align: center;
      
      .empty-icon {
        font-size: 48px;
        color: $color-text-placeholder;
        margin-bottom: $spacing-md;
      }
      
      p {
        font-size: $font-size-sm;
        color: $color-text-secondary;
      }
    }
    
    .cart-list {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      border-bottom: 1px solid $border-light;
      
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
        
        &:hover {
          color: $jd-red;
        }
      }
    }
    
    .cart-footer {
      @include flex-between;
      padding: $spacing-md;
      background: $bg-primary;
      
      .total {
        font-size: $font-size-xs;
        color: $color-text-secondary;
      }
      
      .total-price {
        color: $jd-red;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
      }
      
      .checkout-btn {
        padding: $spacing-sm $spacing-md;
        background: $jd-red;
        color: $color-white;
        border: none;
        border-radius: $radius-md;
        cursor: pointer;
        transition: background $transition-fast;
        
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
