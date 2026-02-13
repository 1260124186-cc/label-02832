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

const handleClick = () => {
  showDevelopingToast()
}

const categories = ref([
  { id: 1, name: '京东超市', icon: 'ShoppingCart', bgColor: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)' },
  { id: 2, name: '数码电器', icon: 'Monitor', bgColor: 'linear-gradient(135deg, #4ecdc4, #44a08d)' },
  { id: 3, name: '京东服饰', icon: 'Brush', bgColor: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { id: 4, name: '京东生鲜', icon: 'Food', bgColor: 'linear-gradient(135deg, #84fab0, #8fd3f4)' },
  { id: 5, name: '京东到家', icon: 'Van', bgColor: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { id: 6, name: '充值缴费', icon: 'CreditCard', bgColor: 'linear-gradient(135deg, #5ee7df, #b490ca)' },
  { id: 7, name: '9.9元拼', icon: 'Ticket', bgColor: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { id: 8, name: '领券中心', icon: 'Present', bgColor: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { id: 9, name: '京东国际', icon: 'Van', bgColor: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { id: 10, name: '拍卖', icon: 'Camera', bgColor: 'linear-gradient(135deg, #f6d365, #fda085)' }
])
</script>

<style lang="scss" scoped>
.category-nav {
  padding: $spacing-md 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
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
  
  @include respond-to(lg) {
    grid-template-columns: repeat(5, 1fr);
  }
  
  @include respond-to(md) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @include respond-to(sm) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-sm;
  border-radius: $radius-md;
  transition: all $transition-fast;
  
  &:hover {
    background: $bg-primary;
    transform: translateY(-2px);
    
    .icon-wrap {
      transform: scale(1.1);
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
  }
  
  .name {
    font-size: $font-size-xs;
    color: $color-text-primary;
    text-align: center;
    @include ellipsis;
  }
}
</style>
