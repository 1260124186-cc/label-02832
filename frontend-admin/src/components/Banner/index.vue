<template>
  <div class="banner-section">
    <div class="container">
      <div class="banner-wrapper">
        <!-- 左侧分类菜单 -->
        <nav class="side-category" role="navigation" aria-label="商品分类导航">
          <div 
            v-for="(cat, index) in sideCategories" 
            :key="cat.id"
            class="category-item"
            role="menuitem"
            :aria-expanded="activeSideCategory === index"
            :aria-haspopup="cat.children && cat.children.length > 0"
            tabindex="0"
            @mouseenter="activeSideCategory = index"
            @mouseleave="activeSideCategory = -1"
            @focus="activeSideCategory = index"
            @blur="activeSideCategory = -1"
            @keydown.enter="handleClick"
          >
            <span class="cat-name">{{ cat.name }}</span>
            <el-icon class="arrow" aria-hidden="true"><ArrowRight /></el-icon>
            
            <!-- 子分类浮层 -->
            <transition name="slide-right">
              <div 
                v-if="activeSideCategory === index" 
                class="sub-panel"
                role="menu"
                :aria-label="`${cat.name}子分类`"
              >
                <div v-for="sub in cat.children" :key="sub.title" class="sub-group" role="group" :aria-label="sub.title">
                  <h4 id="sub-title">{{ sub.title }}</h4>
                  <div class="sub-links" role="menu">
                    <a 
                      v-for="link in sub.links" 
                      :key="link" 
                      href="javascript:void(0)" 
                      role="menuitem"
                      @click="handleClick"
                    >{{ link }}</a>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </nav>
        
        <!-- 中间轮播图 -->
        <div 
          class="main-carousel"
          role="region"
          aria-label="促销轮播图"
          aria-roledescription="carousel"
          @mouseenter="pauseAutoPlay"
          @mouseleave="resumeAutoPlay"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- 轮播图为空时的占位 -->
          <div v-if="!hasSlides" class="carousel-empty" role="status" aria-live="polite">
            <el-icon :size="48" aria-hidden="true"><Present /></el-icon>
            <p>暂无轮播内容</p>
          </div>
          
          <!-- 轮播图内容 -->
          <div v-else class="carousel-container" aria-live="off">
            <div 
              class="carousel-track" 
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(slide, index) in slides" 
                :key="slide.id || index" 
                class="carousel-slide"
                role="group"
                :aria-roledescription="'slide'"
                :aria-label="`第 ${index + 1} 张，共 ${slides.length} 张：${slide.title || '促销活动'}`"
                :aria-hidden="currentSlide !== index"
                :style="{ background: slide.bgColor || '#e1251b' }"
              >
                <div class="slide-content">
                  <div class="slide-text">
                    <h2>{{ slide.title || '欢迎来到京东' }}</h2>
                    <p>{{ slide.subtitle || '' }}</p>
                    <button class="slide-btn" @click="handleClick">{{ slide.btnText || '立即查看' }}</button>
                  </div>
                  <div class="slide-image" aria-hidden="true">
                    <div class="image-placeholder" :style="{ background: slide.imgBg || 'rgba(255,255,255,0.1)' }">
                      <el-icon :size="60"><component :is="slide.icon || 'Present'" /></el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 轮播控制（仅多张时显示） -->
            <template v-if="slides.length > 1">
              <button 
                class="carousel-btn prev" 
                @click="prevSlide"
                aria-label="上一张幻灯片"
              >
                <el-icon aria-hidden="true"><ArrowLeft /></el-icon>
              </button>
              <button 
                class="carousel-btn next" 
                @click="nextSlide"
                aria-label="下一张幻灯片"
              >
                <el-icon aria-hidden="true"><ArrowRight /></el-icon>
              </button>
            </template>
            
            <!-- 轮播指示器（仅多张时显示） -->
            <div 
              v-if="slides.length > 1" 
              class="carousel-dots"
              role="tablist"
              aria-label="幻灯片选择"
            >
              <button 
                v-for="(_, index) in slides" 
                :key="index"
                class="dot"
                role="tab"
                :aria-selected="currentSlide === index"
                :aria-label="`跳转到第 ${index + 1} 张幻灯片`"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
              ></button>
            </div>
          </div>
        </div>
        
        <!-- 右侧信息栏 -->
        <div class="side-info">
          <!-- 用户信息 -->
          <div class="user-box">
            <div class="user-avatar">
              <el-icon :size="40"><User /></el-icon>
            </div>
            <p class="user-greeting">Hi，欢迎来到京东！</p>
            <div class="user-actions">
              <button class="btn-login" @click="handleClick">登录</button>
              <button class="btn-register" @click="handleClick">注册</button>
            </div>
            <div class="user-links">
              <a href="javascript:void(0)" @click="handleClick">新人福利</a>
              <a href="javascript:void(0)" @click="handleClick">PLUS会员</a>
            </div>
          </div>
          
          <!-- 京东快报 -->
          <div class="news-box">
            <div class="news-header">
              <span class="title">京东快报</span>
              <a href="javascript:void(0)" class="more" @click="handleClick">更多</a>
            </div>
            <ul class="news-list">
              <li v-for="news in newsList" :key="news.id">
                <span class="tag" :class="news.tagType">{{ news.tag }}</span>
                <a href="javascript:void(0)" @click="handleClick">{{ news.title }}</a>
              </li>
            </ul>
          </div>
          
          <!-- 服务入口 -->
          <div class="service-box">
            <a v-for="service in services" :key="service.name" href="javascript:void(0)" class="service-item" @click="handleClick">
              <el-icon><component :is="service.icon" /></el-icon>
              <span>{{ service.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { 
  ArrowRight, ArrowLeft, User, Iphone, Monitor, 
  HomeFilled, ShoppingCart, Ticket, Service, 
  CreditCard, Van, Present, Goods
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'
import { createLogger } from '@/utils/logger'

// 从 mock 数据导入
import { sideCategories as mockSideCategories } from '@/mock/categories'
import { 
  slides as mockSlides, 
  newsList as mockNewsList, 
  services as mockServices 
} from '@/mock/banner'

// 创建日志记录器
const logger = createLogger('Banner')

// 轮播图配置
const CAROUSEL_CONFIG = {
  autoPlayInterval: 4000,  // 自动播放间隔（毫秒）
  minSlides: 1,            // 最少轮播图数量
  maxRetries: 3            // 最大重试次数
}

const currentSlide = ref(0)
const activeSideCategory = ref(-1)
const isPlaying = ref(false)
const hasError = ref(false)
let autoPlayTimer = null

// 触摸滑动相关状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchEndX = ref(0)
const touchEndY = ref(0)
const isSwiping = ref(false)
const swipeThreshold = 50 // 滑动阈值（像素）

const handleClick = () => {
  showDevelopingToast()
}

// 使用 mock 数据（带边界检查）
const slides = ref([])
const sideCategories = ref([])
const newsList = ref([])
const services = ref([])

// 初始化数据（带错误处理）
const initializeData = () => {
  logger.debug('初始化 Banner 数据')
  
  try {
    // 轮播图数据
    if (Array.isArray(mockSlides) && mockSlides.length >= CAROUSEL_CONFIG.minSlides) {
      slides.value = mockSlides
      logger.info('轮播图数据加载成功', { count: mockSlides.length })
    } else {
      logger.warn('轮播图数据无效或为空，使用默认占位数据')
      slides.value = [{
        id: 0,
        title: '欢迎来到京东',
        subtitle: '品质生活，从这里开始',
        btnText: '立即探索',
        bgColor: 'linear-gradient(135deg, #e1251b 0%, #c81623 100%)',
        imgBg: 'rgba(255,255,255,0.2)',
        icon: 'Present'
      }]
    }
    
    // 侧边分类数据
    if (Array.isArray(mockSideCategories) && mockSideCategories.length > 0) {
      sideCategories.value = mockSideCategories
      logger.debug('侧边分类数据加载成功', { count: mockSideCategories.length })
    } else {
      logger.warn('侧边分类数据为空')
      sideCategories.value = []
    }
    
    // 快报数据
    if (Array.isArray(mockNewsList) && mockNewsList.length > 0) {
      newsList.value = mockNewsList
      logger.debug('快报数据加载成功', { count: mockNewsList.length })
    } else {
      logger.warn('快报数据为空')
      newsList.value = []
    }
    
    // 服务数据
    if (Array.isArray(mockServices) && mockServices.length > 0) {
      services.value = mockServices
      logger.debug('服务数据加载成功', { count: mockServices.length })
    } else {
      logger.warn('服务数据为空')
      services.value = []
    }
    
    hasError.value = false
  } catch (error) {
    logger.error('初始化数据失败', error)
    hasError.value = true
  }
}

// 计算属性：是否有轮播图
const hasSlides = computed(() => slides.value.length > 0)

// 计算属性：是否有多张轮播图（需要自动播放）
const shouldAutoPlay = computed(() => slides.value.length > 1)

// 安全的轮播图切换（带边界检查）
const nextSlide = () => {
  if (!hasSlides.value) {
    logger.warn('无法切换到下一张：轮播图为空')
    return
  }
  
  const totalSlides = slides.value.length
  const nextIndex = (currentSlide.value + 1) % totalSlides
  
  logger.debug('切换到下一张', { from: currentSlide.value, to: nextIndex, total: totalSlides })
  currentSlide.value = nextIndex
}

const prevSlide = () => {
  if (!hasSlides.value) {
    logger.warn('无法切换到上一张：轮播图为空')
    return
  }
  
  const totalSlides = slides.value.length
  const prevIndex = (currentSlide.value - 1 + totalSlides) % totalSlides
  
  logger.debug('切换到上一张', { from: currentSlide.value, to: prevIndex, total: totalSlides })
  currentSlide.value = prevIndex
}

const goToSlide = (index) => {
  if (!hasSlides.value) {
    logger.warn('无法跳转：轮播图为空')
    return
  }
  
  // 边界检查
  if (index < 0 || index >= slides.value.length) {
    logger.warn('无效的轮播图索引', { index, max: slides.value.length - 1 })
    return
  }
  
  if (index === currentSlide.value) {
    logger.debug('已经在当前轮播图', { index })
    return
  }
  
  logger.debug('跳转到指定轮播图', { from: currentSlide.value, to: index })
  currentSlide.value = index
}

// 自动播放控制
const startAutoPlay = () => {
  if (!shouldAutoPlay.value) {
    logger.debug('轮播图数量不足，跳过自动播放')
    return
  }
  
  if (isPlaying.value) {
    logger.debug('自动播放已在运行')
    return
  }
  
  logger.info('启动自动播放', { interval: CAROUSEL_CONFIG.autoPlayInterval })
  
  autoPlayTimer = setInterval(() => {
    nextSlide()
  }, CAROUSEL_CONFIG.autoPlayInterval)
  
  isPlaying.value = true
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
    isPlaying.value = false
    logger.debug('停止自动播放')
  }
}

// 暂停自动播放（鼠标悬停时）
const pauseAutoPlay = () => {
  if (isPlaying.value) {
    stopAutoPlay()
    logger.debug('暂停自动播放（用户交互）')
  }
}

// 恢复自动播放
const resumeAutoPlay = () => {
  if (shouldAutoPlay.value && !isPlaying.value) {
    startAutoPlay()
    logger.debug('恢复自动播放')
  }
}

// 触摸事件处理
const handleTouchStart = (e) => {
  if (!hasSlides.value || slides.value.length <= 1) return
  
  const touch = e.touches[0]
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  isSwiping.value = true
  
  // 暂停自动播放
  pauseAutoPlay()
  logger.debug('触摸开始', { x: touchStartX.value, y: touchStartY.value })
}

const handleTouchMove = (e) => {
  if (!isSwiping.value) return
  
  const touch = e.touches[0]
  touchEndX.value = touch.clientX
  touchEndY.value = touch.clientY
  
  // 计算水平和垂直移动距离
  const diffX = Math.abs(touchEndX.value - touchStartX.value)
  const diffY = Math.abs(touchEndY.value - touchStartY.value)
  
  // 如果是水平滑动为主，阻止默认滚动行为
  if (diffX > diffY && diffX > 10) {
    e.preventDefault()
  }
}

const handleTouchEnd = () => {
  if (!isSwiping.value) return
  
  const diffX = touchEndX.value - touchStartX.value
  const diffY = Math.abs(touchEndY.value - touchStartY.value)
  const absDiffX = Math.abs(diffX)
  
  // 只有水平滑动距离大于阈值且大于垂直滑动时才触发切换
  if (absDiffX > swipeThreshold && absDiffX > diffY) {
    if (diffX > 0) {
      // 向右滑动，显示上一张
      prevSlide()
      logger.info('触摸滑动：上一张')
    } else {
      // 向左滑动，显示下一张
      nextSlide()
      logger.info('触摸滑动：下一张')
    }
  }
  
  // 重置状态
  isSwiping.value = false
  touchStartX.value = 0
  touchStartY.value = 0
  touchEndX.value = 0
  touchEndY.value = 0
  
  // 恢复自动播放
  resumeAutoPlay()
}

// 监听轮播图数据变化
watch(() => slides.value.length, (newLength, oldLength) => {
  logger.debug('轮播图数量变化', { from: oldLength, to: newLength })
  
  // 如果当前索引超出范围，重置到第一张
  if (currentSlide.value >= newLength) {
    logger.warn('当前索引超出范围，重置到第一张')
    currentSlide.value = 0
  }
  
  // 根据数量决定是否自动播放
  if (newLength > 1 && !isPlaying.value) {
    startAutoPlay()
  } else if (newLength <= 1) {
    stopAutoPlay()
  }
})

// 生命周期
onMounted(() => {
  logger.info('Banner 组件挂载')
  initializeData()
  startAutoPlay()
})

onUnmounted(() => {
  logger.info('Banner 组件卸载')
  stopAutoPlay()
})
</script>

<style lang="scss" scoped>
.banner-section {
  padding: $spacing-md 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
    
    @include respond-to(sm) {
      padding: 0 $spacing-sm;
    }
  }
}

.banner-wrapper {
  display: flex;
  height: 460px;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  position: relative;
  // 移除overflow:hidden，允许分类弹窗溢出显示
  
  @include respond-to(lg) {
    height: 380px;
  }
  
  @include respond-to(md) {
    flex-direction: column;
    height: auto;
  }
}

// 左侧分类菜单
.side-category {
  width: 210px;
  background: #5f5750;
  flex-shrink: 0;
  position: relative;
  z-index: 100; // 确保分类菜单在最上层
  border-radius: $radius-lg 0 0 $radius-lg;
  // 移除overflow:hidden，允许子分类浮层正常显示
  
  @include respond-to(lg) {
    width: 180px;
  }
  
  // 平板和手机端隐藏左侧分类菜单
  @include respond-to(md) {
    display: none;
  }
  
  .category-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px $spacing-md;
    color: $color-white;
    cursor: pointer;
    transition: background $transition-fast;
    
    @include respond-to(lg) {
      padding: 8px $spacing-sm;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    
    .cat-name {
      font-size: $font-size-sm;
      @include ellipsis;
      
      @include respond-to(lg) {
        font-size: $font-size-xs;
      }
    }
    
    .arrow {
      font-size: 12px;
      opacity: 0.6;
    }
    
    // 子分类浮层
    .sub-panel {
      position: absolute;
      top: 0;
      left: 210px; // 使用固定值而非100%
      width: 540px;
      min-height: auto;
      max-height: 460px;
      background: $color-white;
      border: 1px solid $border-light;
      box-shadow: $shadow-lg;
      padding: $spacing-md $spacing-lg;
      overflow-y: auto;
      z-index: 1000; // 提高层级
      
      @include respond-to(lg) {
        left: 180px;
        width: calc(100vw - 400px);
        max-width: 500px;
        max-height: 380px;
      }
      
      .sub-group {
        margin-bottom: $spacing-md;
        padding-bottom: $spacing-sm;
        border-bottom: 1px dashed $border-light;
        display: flex;
        align-items: flex-start;
        
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        h4 {
          flex-shrink: 0;
          width: 70px;
          font-size: $font-size-sm;
          font-weight: $font-weight-bold;
          color: $color-text-primary;
          line-height: 28px;
          margin-right: $spacing-sm;
          
          @include respond-to(lg) {
            width: 60px;
            font-size: $font-size-xs;
          }
        }
        
        .sub-links {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          
          a {
            display: inline-block;
            padding: $spacing-xs $spacing-sm;
            font-size: $font-size-xs;
            color: $color-text-secondary;
            line-height: 20px;
            transition: color $transition-fast;
            
            &:hover {
              color: $jd-red;
            }
          }
        }
      }
    }
  }
}

// 中间轮播图
.main-carousel {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-width: 0; // 防止flex子元素溢出
  touch-action: pan-y pinch-zoom; // 允许垂直滚动和缩放，但处理水平滑动
  user-select: none; // 防止滑动时选中文本
  
  @include respond-to(md) {
    width: 100%;
    height: 280px;
    border-radius: $radius-lg $radius-lg 0 0;
  }
  
  @include respond-to(sm) {
    height: 200px;
  }
  
  @include respond-to(xs) {
    height: 160px;
  }
  
  // 轮播图空状态
  .carousel-empty {
    @include flex-center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e1251b 0%, #c81623 100%);
    color: rgba(255, 255, 255, 0.8);
    
    .el-icon {
      margin-bottom: $spacing-md;
    }
    
    p {
      font-size: $font-size-base;
    }
  }
  
  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease;
  }
  
  .carousel-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    
    .slide-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: $spacing-xl $spacing-xxl;
      
      @include respond-to(lg) {
        padding: $spacing-lg $spacing-xl;
      }
      
      @include respond-to(md) {
        padding: $spacing-md $spacing-lg;
      }
      
      @include respond-to(sm) {
        padding: $spacing-sm $spacing-md;
      }
    }
    
    .slide-text {
      color: $color-white;
      flex: 1;
      min-width: 0;
      
      h2 {
        font-size: 36px;
        font-weight: $font-weight-bold;
        margin-bottom: $spacing-md;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        
        @include respond-to(lg) {
          font-size: 28px;
        }
        
        @include respond-to(md) {
          font-size: 24px;
          margin-bottom: $spacing-sm;
        }
        
        @include respond-to(sm) {
          font-size: 18px;
          margin-bottom: $spacing-xs;
        }
        
        @include respond-to(xs) {
          font-size: 16px;
        }
      }
      
      p {
        font-size: $font-size-lg;
        opacity: 0.9;
        margin-bottom: $spacing-lg;
        
        @include respond-to(lg) {
          font-size: $font-size-base;
          margin-bottom: $spacing-md;
        }
        
        @include respond-to(md) {
          font-size: $font-size-sm;
          margin-bottom: $spacing-sm;
        }
        
        @include respond-to(sm) {
          font-size: $font-size-xs;
          margin-bottom: $spacing-xs;
        }
      }
      
      .slide-btn {
        padding: $spacing-sm $spacing-xl;
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $color-text-primary;
        background: $color-white;
        border: none;
        border-radius: $radius-lg;
        cursor: pointer;
        transition: all $transition-fast;
        
        @include respond-to(md) {
          padding: $spacing-xs $spacing-md;
          font-size: $font-size-sm;
        }
        
        @include respond-to(sm) {
          padding: $spacing-xs $spacing-sm;
          font-size: $font-size-xs;
          border-radius: $radius-md;
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    .slide-image {
      flex-shrink: 0;
      
      @include respond-to(sm) {
        display: none; // 小屏幕隐藏图片区域
      }
      
      .image-placeholder {
        width: 280px;
        height: 280px;
        border-radius: $radius-xl;
        @include flex-center;
        color: rgba(255, 255, 255, 0.8);
        
        @include respond-to(lg) {
          width: 200px;
          height: 200px;
          
          .el-icon {
            font-size: 48px !important;
          }
        }
        
        @include respond-to(md) {
          width: 160px;
          height: 160px;
          
          .el-icon {
            font-size: 40px !important;
          }
        }
      }
    }
  }
  
  // 轮播控制按钮
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 60px;
    background: rgba(0, 0, 0, 0.3);
    color: $color-white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all $transition-fast;
    @include flex-center;
    
    @include respond-to(md) {
      width: 30px;
      height: 45px;
      opacity: 1; // 移动端始终显示
    }
    
    @include respond-to(sm) {
      width: 24px;
      height: 36px;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
    
    &.prev {
      left: 0;
      border-radius: 0 $radius-md $radius-md 0;
    }
    
    &.next {
      right: 0;
      border-radius: $radius-md 0 0 $radius-md;
    }
  }
  
  &:hover .carousel-btn {
    opacity: 1;
  }
  
  // 轮播指示器
  .carousel-dots {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $spacing-sm;
    
    @include respond-to(sm) {
      bottom: $spacing-sm;
      gap: $spacing-xs;
    }
    
    .dot {
      width: 24px;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      cursor: pointer;
      transition: all $transition-fast;
      
      @include respond-to(sm) {
        width: 16px;
        height: 3px;
      }
      
      &.active {
        background: $color-white;
        width: 32px;
        
        @include respond-to(sm) {
          width: 24px;
        }
      }
      
      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

// 右侧信息栏
.side-info {
  width: 210px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid $border-light;
  
  @include respond-to(lg) {
    width: 180px;
  }
  
  // 平板端隐藏右侧信息栏
  @include respond-to(md) {
    display: none;
  }
}

// 用户信息
.user-box {
  padding: $spacing-md;
  text-align: center;
  border-bottom: 1px solid $border-light;
  
  .user-avatar {
    width: 60px;
    height: 60px;
    margin: 0 auto $spacing-sm;
    background: $bg-primary;
    border-radius: $radius-round;
    @include flex-center;
    color: $color-text-placeholder;
  }
  
  .user-greeting {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-sm;
  }
  
  .user-actions {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-sm;
    
    button {
      padding: $spacing-xs $spacing-md;
      font-size: $font-size-xs;
      border-radius: $radius-md;
      cursor: pointer;
      transition: all $transition-fast;
    }
    
    .btn-login {
      background: $jd-red;
      color: $color-white;
      border: none;
      
      &:hover {
        background: $jd-red-dark;
      }
    }
    
    .btn-register {
      background: $color-white;
      color: $jd-red;
      border: 1px solid $jd-red;
      
      &:hover {
        background: rgba($jd-red, 0.1);
      }
    }
  }
  
  .user-links {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    
    a {
      font-size: $font-size-xs;
      color: $color-text-secondary;
      
      &:hover {
        color: $jd-red;
      }
    }
  }
}

// 京东快报
.news-box {
  flex: 1;
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid $border-light;
  
  .news-header {
    @include flex-between;
    margin-bottom: $spacing-sm;
    
    .title {
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
    }
    
    .more {
      font-size: $font-size-xs;
      color: $color-text-placeholder;
      
      &:hover {
        color: $jd-red;
      }
    }
  }
  
  .news-list {
    li {
      display: flex;
      align-items: center;
      padding: $spacing-xs 0;
      
      .tag {
        flex-shrink: 0;
        padding: 1px 4px;
        font-size: 10px;
        border-radius: $radius-sm;
        margin-right: $spacing-xs;
        
        &.hot {
          background: rgba($jd-red, 0.1);
          color: $jd-red;
        }
        
        &.sale {
          background: rgba($jd-orange, 0.1);
          color: $jd-orange;
        }
        
        &.new {
          background: rgba(#52c41a, 0.1);
          color: #52c41a;
        }
        
        &.event {
          background: rgba(#1890ff, 0.1);
          color: #1890ff;
        }
      }
      
      a {
        flex: 1;
        font-size: $font-size-xs;
        color: $color-text-secondary;
        @include ellipsis;
        
        &:hover {
          color: $jd-red;
        }
      }
    }
  }
}

// 服务入口
.service-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: $spacing-sm;
  
  .service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm;
    color: $color-text-secondary;
    transition: all $transition-fast;
    
    .el-icon {
      font-size: 24px;
      margin-bottom: $spacing-xs;
    }
    
    span {
      font-size: $font-size-xs;
    }
    
    &:hover {
      color: $jd-red;
      background: $bg-primary;
      border-radius: $radius-md;
    }
  }
}

// 过渡动画
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all $transition-normal;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
