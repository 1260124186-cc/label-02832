<template>
  <div class="flash-sale">
    <div class="container">
      <div class="flash-sale-wrapper">
        <!-- 左侧标题区 -->
        <div class="flash-header">
          <div class="title-area">
            <h2 class="title">
              <el-icon><AlarmClock /></el-icon>
              {{ config.title }}
            </h2>
            <p class="subtitle">{{ config.subtitle }}</p>
          </div>
          
          <!-- 倒计时 -->
          <div class="countdown">
            <span class="label">距结束</span>
            <div class="time-blocks">
              <span class="time-block">{{ countdown.hours }}</span>
              <span class="separator">:</span>
              <span class="time-block">{{ countdown.minutes }}</span>
              <span class="separator">:</span>
              <span class="time-block">{{ countdown.seconds }}</span>
            </div>
          </div>
          
          <a href="javascript:void(0)" class="more-link" @click="handleClick">
            更多秒杀
            <el-icon><ArrowRight /></el-icon>
          </a>
        </div>
        
        <!-- 商品列表 -->
        <div class="flash-products">
          <div 
            v-for="product in flashProducts" 
            :key="product.id"
            class="flash-item"
          >
            <!-- 图片区域 - 使用懒加载 -->
            <div class="item-image">
              <img v-lazy-img="product.image" :alt="product.name" class="product-img" />
            </div>
            
            <!-- 商品信息区域 -->
            <div class="item-info">
              <!-- 折扣标签放在商品名称上方 -->
              <div class="discount-row">
                <span v-if="product.discount" class="discount-tag">{{ product.discount }}折</span>
              </div>
              <p class="item-name">{{ product.name }}</p>
              <div class="item-price">
                <span class="price-current">
                  <span class="symbol">¥</span>
                  <span class="value">{{ product.price }}</span>
                </span>
                <span class="price-original">¥{{ product.originalPrice }}</span>
              </div>
              
              <!-- 进度条 -->
              <div class="progress-wrap">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: product.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">
                  {{ product.progress >= 80 ? '即将售罄' : `已抢${product.progress}%` }}
                </span>
              </div>
              
              <button 
                class="grab-btn"
                :class="{ 'sold-out': product.progress >= 100 }"
                :disabled="product.progress >= 100"
                @click="handleGrab(product)"
              >
                {{ product.progress >= 100 ? '已抢光' : '立即抢购' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { AlarmClock, ArrowRight } from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

// 从 mock 数据导入
import { 
  flashSaleConfig, 
  flashSaleProducts, 
  getFlashSaleRemainingTime,
  formatCountdown 
} from '@/mock/flashSale'

const countdown = ref({
  hours: '02',
  minutes: '30',
  seconds: '00'
})

let countdownTimer = null

const handleClick = () => {
  showDevelopingToast()
}

const handleGrab = (product) => {
  if (product.progress < 100) {
    showDevelopingToast()
  }
}

// 使用 mock 数据
const config = ref(flashSaleConfig)
const flashProducts = ref(flashSaleProducts)

const startCountdown = () => {
  // 从 mock 数据获取剩余时间
  let totalSeconds = getFlashSaleRemainingTime()
  
  // 初始化倒计时显示
  countdown.value = formatCountdown(totalSeconds)
  
  countdownTimer = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownTimer)
      return
    }
    
    totalSeconds--
    countdown.value = formatCountdown(totalSeconds)
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style lang="scss" scoped>
.flash-sale {
  padding: $spacing-lg 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
}

.flash-sale-wrapper {
  display: flex;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  overflow: hidden;
}

// 左侧标题区
.flash-header {
  width: 200px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #e1251b 0%, #c81623 100%);
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $color-white;
  
  .title-area {
    margin-bottom: $spacing-lg;
    
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-xs;
      
      .el-icon {
        margin-right: $spacing-xs;
      }
    }
    
    .subtitle {
      font-size: $font-size-xs;
      opacity: 0.8;
    }
  }
  
  .countdown {
    margin-bottom: $spacing-lg;
    
    .label {
      display: block;
      font-size: $font-size-xs;
      margin-bottom: $spacing-sm;
      opacity: 0.8;
    }
    
    .time-blocks {
      display: flex;
      align-items: center;
      justify-content: center;
      
      .time-block {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: $radius-sm;
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
      }
      
      .separator {
        margin: 0 4px;
        font-weight: $font-weight-bold;
      }
    }
  }
  
  .more-link {
    display: flex;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    background: rgba(255, 255, 255, 0.2);
    border-radius: $radius-lg;
    color: $color-white;
    font-size: $font-size-sm;
    transition: background $transition-fast;
    
    .el-icon {
      margin-left: 4px;
      font-size: 12px;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// 商品列表
.flash-products {
  flex: 1;
  display: flex;
  padding: $spacing-md;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
}

.flash-item {
  flex-shrink: 0;
  width: 160px;
  padding: $spacing-sm;
  margin-right: $spacing-md;
  border-radius: $radius-md;
  transition: all $transition-fast;
  background: $color-white;
  border: 1px solid transparent;
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    background: $bg-primary;
    border-color: $border-light;
    transform: translateY(-2px);
  }
  
  .item-image {
    width: 100%;
    height: 120px;
    margin-bottom: $spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
    border-radius: $radius-md;
    overflow: hidden;
    
    .product-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .item-info {
    text-align: center;
    
    .discount-row {
      height: 20px;
      margin-bottom: 4px;
      
      .discount-tag {
        display: inline-block;
        padding: 2px 8px;
        background: linear-gradient(135deg, $jd-red, $jd-orange);
        color: $color-white;
        font-size: 10px;
        font-weight: $font-weight-bold;
        border-radius: $radius-sm;
      }
    }
    
    .item-name {
      font-size: $font-size-sm;
      color: $color-text-primary;
      @include ellipsis;
      margin-bottom: $spacing-xs;
      height: 20px;
      line-height: 20px;
    }
    
    .item-price {
      margin-bottom: $spacing-xs;
      
      .price-current {
        color: $jd-red;
        font-weight: $font-weight-bold;
        
        .symbol {
          font-size: $font-size-xs;
        }
        
        .value {
          font-size: $font-size-lg;
        }
      }
      
      .price-original {
        margin-left: $spacing-xs;
        font-size: $font-size-xs;
        color: $color-text-placeholder;
        text-decoration: line-through;
      }
    }
    
    .progress-wrap {
      margin-bottom: $spacing-sm;
      
      .progress-bar {
        height: 6px;
        background: #ffe0de;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 4px;
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, $jd-orange, $jd-red);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
      }
      
      .progress-text {
        font-size: 10px;
        color: $jd-red;
      }
    }
    
    .grab-btn {
      width: 100%;
      padding: $spacing-xs $spacing-sm;
      background: linear-gradient(135deg, $jd-red, $jd-red-dark);
      color: $color-white;
      border: none;
      border-radius: $radius-md;
      font-size: $font-size-xs;
      cursor: pointer;
      transition: all $transition-fast;
      
      &:hover:not(:disabled) {
        transform: scale(1.02);
        box-shadow: 0 2px 8px rgba($jd-red, 0.4);
      }
      
      &:active:not(:disabled) {
        transform: scale(0.98);
      }
      
      &.sold-out {
        background: $color-text-placeholder;
        cursor: not-allowed;
      }
    }
  }
}
</style>
