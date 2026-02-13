<template>
  <div class="home-page">
    <!-- 头部导航 -->
    <Header />
    
    <!-- 主体内容 -->
    <main class="main-content">
      <!-- 轮播图区域 -->
      <Banner />
      
      <!-- 分类导航 -->
      <CategoryNav />
      
      <!-- 限时秒杀 -->
      <FlashSale />
      
      <!-- 品牌专区 -->
      <BrandZone />
      
      <!-- 商品推荐 -->
      <ProductRecommend />
    </main>
    
    <!-- 页脚 -->
    <Footer />
    
    <!-- 回到顶部 -->
    <transition name="fade">
      <div v-if="showBackTop" class="back-to-top" @click="scrollToTop">
        <el-icon><ArrowUp /></el-icon>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

// 组件导入
import Header from '@/components/Header/index.vue'
import Banner from '@/components/Banner/index.vue'
import CategoryNav from '@/components/Category/index.vue'
import FlashSale from '@/components/FlashSale/index.vue'
import BrandZone from '@/components/Brand/index.vue'
import ProductRecommend from '@/components/Product/index.vue'
import Footer from '@/components/Footer/index.vue'

const showBackTop = ref(false)

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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
