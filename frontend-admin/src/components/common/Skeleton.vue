<template>
  <div class="skeleton" :class="[`skeleton-${variant}`, { animated: animate }]">
    <!-- 图片骨架 -->
    <template v-if="variant === 'image'">
      <div class="skeleton-image" :style="imageStyle" />
    </template>

    <!-- 文本骨架 -->
    <template v-else-if="variant === 'text'">
      <div
        v-for="n in rows"
        :key="n"
        class="skeleton-text"
        :style="{ width: n === rows ? lastRowWidth : '100%' }"
      />
    </template>

    <!-- 头像骨架 -->
    <template v-else-if="variant === 'avatar'">
      <div class="skeleton-avatar" :class="`avatar-${avatarShape}`" :style="avatarStyle" />
    </template>

    <!-- 按钮骨架 -->
    <template v-else-if="variant === 'button'">
      <div class="skeleton-button" :style="buttonStyle" />
    </template>

    <!-- 商品卡片骨架 -->
    <template v-else-if="variant === 'product-card'">
      <div class="skeleton-product-card">
        <div class="skeleton-product-image" />
        <div class="skeleton-product-info">
          <div class="skeleton-text" style="width: 100%" />
          <div class="skeleton-text" style="width: 80%" />
          <div class="skeleton-text" style="width: 40%" />
        </div>
      </div>
    </template>

    <!-- 品牌卡片骨架 -->
    <template v-else-if="variant === 'brand-card'">
      <div class="skeleton-brand-card">
        <div class="skeleton-brand-header">
          <div class="skeleton-avatar avatar-square" style="width: 48px; height: 48px" />
          <div class="skeleton-brand-info">
            <div class="skeleton-text" style="width: 60%" />
            <div class="skeleton-text" style="width: 80%" />
          </div>
        </div>
        <div class="skeleton-brand-products">
          <div v-for="n in 3" :key="n" class="skeleton-mini-product">
            <div class="skeleton-image" style="height: 70px" />
            <div class="skeleton-text" style="width: 80%" />
            <div class="skeleton-text" style="width: 50%" />
          </div>
        </div>
        <div class="skeleton-brand-footer">
          <div class="skeleton-text" style="width: 30%" />
          <div class="skeleton-text" style="width: 20%" />
        </div>
      </div>
    </template>

    <!-- 秒杀商品骨架 -->
    <template v-else-if="variant === 'flash-item'">
      <div class="skeleton-flash-item">
        <div class="skeleton-image" style="height: 120px" />
        <div class="skeleton-flash-info">
          <div class="skeleton-text" style="width: 40%; height: 20px" />
          <div class="skeleton-text" style="width: 80%" />
          <div class="skeleton-text" style="width: 60%" />
          <div class="skeleton-text" style="width: 100%; height: 6px" />
          <div class="skeleton-button" style="width: 100%; height: 28px" />
        </div>
      </div>
    </template>

    <!-- 轮播图骨架 -->
    <template v-else-if="variant === 'banner'">
      <div class="skeleton-banner">
        <div class="skeleton-banner-side" />
        <div class="skeleton-banner-main" />
        <div class="skeleton-banner-info">
          <div class="skeleton-avatar" style="width: 60px; height: 60px" />
          <div class="skeleton-text" style="width: 60%" />
          <div class="skeleton-text" style="width: 80%" />
        </div>
      </div>
    </template>

    <!-- 分类导航骨架 -->
    <template v-else-if="variant === 'category-nav'">
      <div class="skeleton-category-nav">
        <div v-for="n in 10" :key="n" class="skeleton-category-item">
          <div class="skeleton-avatar" style="width: 48px; height: 48px" />
          <div class="skeleton-text" style="width: 60px" />
        </div>
      </div>
    </template>

    <!-- 自定义插槽 -->
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 骨架类型
  variant: {
    type: String,
    default: 'text',
    validator: (value) => [
      'text', 'image', 'avatar', 'button',
      'product-card', 'brand-card', 'flash-item',
      'banner', 'category-nav', 'custom'
    ].includes(value)
  },
  // 是否显示动画
  animate: {
    type: Boolean,
    default: true
  },
  // 文本行数
  rows: {
    type: Number,
    default: 3
  },
  // 最后一行宽度
  lastRowWidth: {
    type: String,
    default: '60%'
  },
  // 图片宽度
  imageWidth: {
    type: String,
    default: '100%'
  },
  // 图片高度
  imageHeight: {
    type: String,
    default: '180px'
  },
  // 头像大小
  avatarSize: {
    type: String,
    default: '40px'
  },
  // 头像形状
  avatarShape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'square'].includes(value)
  },
  // 按钮宽度
  buttonWidth: {
    type: String,
    default: '80px'
  },
  // 按钮高度
  buttonHeight: {
    type: String,
    default: '32px'
  }
})

const imageStyle = computed(() => ({
  width: props.imageWidth,
  height: props.imageHeight
}))

const avatarStyle = computed(() => ({
  width: props.avatarSize,
  height: props.avatarSize
}))

const buttonStyle = computed(() => ({
  width: props.buttonWidth,
  height: props.buttonHeight
}))
</script>

<style lang="scss" scoped>
// 基础骨架样式
.skeleton {
  &.animated {
    .skeleton-text,
    .skeleton-image,
    .skeleton-avatar,
    .skeleton-button,
    .skeleton-product-image,
    .skeleton-banner-side,
    .skeleton-banner-main,
    .skeleton-banner-info {
      background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// 文本骨架
.skeleton-text {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

// 图片骨架
.skeleton-image {
  background: #f0f0f0;
  border-radius: 8px;
}

// 头像骨架
.skeleton-avatar {
  background: #f0f0f0;

  &.avatar-circle {
    border-radius: 50%;
  }

  &.avatar-square {
    border-radius: 8px;
  }
}

// 按钮骨架
.skeleton-button {
  background: #f0f0f0;
  border-radius: 4px;
}

// 商品卡片骨架
.skeleton-product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  .skeleton-product-image {
    height: 180px;
    background: #f0f0f0;
  }

  .skeleton-product-info {
    padding: 12px;

    .skeleton-text {
      height: 14px;
      margin-bottom: 8px;

      &:last-child {
        height: 20px;
        margin-top: 12px;
      }
    }
  }
}

// 品牌卡片骨架
.skeleton-brand-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  .skeleton-brand-header {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #f5f5f5;

    .skeleton-brand-info {
      flex: 1;
      margin-left: 12px;

      .skeleton-text {
        height: 14px;
        margin-bottom: 8px;

        &:last-child {
          height: 12px;
          margin-bottom: 0;
        }
      }
    }
  }

  .skeleton-brand-products {
    display: flex;
    padding: 12px;
    gap: 12px;

    .skeleton-mini-product {
      flex: 1;
      text-align: center;

      .skeleton-image {
        margin-bottom: 8px;
        border-radius: 4px;
      }

      .skeleton-text {
        height: 10px;
        margin: 0 auto 4px;

        &:last-child {
          height: 12px;
        }
      }
    }
  }

  .skeleton-brand-footer {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;

    .skeleton-text {
      height: 12px;
      margin-bottom: 0;
    }
  }
}

// 秒杀商品骨架
.skeleton-flash-item {
  width: 160px;
  padding: 12px;

  .skeleton-image {
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .skeleton-flash-info {
    text-align: center;

    .skeleton-text {
      margin: 0 auto 8px;
      height: 14px;

      &:first-child {
        height: 20px;
      }
    }

    .skeleton-button {
      margin-top: 12px;
      border-radius: 6px;
    }
  }
}

// 轮播图骨架
.skeleton-banner {
  display: flex;
  height: 460px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  .skeleton-banner-side {
    width: 210px;
    background: #e8e8e8;
    flex-shrink: 0;
  }

  .skeleton-banner-main {
    flex: 1;
    background: #f0f0f0;
  }

  .skeleton-banner-info {
    width: 210px;
    flex-shrink: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .skeleton-avatar {
      margin-bottom: 16px;
    }

    .skeleton-text {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 992px) {
    height: 380px;

    .skeleton-banner-side,
    .skeleton-banner-info {
      width: 180px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;

    .skeleton-banner-side,
    .skeleton-banner-info {
      display: none;
    }

    .skeleton-banner-main {
      height: 280px;
    }
  }
}

// 分类导航骨架
.skeleton-category-nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  border-radius: 12px;

  .skeleton-category-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .skeleton-avatar {
      margin-bottom: 8px;
      border-radius: 12px;
    }

    .skeleton-text {
      height: 12px;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 16px;

    .skeleton-category-item {
      width: calc(20% - 13px);
    }
  }
}
</style>
