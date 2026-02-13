<template>
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <a href="javascript:void(0)" class="location" @click="handleClick">
          <el-icon><Location /></el-icon>
          <span>{{ locationInfo.city }}</span>
          <el-icon class="arrow"><ArrowDown /></el-icon>
        </a>
      </div>
      <div class="top-bar-right">
        <div class="nav-item">
          <template v-for="link in userLinks" :key="link.id">
            <a 
              href="javascript:void(0)" 
              :class="{ highlight: link.isHighlight }" 
              @click="handleClick"
            >{{ link.name }}</a>
          </template>
        </div>
        <div class="nav-item">
          <a href="javascript:void(0)" @click="handleClick">{{ topBarLinks[0].name }}</a>
        </div>
        <div class="nav-item dropdown">
          <a href="javascript:void(0)" @click="handleClick">
            我的京东
            <el-icon class="arrow"><ArrowDown /></el-icon>
          </a>
          <div class="dropdown-menu">
            <a 
              v-for="link in myJdLinks" 
              :key="link.id" 
              href="javascript:void(0)" 
              @click="handleClick"
            >{{ link.name }}</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="javascript:void(0)" @click="handleClick">{{ topBarLinks[1].name }}</a>
        </div>
        <div class="nav-item">
          <a href="javascript:void(0)" @click="handleClick">{{ topBarLinks[2].name }}</a>
        </div>
        <div class="nav-item dropdown">
          <a href="javascript:void(0)" @click="handleClick">
            客户服务
            <el-icon class="arrow"><ArrowDown /></el-icon>
          </a>
          <div class="dropdown-menu">
            <a 
              v-for="link in serviceLinks" 
              :key="link.id" 
              href="javascript:void(0)" 
              @click="handleClick"
            >{{ link.name }}</a>
          </div>
        </div>
        <div class="nav-item dropdown">
          <a href="javascript:void(0)" @click="handleClick">
            网站导航
            <el-icon class="arrow"><ArrowDown /></el-icon>
          </a>
          <div class="dropdown-menu dropdown-menu-wide">
            <div 
              v-for="section in siteNavigation" 
              :key="section.id" 
              class="dropdown-section"
            >
              <h4>{{ section.title }}</h4>
              <a 
                v-for="link in section.links" 
                :key="link.name" 
                href="javascript:void(0)" 
                @click="handleClick"
              >{{ link.name }}</a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="javascript:void(0)" @click="handleClick">{{ topBarLinks[3].name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Location, ArrowDown } from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

// 从 mock 数据导入
import { 
  userLinks as mockUserLinks,
  myJdLinks as mockMyJdLinks,
  serviceLinks as mockServiceLinks,
  siteNavigation as mockSiteNavigation,
  topBarLinks as mockTopBarLinks
} from '@/mock/navigation'

const handleClick = () => {
  showDevelopingToast()
}

// 位置信息
const locationInfo = ref({
  city: '北京'
})

// 使用 mock 数据
const userLinks = ref(mockUserLinks)
const myJdLinks = ref(mockMyJdLinks)
const serviceLinks = ref(mockServiceLinks)
const siteNavigation = ref(mockSiteNavigation)
const topBarLinks = ref(mockTopBarLinks)
</script>

<style lang="scss" scoped>
.top-bar {
  background: #333;
  color: #b1b1b1;
  font-size: $font-size-xs;
  line-height: 30px;
  
  // 平板和手机端隐藏顶部栏
  @include respond-to(md) {
    display: none;
  }
  
  .container {
    @include flex-between;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
  
  &-left {
    flex-shrink: 0;
    
    .location {
      display: inline-flex;
      align-items: center;
      color: #b1b1b1;
      cursor: pointer;
      
      &:hover {
        color: $color-white;
      }
      
      .el-icon {
        margin-right: 4px;
      }
      
      .arrow {
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  
  &-right {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    .nav-item {
      position: relative;
      padding: 0 $spacing-sm;
      border-left: 1px solid #666;
      white-space: nowrap;
      flex-shrink: 0;
      
      @include respond-to(lg) {
        padding: 0 $spacing-xs;
      }
      
      &:first-child {
        border-left: none;
      }
      
      a {
        color: #b1b1b1;
        transition: color $transition-fast;
        
        &:hover {
          color: $color-white;
        }
        
        &.highlight {
          color: $jd-red;
          margin-left: $spacing-sm;
          
          @include respond-to(lg) {
            margin-left: $spacing-xs;
          }
          
          &:hover {
            color: $jd-red-light;
          }
        }
      }
      
      .arrow {
        margin-left: 2px;
        font-size: 10px;
        vertical-align: middle;
      }
      
      // 下拉菜单
      &.dropdown {
        &:hover {
          .dropdown-menu {
            display: block;
          }
        }
      }
      
      .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        min-width: 120px;
        background: $color-white;
        border: 1px solid $border-light;
        box-shadow: $shadow-lg;
        z-index: $z-index-dropdown;
        padding: $spacing-sm 0;
        
        a {
          display: block;
          padding: $spacing-xs $spacing-md;
          color: $color-text-primary;
          white-space: nowrap;
          
          &:hover {
            background: $bg-primary;
            color: $jd-red;
          }
        }
        
        &-wide {
          min-width: 200px;
          padding: $spacing-md;
          
          .dropdown-section {
            margin-bottom: $spacing-md;
            
            &:last-child {
              margin-bottom: 0;
            }
            
            h4 {
              font-size: $font-size-xs;
              color: $color-text-placeholder;
              margin-bottom: $spacing-xs;
              font-weight: $font-weight-normal;
            }
            
            a {
              display: inline-block;
              padding: $spacing-xs $spacing-sm;
            }
          }
        }
      }
    }
  }
}
</style>
