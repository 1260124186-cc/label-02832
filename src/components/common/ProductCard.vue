<template>
  <div class="product-card" @click="handleClick">
    <!-- 商品图片 -->
    <div class="product-image">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="product-img"
      />
      
      <!-- 标签 -->
      <div v-if="product.tags && product.tags.length" class="product-tags">
        <span 
          v-for="tag in product.tags" 
          :key="tag.text" 
          class="tag"
          :class="tag.type"
        >
          {{ tag.text }}
        </span>
      </div>
    </div>
    
    <!-- 商品信息 -->
    <div class="product-info">
      <!-- 商品名称 -->
      <h3 class="product-name">
        <span v-if="product.isJdLogistics" class="jd-tag">京东物流</span>
        {{ product.name }}
      </h3>
      
      <!-- 商品描述 -->
      <p v-if="product.desc" class="product-desc">{{ product.desc }}</p>
      
      <!-- 价格区域 -->
      <div class="product-price">
        <span class="price-current">
          <span class="symbol">¥</span>
          <span class="integer">{{ priceInteger }}</span>
          <span v-if="priceDecimal" class="decimal">.{{ priceDecimal }}</span>
        </span>
        <span v-if="product.originalPrice" class="price-original">
          ¥{{ product.originalPrice }}
        </span>
      </div>
      
      <!-- 评价信息 -->
      <div v-if="product.comments" class="product-comments">
        <span class="count">{{ formatComments(product.comments) }}条评价</span>
        <span v-if="product.goodRate" class="rate">好评{{ product.goodRate }}%</span>
      </div>
      
      <!-- 促销信息 -->
      <div v-if="product.promotion" class="product-promotion">
        <el-icon><Ticket /></el-icon>
        <span>{{ product.promotion }}</span>
      </div>
    </div>
    
    <!-- 悬浮操作 -->
    <div class="product-actions">
      <button class="action-btn" @click.stop="handleAddCart">
        <el-icon><ShoppingCart /></el-icon>
        <span>加入购物车</span>
      </button>
      <button class="action-btn" :class="{ collected: isCollected }" @click.stop="handleCollect">
        <el-icon><StarFilled v-if="isCollected" /><Star v-else /></el-icon>
        <span>{{ isCollected ? '已收藏' : '收藏' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Ticket, ShoppingCart, Star, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { showDevelopingToast } from '@/utils/toast'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click', 'add-cart', 'collect'])

const cartStore = useCartStore()
const isCollected = ref(false)

const priceInteger = computed(() => {
  const price = props.product.price || 0
  return Math.floor(price)
})

const priceDecimal = computed(() => {
  const price = props.product.price || 0
  const decimal = (price % 1).toFixed(2).slice(2)
  return decimal === '00' ? '' : decimal
})

const formatComments = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万+'
  }
  return count
}

const handleClick = () => {
  showDevelopingToast()
  emit('click', props.product)
}

const handleAddCart = () => {
  cartStore.addToCart(props.product)
  emit('add-cart', props.product)
  ElMessage({
    message: '已加入购物车',
    type: 'success',
    duration: 2000
  })
}

const handleCollect = () => {
  isCollected.value = !isCollected.value
  emit('collect', props.product)
  ElMessage({
    message: isCollected.value ? '收藏成功' : '已取消收藏',
    type: 'success',
    duration: 2000
  })
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  background: $color-white;
  border-radius: $radius-md;
  overflow: hidden;
  transition: all $transition-normal;
  cursor: pointer;
  
  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-4px);
    
    .product-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// 商品图片
.product-image {
  position: relative;
  height: 180px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .product-img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  
  .product-tags {
    position: absolute;
    top: $spacing-sm;
    left: $spacing-sm;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    
    .tag {
      padding: 2px 6px;
      font-size: 10px;
      border-radius: $radius-sm;
      
      &.new {
        background: #52c41a;
        color: $color-white;
      }
      
      &.sale {
        background: $jd-orange;
        color: $color-white;
      }
      
      &.plus {
        background: linear-gradient(135deg, #1a1a1a, #333);
        color: #ffd700;
      }
    }
  }
}

// 商品信息
.product-info {
  padding: $spacing-sm $spacing-md $spacing-md;
}

.product-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  color: $color-text-primary;
  line-height: $line-height-normal;
  @include ellipsis(2);
  margin-bottom: $spacing-xs;
  
  .jd-tag {
    display: inline-block;
    padding: 1px 4px;
    font-size: 10px;
    background: $jd-red;
    color: $color-white;
    border-radius: $radius-sm;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.product-desc {
  font-size: $font-size-xs;
  color: $color-text-placeholder;
  @include ellipsis;
  margin-bottom: $spacing-xs;
}

.product-price {
  display: flex;
  align-items: baseline;
  margin-bottom: $spacing-xs;
  
  .price-current {
    color: $jd-red;
    font-weight: $font-weight-bold;
    
    .symbol {
      font-size: $font-size-sm;
    }
    
    .integer {
      font-size: $font-size-xl;
    }
    
    .decimal {
      font-size: $font-size-sm;
    }
  }
  
  .price-original {
    margin-left: $spacing-sm;
    font-size: $font-size-xs;
    color: $color-text-placeholder;
    text-decoration: line-through;
  }
}

.product-comments {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-bottom: $spacing-xs;
  
  .count {
    margin-right: $spacing-sm;
  }
  
  .rate {
    color: $jd-orange;
  }
}

.product-promotion {
  display: flex;
  align-items: center;
  padding: $spacing-xs $spacing-sm;
  background: rgba($jd-red, 0.08);
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  color: $jd-red;
  
  .el-icon {
    margin-right: 4px;
  }
}

// 悬浮操作
.product-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(100%);
  transition: all $transition-normal;
  
  .action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-sm;
    color: $color-white;
    font-size: $font-size-xs;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background $transition-fast;
    
    .el-icon {
      margin-right: 4px;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &:first-child {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    &.collected {
      color: $jd-orange;
    }
  }
}
</style>
