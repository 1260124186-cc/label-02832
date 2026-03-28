<template>
  <div class="brand-zone">
    <div class="container">
      <!-- 区块标题 -->
      <div class="section-header">
        <div class="title">
          <el-icon class="icon">
            <Medal />
          </el-icon>
          <span>品牌专区</span>
        </div>
        <div class="tabs">
          <span
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </span>
        </div>
        <a href="javascript:void(0)" class="more" @click="handleClick">
          全部品牌
          <el-icon><ArrowRight /></el-icon>
        </a>
      </div>

      <!-- 品牌卡片网格 -->
      <div class="brand-grid">
        <div
          v-for="brand in displayBrands"
          :key="brand.id"
          class="brand-card"
        >
          <!-- 品牌头部 -->
          <div class="brand-header" :style="{ background: brand.bgColor }">
            <div class="brand-logo">
              <span class="logo-text">{{ brand.name.slice(0, 2) }}</span>
            </div>
            <div class="brand-info">
              <h3 class="brand-name">
                {{ brand.name }}
              </h3>
              <p class="brand-slogan">
                {{ brand.slogan }}
              </p>
            </div>
            <span v-if="brand.tag" class="brand-tag">{{ brand.tag }}</span>
          </div>

          <!-- 品牌商品 -->
          <div class="brand-products">
            <div
              v-for="product in brand.products"
              :key="product.id"
              class="product-item"
              @click="handleClick"
            >
              <div class="product-image">
                <img v-lazy-img="product.image" :alt="product.name" class="product-img">
              </div>
              <p class="product-name">
                {{ product.name }}
              </p>
              <p class="product-price">
                <span class="symbol">¥</span>
                <span class="value">{{ product.price }}</span>
              </p>
            </div>
          </div>

          <!-- 品牌活动 -->
          <div class="brand-activity">
            <span class="activity-tag">{{ brand.activity }}</span>
            <a href="javascript:void(0)" class="shop-link" @click="handleClick">
              进入店铺
              <el-icon><ArrowRight /></el-icon>
            </a>
          </div>
        </div>
      </div>

      <!-- 更多品牌入口 -->
      <div class="brand-more">
        <div
          v-for="item in moreBrands"
          :key="item.id"
          class="more-item"
          @click="handleClick"
        >
          <div class="more-logo" :style="{ background: item.bgColor }">
            <span>{{ item.name.slice(0, 2) }}</span>
          </div>
          <span class="more-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Medal, ArrowRight } from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

// 从 mock 数据导入
import {
  brandTabs,
  allBrands as mockAllBrands,
  phoneBrands as mockPhoneBrands,
  applianceBrands as mockApplianceBrands,
  beautyBrands as mockBeautyBrands,
  fashionBrands as mockFashionBrands,
  moreBrands as mockMoreBrands
} from '@/mock/brands'

const activeTab = ref('all')

const handleClick = () => {
  showDevelopingToast()
}

// 使用 mock 数据
const tabs = ref(brandTabs)
const allBrands = ref(mockAllBrands)
const phoneBrands = ref(mockPhoneBrands)
const applianceBrands = ref(mockApplianceBrands)
const beautyBrands = ref(mockBeautyBrands)
const fashionBrands = ref(mockFashionBrands)
const moreBrands = ref(mockMoreBrands)

// 根据Tab切换显示不同品牌
const displayBrands = computed(() => {
  switch (activeTab.value) {
    case 'phone':
      return phoneBrands.value
    case 'appliance':
      return applianceBrands.value
    case 'beauty':
      return beautyBrands.value
    case 'fashion':
      return fashionBrands.value
    default:
      return allBrands.value
  }
})
</script>

<style lang="scss" scoped>
.brand-zone {
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
      color: $jd-orange;
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

// 品牌卡片网格
.brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  @include respond-to(lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(md) {
    grid-template-columns: 1fr;
  }
}

.brand-card {
  background: $color-white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: all $transition-normal;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-4px);
  }

  .brand-header {
    position: relative;
    display: flex;
    align-items: center;
    padding: $spacing-md;
    color: $color-white;

    .brand-logo {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: $radius-md;
      @include flex-center;
      flex-shrink: 0;

      .logo-text {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
      }
    }

    .brand-info {
      flex: 1;
      margin-left: $spacing-sm;
      overflow: hidden;

      .brand-name {
        font-size: $font-size-base;
        font-weight: $font-weight-bold;
        margin-bottom: 2px;
      }

      .brand-slogan {
        font-size: $font-size-xs;
        opacity: 0.8;
        @include ellipsis;
      }
    }

    .brand-tag {
      position: absolute;
      top: $spacing-sm;
      right: $spacing-sm;
      padding: 2px 6px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: $radius-sm;
      font-size: 10px;
    }
  }

  .brand-products {
    display: flex;
    padding: $spacing-sm;
    gap: $spacing-sm;

    .product-item {
      flex: 1;
      text-align: center;
      cursor: pointer;
      padding: $spacing-xs;
      border-radius: $radius-sm;
      transition: background $transition-fast;

      &:hover {
        background: $bg-primary;
      }

      .product-image {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: $spacing-xs;
        background: #f9f9f9;
        border-radius: $radius-sm;

        .product-img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
      }

      .product-name {
        font-size: 10px;
        color: $color-text-secondary;
        @include ellipsis;
        margin-bottom: 2px;
      }

      .product-price {
        color: $jd-red;
        font-size: $font-size-xs;
        font-weight: $font-weight-bold;

        .symbol {
          font-size: 10px;
        }
      }
    }
  }

  .brand-activity {
    @include flex-between;
    padding: $spacing-sm $spacing-md;
    border-top: 1px solid $border-light;

    .activity-tag {
      font-size: $font-size-xs;
      color: $jd-red;
      padding: 2px 6px;
      background: rgba($jd-red, 0.08);
      border-radius: $radius-sm;
    }

    .shop-link {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      color: $color-text-secondary;

      .el-icon {
        margin-left: 2px;
        font-size: 10px;
      }

      &:hover {
        color: $jd-red;
      }
    }
  }
}

// 更多品牌
.brand-more {
  display: flex;
  justify-content: space-between;
  padding: $spacing-md $spacing-lg;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  .more-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform $transition-fast;

    &:hover {
      transform: translateY(-2px);

      .more-logo {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    .more-logo {
      width: 48px;
      height: 48px;
      border-radius: $radius-md;
      @include flex-center;
      color: $color-white;
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
      transition: box-shadow $transition-fast;
    }

    .more-name {
      font-size: $font-size-xs;
      color: $color-text-secondary;
    }
  }
}
</style>
