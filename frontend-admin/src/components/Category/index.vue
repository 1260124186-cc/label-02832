<template>
  <div class="category-nav">
    <div class="container">
      <div class="category-grid">
        <a
          v-for="item in categories"
          :key="item.id"
          href="javascript:void(0)"
          class="category-item"
          @click="handleClick"
        >
          <div class="icon-wrap" :style="{ background: item.bgColor }">
            <el-icon :size="28"><component :is="item.icon" /></el-icon>
          </div>
          <span class="name">{{ item.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Iphone, Monitor, HomeFilled, Brush, Watch,
  Football, Food, Present, Van, Reading,
  Camera, Headset, Ticket, CreditCard, Service
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

// 从 mock 数据导入分类数据
import { quickCategories } from '@/mock/categories'

const handleClick = () => {
  showDevelopingToast()
}

// 使用 mock 数据
const categories = ref(quickCategories)
</script>

<style lang="scss" scoped>
.category-nav {
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: $spacing-md;
  background: $color-white;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  @include respond-to(xl) {
    grid-template-columns: repeat(5, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(5, 1fr);
    gap: $spacing-sm;
    padding: $spacing-md;
  }

  @include respond-to(md) {
    grid-template-columns: repeat(5, 1fr);
    gap: $spacing-sm;
    padding: $spacing-sm;
  }

  @include respond-to(sm) {
    grid-template-columns: repeat(5, 1fr);
    gap: $spacing-xs;
    padding: $spacing-sm;
    border-radius: $radius-md;
  }

  @include respond-to(xs) {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-xs;
  }
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-sm;
  border-radius: $radius-md;
  transition: all $transition-fast;
  min-width: 0; // 防止内容溢出

  &:hover {
    background: $bg-primary;
    transform: translateY(-2px);

    .icon-wrap {
      transform: scale(1.1);
    }
  }

  // 移动端禁用hover效果的transform
  @include respond-to(md) {
    &:hover {
      transform: none;
    }
  }

  .icon-wrap {
    width: 50px;
    height: 50px;
    border-radius: $radius-lg;
    @include flex-center;
    color: $color-white;
    margin-bottom: $spacing-sm;
    transition: transform $transition-fast;

    @include respond-to(md) {
      width: 44px;
      height: 44px;
    }

    @include respond-to(sm) {
      width: 40px;
      height: 40px;

      .el-icon {
        font-size: 22px !important;
      }
    }

    @include respond-to(xs) {
      width: 36px;
      height: 36px;
      margin-bottom: $spacing-xs;

      .el-icon {
        font-size: 20px !important;
      }
    }
  }

  .name {
    font-size: $font-size-xs;
    color: $color-text-primary;
    text-align: center;
    @include ellipsis;
    max-width: 100%;

    @include respond-to(sm) {
      font-size: 11px;
    }

    @include respond-to(xs) {
      font-size: 10px;
    }
  }
}
</style>
