<template>
  <div class="mobile-nav">
    <!-- 汉堡菜单按钮 -->
    <button
      class="hamburger-btn"
      :class="{ active: isMenuOpen }"
      :aria-expanded="isMenuOpen"
      aria-controls="mobile-menu-drawer"
      aria-label="打开导航菜单"
      @click="toggleMenu"
    >
      <span class="hamburger-line" aria-hidden="true" />
      <span class="hamburger-line" aria-hidden="true" />
      <span class="hamburger-line" aria-hidden="true" />
    </button>

    <!-- 遮罩层 -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="menu-overlay"
        aria-hidden="true"
        @click="closeMenu"
      />
    </transition>

    <!-- 侧边菜单 -->
    <transition name="slide-left">
      <nav
        v-if="isMenuOpen"
        id="mobile-menu-drawer"
        class="menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="导航菜单"
      >
        <!-- 菜单头部 -->
        <div class="menu-header">
          <div class="user-info">
            <el-icon class="avatar" aria-hidden="true">
              <User />
            </el-icon>
            <div class="user-text">
              <span class="greeting">{{ userInfo.welcomeText }}</span>
              <div class="user-actions">
                <a href="javascript:void(0)" @click="handleClick">{{ userInfo.loginText }}</a>
                <span class="divider" aria-hidden="true">|</span>
                <a href="javascript:void(0)" @click="handleClick">{{ userInfo.registerText }}</a>
              </div>
            </div>
          </div>
          <button
            class="close-btn"
            aria-label="关闭导航菜单"
            @click="closeMenu"
          >
            <el-icon aria-hidden="true">
              <Close />
            </el-icon>
          </button>
        </div>

        <!-- 快捷入口 -->
        <div class="quick-links" role="navigation" aria-label="快捷入口">
          <a
            v-for="link in quickLinks"
            :key="link.name"
            href="javascript:void(0)"
            class="quick-item"
            @click="handleClick"
          >
            <el-icon aria-hidden="true"><component :is="link.icon" /></el-icon>
            <span>{{ link.name }}</span>
          </a>
        </div>

        <!-- 分类列表 -->
        <div class="category-list" role="navigation" aria-label="商品分类">
          <div id="category-list-label" class="category-title">
            全部分类
          </div>
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="category-item"
          >
            <button
              class="category-main"
              :aria-expanded="expandedCategory === cat.id"
              :aria-controls="`category-sub-${cat.id}`"
              @click="toggleCategory(cat.id)"
            >
              <span class="cat-name">{{ cat.name }}</span>
              <el-icon class="arrow" :class="{ expanded: expandedCategory === cat.id }" aria-hidden="true">
                <ArrowDown />
              </el-icon>
            </button>

            <!-- 子分类 -->
            <transition name="expand">
              <div
                v-if="expandedCategory === cat.id"
                :id="`category-sub-${cat.id}`"
                class="category-sub"
                role="region"
                :aria-label="`${cat.name}子分类`"
              >
                <div v-for="sub in cat.children" :key="sub.title" class="sub-group">
                  <span :id="`sub-title-${sub.title}`" class="sub-title">{{ sub.title }}</span>
                  <div class="sub-links" role="list" :aria-labelledby="`sub-title-${sub.title}`">
                    <a
                      v-for="link in sub.links"
                      :key="link"
                      href="javascript:void(0)"
                      role="listitem"
                      @click="handleClick"
                    >
                      {{ link }}
                    </a>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 底部导航 -->
        <div class="menu-footer" role="navigation" aria-label="底部快捷链接">
          <a
            v-for="link in footerLinks"
            :key="link.name"
            href="javascript:void(0)"
            class="footer-item"
            @click="handleClick"
          >
            <el-icon aria-hidden="true"><component :is="link.icon" /></el-icon>
            <span>{{ link.name }}</span>
          </a>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  User, Close, ArrowDown,
  ShoppingCart, Goods, Ticket, Service,
  Location, Document, Setting
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'
import { sideCategories } from '@/mock/categories'
import {
  mobileUserInfo,
  mobileQuickLinks,
  mobileFooterLinks
} from '@/mock/navigation'

const isMenuOpen = ref(false)
const expandedCategory = ref(null)

const handleClick = () => {
  showDevelopingToast()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // 打开菜单时禁止页面滚动
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleCategory = (catId) => {
  expandedCategory.value = expandedCategory.value === catId ? null : catId
}

// 使用 mock 数据
const categories = ref(sideCategories)
const userInfo = ref(mobileUserInfo)
const quickLinks = ref(mobileQuickLinks)
const footerLinks = ref(mobileFooterLinks)
</script>

<style lang="scss" scoped>
.mobile-nav {
  display: none;

  @include respond-to(md) {
    display: flex;
    align-items: center; // 确保内容垂直居中
    flex-shrink: 0;
  }
}

// 汉堡菜单按钮
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: $spacing-xs;
  background: transparent;
  border: none;
  cursor: pointer;
  gap: 5px;

  .hamburger-line {
    width: 22px;
    height: 2px;
    background: $color-text-primary;
    border-radius: 1px;
    transition: all $transition-fast;
  }

  &.active {
    .hamburger-line:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger-line:nth-child(2) {
      opacity: 0;
    }
    .hamburger-line:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

// 遮罩层
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: $z-index-modal;
}

// 侧边抽屉
.menu-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: $color-white;
  z-index: $z-index-modal + 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 菜单头部
.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg $spacing-md;
  background: linear-gradient(135deg, $jd-red 0%, #c81623 100%);
  color: $color-white;

  .user-info {
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    .avatar {
      font-size: 40px;
      padding: $spacing-sm;
      background: rgba(255, 255, 255, 0.2);
      border-radius: $radius-round;
    }

    .user-text {
      .greeting {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
      }

      .user-actions {
        margin-top: $spacing-xs;
        font-size: $font-size-xs;

        a {
          color: rgba(255, 255, 255, 0.9);

          &:hover {
            color: $color-white;
          }
        }

        .divider {
          margin: 0 $spacing-xs;
          opacity: 0.5;
        }
      }
    }
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: $color-white;
    cursor: pointer;
    flex-shrink: 0;

    .el-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:active {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// 快捷入口
.quick-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: $spacing-md;
  border-bottom: 8px solid $bg-primary;

  .quick-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm;
    color: $color-text-primary;

    .el-icon {
      font-size: 24px;
      margin-bottom: $spacing-xs;
      color: $jd-red;
    }

    span {
      font-size: $font-size-xs;
    }

    &:active {
      background: $bg-primary;
      border-radius: $radius-md;
    }
  }
}

// 分类列表
.category-list {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .category-title {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $color-text-secondary;
    background: $bg-primary;
    position: sticky;
    top: 0;
  }

  .category-item {
    border-bottom: 1px solid $border-light;

    .category-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $spacing-md;
      cursor: pointer;

      &:active {
        background: $bg-primary;
      }

      .cat-name {
        font-size: $font-size-sm;
        color: $color-text-primary;
      }

      .arrow {
        font-size: 14px;
        color: $color-text-placeholder;
        transition: transform $transition-fast;

        &.expanded {
          transform: rotate(180deg);
        }
      }
    }

    .category-sub {
      background: $bg-primary;
      padding: $spacing-sm $spacing-md;

      .sub-group {
        margin-bottom: $spacing-sm;

        &:last-child {
          margin-bottom: 0;
        }

        .sub-title {
          display: block;
          font-size: $font-size-xs;
          font-weight: $font-weight-bold;
          color: $color-text-secondary;
          margin-bottom: $spacing-xs;
        }

        .sub-links {
          display: flex;
          flex-wrap: wrap;
          gap: $spacing-xs;

          a {
            display: inline-block;
            padding: $spacing-xs $spacing-sm;
            font-size: $font-size-xs;
            color: $color-text-secondary;
            background: $color-white;
            border-radius: $radius-sm;

            &:active {
              color: $jd-red;
              background: rgba($jd-red, 0.1);
            }
          }
        }
      }
    }
  }
}

// 底部导航
.menu-footer {
  display: flex;
  justify-content: space-around;
  padding: $spacing-md;
  border-top: 1px solid $border-light;
  background: $color-white;

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-text-secondary;

    .el-icon {
      font-size: 20px;
      margin-bottom: $spacing-xs;
    }

    span {
      font-size: $font-size-xs;
    }

    &:active {
      color: $jd-red;
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

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform $transition-normal;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.expand-enter-active,
.expand-leave-active {
  transition: all $transition-fast;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
}
</style>
