<template>
  <div class="product-recommend">
    <div class="container">
      <!-- 区块标题 -->
      <div class="section-header">
        <div class="title">
          <el-icon class="icon"><Star /></el-icon>
          <span>为你推荐</span>
        </div>
        <div v-if="tabs.length > 0" class="tabs">
          <span 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            @click="switchTab(tab.id)"
          >
            {{ tab.name }}
          </span>
        </div>
        <a href="javascript:void(0)" class="more" @click="handleClick">
          查看更多
          <el-icon><ArrowRight /></el-icon>
        </a>
      </div>
      
      <!-- 商品列表 -->
      <div v-if="hasProducts" class="product-grid">
        <ProductCard 
          v-for="product in displayProducts" 
          :key="product.id"
          :product="product"
          @click="handleProductClick"
          @add-cart="handleAddCart"
          @collect="handleCollect"
        />
      </div>
      
      <!-- 商品为空时的占位 -->
      <div v-else class="product-empty">
        <el-icon :size="48"><Star /></el-icon>
        <p>暂无商品数据</p>
      </div>
      
      <!-- 加载更多（仅在有更多商品时显示） -->
      <div v-if="hasProducts" class="load-more">
        <button 
          v-if="hasMoreProducts"
          class="load-btn" 
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @click="loadMore"
        >
          <el-icon v-if="isLoading" class="is-loading"><Loading /></el-icon>
          <span>{{ isLoading ? '加载中...' : '查看更多商品' }}</span>
        </button>
        <span v-else class="no-more">已经到底啦~</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Star, ArrowRight, Loading } from '@element-plus/icons-vue'
import ProductCard from '@/components/common/ProductCard.vue'
import { showDevelopingToast } from '@/utils/toast'
import { createLogger } from '@/utils/logger'

// 从 mock 数据导入商品数据
import {
  productTabs,
  recommendProducts as mockRecommendProducts,
  newProducts as mockNewProducts,
  hotProducts as mockHotProducts,
  discountProducts as mockDiscountProducts
} from '@/mock/products'

// 创建日志记录器
const logger = createLogger('Product')

// 配置
const PRODUCT_CONFIG = {
  initialPageSize: 10,
  loadMoreCount: 5,
  loadingDelay: 1000  // 模拟加载延迟（毫秒）
}

const activeTab = ref('recommend')
const isLoading = ref(false)
const loadError = ref(false)
const pageSize = ref(PRODUCT_CONFIG.initialPageSize)

const handleClick = () => {
  showDevelopingToast()
}

// 初始化数据（带错误处理）
const initializeProducts = (data, name) => {
  if (!Array.isArray(data)) {
    logger.warn(`${name} 数据格式无效`, { type: typeof data })
    return []
  }
  logger.debug(`${name} 数据加载成功`, { count: data.length })
  return data
}

// 使用 mock 数据（带数据校验）
const tabs = ref(Array.isArray(productTabs) ? productTabs : [])
const recommendProducts = ref(initializeProducts(mockRecommendProducts, '推荐商品'))
const newProducts = ref(initializeProducts(mockNewProducts, '新品'))
const hotProducts = ref(initializeProducts(mockHotProducts, '热销商品'))
const discountProducts = ref(initializeProducts(mockDiscountProducts, '特惠商品'))

// 根据Tab切换展示不同商品
const currentProducts = computed(() => {
  const productMap = {
    recommend: recommendProducts.value,
    new: newProducts.value,
    hot: hotProducts.value,
    discount: discountProducts.value
  }
  
  const products = productMap[activeTab.value]
  
  // 边界检查
  if (!products || !Array.isArray(products)) {
    logger.warn('当前分类商品数据无效', { tab: activeTab.value })
    return []
  }
  
  return products
})

// 计算属性：显示的商品（带边界检查）
const displayProducts = computed(() => {
  const products = currentProducts.value
  
  if (products.length === 0) {
    return []
  }
  
  // 确保 pageSize 不超过实际商品数量
  const safePageSize = Math.min(pageSize.value, products.length)
  return products.slice(0, safePageSize)
})

// 计算属性：是否还有更多商品
const hasMoreProducts = computed(() => {
  return currentProducts.value.length > pageSize.value
})

// 计算属性：是否有商品
const hasProducts = computed(() => {
  return currentProducts.value.length > 0
})

// 切换 Tab
const switchTab = (tabId) => {
  if (activeTab.value === tabId) {
    logger.debug('已在当前 Tab', { tab: tabId })
    return
  }
  
  logger.info('切换商品分类', { from: activeTab.value, to: tabId })
  activeTab.value = tabId
  pageSize.value = PRODUCT_CONFIG.initialPageSize  // 重置分页
}

const loadMore = () => {
  if (isLoading.value) {
    logger.debug('正在加载中，跳过请求')
    return
  }
  
  if (!hasMoreProducts.value) {
    logger.debug('没有更多商品了')
    return
  }
  
  logger.info('加载更多商品', { currentPageSize: pageSize.value })
  isLoading.value = true
  loadError.value = false
  
  // 模拟加载延迟
  setTimeout(() => {
    try {
      pageSize.value += PRODUCT_CONFIG.loadMoreCount
      logger.debug('加载完成', { newPageSize: pageSize.value })
    } catch (error) {
      logger.error('加载更多失败', error)
      loadError.value = true
    } finally {
      isLoading.value = false
    }
  }, PRODUCT_CONFIG.loadingDelay)
}

// 监听 Tab 变化
watch(activeTab, (newTab, oldTab) => {
  logger.debug('Tab 变化', { from: oldTab, to: newTab, productCount: currentProducts.value.length })
})

// 组件初始化
onMounted(() => {
  logger.info('Product 组件挂载', {
    tabsCount: tabs.value.length,
    recommendCount: recommendProducts.value.length,
    newCount: newProducts.value.length,
    hotCount: hotProducts.value.length,
    discountCount: discountProducts.value.length
  })
})

const handleProductClick = (product) => {
  console.log('点击商品:', product.name)
}

const handleAddCart = (product) => {
  console.log('加入购物车:', product.name)
}

const handleCollect = (product) => {
  console.log('收藏商品:', product.name)
}
</script>

<style lang="scss" scoped>
.product-recommend {
  padding: $spacing-lg 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
}

// 区块标题
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: $spacing-lg;
  padding: $spacing-md $spacing-lg;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  
  .title {
    display: flex;
    align-items: center;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    
    .icon {
      margin-right: $spacing-sm;
      color: $jd-red;
    }
  }
  
  .tabs {
    display: flex;
    margin-left: $spacing-xl;
    
    .tab {
      padding: $spacing-xs $spacing-md;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      cursor: pointer;
      border-radius: $radius-md;
      transition: all $transition-fast;
      
      &:hover {
        color: $jd-red;
      }
      
      &.active {
        background: rgba($jd-red, 0.1);
        color: $jd-red;
        font-weight: $font-weight-medium;
      }
    }
  }
  
  .more {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    
    .el-icon {
      margin-left: 4px;
      font-size: 12px;
    }
    
    &:hover {
      color: $jd-red;
    }
  }
}

// 商品网格
.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $spacing-md;
  
  @include respond-to(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
  }
}

// 商品空状态
.product-empty {
  @include flex-center;
  flex-direction: column;
  padding: $spacing-xxl;
  background: $color-white;
  border-radius: $radius-lg;
  color: $color-text-placeholder;
  
  .el-icon {
    margin-bottom: $spacing-md;
    color: $border-medium;
  }
  
  p {
    font-size: $font-size-base;
  }
}

// 加载更多
.load-more {
  margin-top: $spacing-lg;
  text-align: center;
  
  .load-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-base;
    color: $color-text-secondary;
    background: $color-white;
    border: 1px solid $border-medium;
    border-radius: $radius-lg;
    cursor: pointer;
    transition: all $transition-fast;
    
    .el-icon {
      margin-right: $spacing-sm;
    }
    
    &:hover:not(.loading):not(:disabled) {
      color: $jd-red;
      border-color: $jd-red;
      background: rgba($jd-red, 0.05);
    }
    
    &.loading,
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
      
      .is-loading {
        animation: rotate 1s linear infinite;
      }
    }
  }
  
  .no-more {
    display: inline-block;
    padding: $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-placeholder;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
