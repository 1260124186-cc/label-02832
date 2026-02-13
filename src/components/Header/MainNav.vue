<template>
  <div class="main-nav">
    <div class="container">
      <!-- 全部商品分类 -->
      <div class="category-trigger" @mouseenter="showCategory = true" @mouseleave="showCategory = false">
        <el-icon><Menu /></el-icon>
        <span>全部商品分类</span>
        
        <!-- 分类下拉菜单 -->
        <transition name="fade">
          <div v-if="showCategory" class="category-dropdown">
            <div 
              v-for="(cat, index) in categories" 
              :key="cat.id"
              class="category-item"
              :class="{ active: activeCategory === index }"
              @mouseenter="activeCategory = index"
            >
              <div class="category-main">
                <el-icon><component :is="cat.icon" /></el-icon>
                <span>{{ cat.name }}</span>
                <el-icon class="arrow"><ArrowRight /></el-icon>
              </div>
              
              <!-- 子分类面板 -->
              <div v-if="activeCategory === index" class="category-sub">
                <div v-for="sub in cat.children" :key="sub.name" class="sub-group">
                  <h4>{{ sub.name }}</h4>
                  <div class="sub-items">
                    <a v-for="item in sub.items" :key="item" href="javascript:void(0)" @click="handleClick">{{ item }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      
      <!-- 导航链接 -->
      <nav class="nav-links">
        <a v-for="link in navLinks" :key="link.name" href="javascript:void(0)" @click="handleClick">
          {{ link.name }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Menu, ArrowRight, Iphone, Monitor, Headset, 
  Watch, Camera, HomeFilled, Football, Brush,
  Food, Ticket, Van, Present, Reading
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

// 从 mock 数据导入
import { mainCategories } from '@/mock/categories'
import { navLinks as mockNavLinks } from '@/mock/navigation'

const showCategory = ref(false)
const activeCategory = ref(0)

const handleClick = () => {
  showDevelopingToast()
}

// 使用 mock 数据
const categories = ref(mainCategories)
const navLinks = ref(mockNavLinks)
</script>

<style lang="scss" scoped>
.main-nav {
  background: $jd-red;
  overflow-x: auto; // 允许内容滚动
  -webkit-overflow-scrolling: touch;
  
  // 隐藏滚动条但保留滚动功能
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  .container {
    display: flex;
    align-items: center;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
    
    @include respond-to(sm) {
      padding: 0 $spacing-sm;
    }
  }
}

// 分类触发器
.category-trigger {
  position: relative;
  display: flex;
  align-items: center;
  width: 210px;
  height: 45px;
  padding: 0 $spacing-md;
  background: rgba(0, 0, 0, 0.1);
  color: $color-white;
  cursor: pointer;
  flex-shrink: 0;
  
  @include respond-to(lg) {
    width: 180px;
    padding: 0 $spacing-sm;
  }
  
  @include respond-to(md) {
    width: 150px;
    height: 40px;
  }
  
  @include respond-to(sm) {
    width: auto;
    padding: 0 $spacing-sm;
    
    span {
      display: none; // 小屏幕只显示图标
    }
  }
  
  .el-icon {
    font-size: 18px;
    margin-right: $spacing-sm;
    
    @include respond-to(sm) {
      margin-right: 0;
    }
  }
  
  span {
    font-size: $font-size-base;
    white-space: nowrap;
    
    @include respond-to(md) {
      font-size: $font-size-sm;
    }
  }
}

// 分类下拉菜单
.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 210px;
  background: $color-white;
  box-shadow: $shadow-lg;
  z-index: $z-index-modal;
  
  @include respond-to(lg) {
    width: 180px;
  }
  
  @include respond-to(md) {
    width: 150px;
  }
  
  // 小屏幕禁用下拉菜单
  @include respond-to(sm) {
    display: none;
  }
  
  .category-item {
    position: relative;
    
    .category-main {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      color: $color-text-primary;
      border-left: 2px solid transparent;
      transition: all $transition-fast;
      
      @include respond-to(md) {
        padding: $spacing-xs $spacing-sm;
      }
      
      .el-icon {
        font-size: 16px;
        margin-right: $spacing-sm;
        color: $color-text-secondary;
        
        @include respond-to(md) {
          font-size: 14px;
          margin-right: $spacing-xs;
        }
      }
      
      span {
        flex: 1;
        font-size: $font-size-sm;
        @include ellipsis;
        
        @include respond-to(md) {
          font-size: $font-size-xs;
        }
      }
      
      .arrow {
        font-size: 12px;
        color: $color-text-placeholder;
        
        @include respond-to(md) {
          display: none;
        }
      }
    }
    
    &:hover,
    &.active {
      .category-main {
        background: $bg-primary;
        border-left-color: $jd-red;
        
        .el-icon {
          color: $jd-red;
        }
      }
    }
    
    // 子分类面板
    .category-sub {
      position: absolute;
      top: 0;
      left: 100%;
      width: 750px;
      min-height: 100%;
      background: $color-white;
      border: 1px solid $border-light;
      border-left: none;
      box-shadow: $shadow-lg;
      padding: $spacing-md;
      display: flex;
      flex-wrap: wrap;
      
      // 响应式宽度调整
      @include respond-to(xl) {
        width: calc(100vw - 260px);
        max-width: 700px;
      }
      
      @include respond-to(lg) {
        width: calc(100vw - 230px);
        max-width: 550px;
        padding: $spacing-sm;
      }
      
      @include respond-to(md) {
        width: calc(100vw - 200px);
        max-width: 450px;
        padding: $spacing-sm;
      }
      
      .sub-group {
        width: 50%;
        margin-bottom: $spacing-md;
        
        @include respond-to(lg) {
          width: 100%;
          margin-bottom: $spacing-sm;
        }
        
        h4 {
          font-size: $font-size-sm;
          font-weight: $font-weight-bold;
          color: $color-text-primary;
          margin-bottom: $spacing-sm;
          padding-bottom: $spacing-xs;
          border-bottom: 1px solid $border-light;
          
          @include respond-to(lg) {
            font-size: $font-size-xs;
            margin-bottom: $spacing-xs;
          }
        }
        
        .sub-items {
          a {
            display: inline-block;
            padding: $spacing-xs $spacing-sm;
            font-size: $font-size-xs;
            color: $color-text-secondary;
            
            @include respond-to(lg) {
              padding: 2px $spacing-xs;
              font-size: 11px;
            }
            
            &:hover {
              color: $jd-red;
            }
          }
        }
      }
    }
  }
}

// 导航链接
.nav-links {
  display: flex;
  align-items: center;
  margin-left: $spacing-md;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @include respond-to(md) {
    margin-left: $spacing-sm;
  }
  
  @include respond-to(sm) {
    flex: 1;
    margin-left: $spacing-xs;
  }
  
  a {
    position: relative;
    padding: 0 $spacing-md;
    height: 45px;
    line-height: 45px;
    font-size: $font-size-sm;
    color: $color-white;
    transition: background $transition-fast;
    white-space: nowrap;
    flex-shrink: 0;
    
    @include respond-to(lg) {
      padding: 0 $spacing-sm;
    }
    
    @include respond-to(md) {
      padding: 0 $spacing-sm;
      height: 40px;
      line-height: 40px;
      font-size: $font-size-xs;
    }
    
    @include respond-to(sm) {
      padding: 0 $spacing-xs;
      font-size: 11px;
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-fast;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
