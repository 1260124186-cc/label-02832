<template>
  <div class="home-page">
    <!-- 头部导航 - 首屏必须立即加载 -->
    <Header />
    
    <!-- 主体内容 -->
    <main class="main-content">
      <!-- 轮播图区域 - 首屏重要内容，使用 Suspense 包裹 -->
      <Suspense>
        <template #default>
          <Banner />
        </template>
        <template #fallback>
          <Skeleton variant="banner" />
        </template>
      </Suspense>
      
      <!-- 分类导航 - 懒加载 -->
      <Suspense>
        <template #default>
          <CategoryNav v-if="visibleSections.category" />
          <Skeleton v-else variant="category-nav" />
        </template>
        <template #fallback>
          <Skeleton variant="category-nav" />
        </template>
      </Suspense>
      
      <!-- 限时秒杀 - 懒加载 -->
      <div ref="flashSaleRef" class="lazy-section">
        <Suspense>
          <template #default>
            <FlashSale v-if="visibleSections.flashSale" />
            <div v-else class="section-skeleton flash-sale-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="flash-item" v-for="n in 5" :key="n" />
                </div>
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="section-skeleton flash-sale-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="flash-item" v-for="n in 5" :key="n" />
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
      
      <!-- 品牌专区 - 懒加载 -->
      <div ref="brandRef" class="lazy-section">
        <Suspense>
          <template #default>
            <BrandZone v-if="visibleSections.brand" />
            <div v-else class="section-skeleton brand-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="brand-card" v-for="n in 4" :key="n" />
                </div>
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="section-skeleton brand-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="brand-card" v-for="n in 4" :key="n" />
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
      
      <!-- 商品推荐 - 懒加载 -->
      <div ref="productRef" class="lazy-section">
        <Suspense>
          <template #default>
            <ProductRecommend v-if="visibleSections.product" />
            <div v-else class="section-skeleton product-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="product-card" v-for="n in 10" :key="n" />
                </div>
              </div>
            </div>
          </template>
          <template #fallback>
            <div class="section-skeleton product-skeleton">
              <div class="container">
                <div class="skeleton-wrapper">
                  <Skeleton variant="product-card" v-for="n in 10" :key="n" />
                </div>
              </div>
            </div>
          </template>
        </Suspense>
      </div>
    </main>
    
    <!-- 页脚 - 懒加载 -->
    <div ref="footerRef" class="lazy-section">
      <Footer v-if="visibleSections.footer" />
    </div>
    
    <!-- 回到顶部 -->
    <transition name="fade">
      <div v-if="showBackTop" class="back-to-top" @click="scrollToTop">
        <el-icon><ArrowUp /></el-icon>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

// 骨架屏组件 - 同步导入（首屏需要）
import Skeleton from '@/components/common/Skeleton.vue'

// 首屏必须的组件 - 同步导入
import Header from '@/components/Header/index.vue'

// 异步组件 - 懒加载
const Banner = defineAsyncComponent(() => import('@/components/Banner/index.vue'))
const CategoryNav = defineAsyncComponent(() => import('@/components/Category/index.vue'))
const FlashSale = defineAsyncComponent(() => import('@/components/FlashSale/index.vue'))
const BrandZone = defineAsyncComponent(() => import('@/components/Brand/index.vue'))
const ProductRecommend = defineAsyncComponent(() => import('@/components/Product/index.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Footer/index.vue'))

const showBackTop = ref(false)

// 各模块的 ref
const flashSaleRef = ref(null)
const brandRef = ref(null)
const productRef = ref(null)
const footerRef = ref(null)

// 控制各模块的可见性
const visibleSections = reactive({
  category: true, // 分类导航紧跟轮播图，直接加载
  flashSale: false,
  brand: false,
  product: false,
  footer: false
})

// IntersectionObserver 实例
let sectionObserver = null

// 创建区域观察器
const createSectionObserver = () => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          
          // 根据目标元素设置对应模块可见
          if (target === flashSaleRef.value) {
            visibleSections.flashSale = true
          } else if (target === brandRef.value) {
            visibleSections.brand = true
          } else if (target === productRef.value) {
            visibleSections.product = true
          } else if (target === footerRef.value) {
            visibleSections.footer = true
          }
          
          // 加载后停止观察
          sectionObserver.unobserve(target)
        }
      })
    },
    {
      rootMargin: '200px 0px', // 提前 200px 开始加载
      threshold: 0.01
    }
  )
}

const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 创建并启动区域观察器
  createSectionObserver()
  
  // 开始观察各个懒加载区域
  if (flashSaleRef.value) sectionObserver.observe(flashSaleRef.value)
  if (brandRef.value) sectionObserver.observe(brandRef.value)
  if (productRef.value) sectionObserver.observe(productRef.value)
  if (footerRef.value) sectionObserver.observe(footerRef.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  
  // 清理观察器
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: $bg-primary;
}

.main-content {
  min-height: calc(100vh - 200px);
}

// 懒加载区域
.lazy-section {
  min-height: 100px;
}

// 骨架屏区域样式
.section-skeleton {
  padding: $spacing-lg 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
}

.flash-sale-skeleton {
  .skeleton-wrapper {
    display: flex;
    background: $color-white;
    border-radius: $radius-lg;
    padding: $spacing-md;
    gap: $spacing-md;
    overflow-x: auto;
  }
}

.brand-skeleton {
  .skeleton-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-md;
    
    @include respond-to(lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include respond-to(md) {
      grid-template-columns: 1fr;
    }
  }
}

.product-skeleton {
  .skeleton-wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: $spacing-md;
    background: $color-white;
    border-radius: $radius-lg;
    padding: $spacing-md;
    
    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

// 回到顶部按钮
.back-to-top {
  position: fixed;
  right: 20px;
  bottom: 100px;
  width: 44px;
  height: 44px;
  background: $color-white;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  box-shadow: $shadow-md;
  @include flex-center;
  cursor: pointer;
  transition: all $transition-fast;
  z-index: $z-index-fixed;
  
  .el-icon {
    font-size: 20px;
    color: $color-text-secondary;
  }
  
  &:hover {
    background: $jd-red;
    border-color: $jd-red;
    
    .el-icon {
      color: $color-white;
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-normal;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
