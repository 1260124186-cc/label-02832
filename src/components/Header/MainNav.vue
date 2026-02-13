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

const showCategory = ref(false)
const activeCategory = ref(0)

const handleClick = () => {
  showDevelopingToast()
}

const categories = ref([
  {
    id: 1,
    name: '手机/运营商/数码',
    icon: 'Iphone',
    children: [
      { name: '手机通讯', items: ['手机', '游戏手机', '5G手机', '拍照手机', '老人机'] },
      { name: '运营商', items: ['合约机', '选号', '办套餐', '话费充值'] },
      { name: '手机配件', items: ['手机壳', '贴膜', '充电器', '数据线', '移动电源'] }
    ]
  },
  {
    id: 2,
    name: '电脑/办公',
    icon: 'Monitor',
    children: [
      { name: '电脑整机', items: ['笔记本', '游戏本', '台式机', '一体机', '服务器'] },
      { name: '电脑配件', items: ['显示器', '显卡', 'CPU', '内存', '硬盘'] },
      { name: '外设产品', items: ['键盘', '鼠标', '音箱', '耳机', '摄像头'] }
    ]
  },
  {
    id: 3,
    name: '家用电器',
    icon: 'HomeFilled',
    children: [
      { name: '大家电', items: ['电视', '空调', '冰箱', '洗衣机', '热水器'] },
      { name: '厨房电器', items: ['油烟机', '燃气灶', '消毒柜', '洗碗机', '微波炉'] },
      { name: '生活电器', items: ['吸尘器', '空气净化器', '加湿器', '电风扇', '取暖器'] }
    ]
  },
  {
    id: 4,
    name: '家居/家具/家装',
    icon: 'HomeFilled',
    children: [
      { name: '家纺', items: ['四件套', '被子', '枕头', '毛巾', '窗帘'] },
      { name: '家具', items: ['沙发', '床', '餐桌', '衣柜', '书桌'] },
      { name: '灯具', items: ['吸顶灯', '吊灯', '台灯', '落地灯', '筒灯'] }
    ]
  },
  {
    id: 5,
    name: '男装/女装/童装',
    icon: 'Brush',
    children: [
      { name: '男装', items: ['T恤', '衬衫', '外套', '裤子', '牛仔裤'] },
      { name: '女装', items: ['连衣裙', '半身裙', '衬衫', '外套', '裤子'] },
      { name: '童装', items: ['婴儿服', '儿童T恤', '儿童裤子', '儿童外套'] }
    ]
  },
  {
    id: 6,
    name: '美妆/个护清洁',
    icon: 'Brush',
    children: [
      { name: '面部护肤', items: ['洁面', '化妆水', '乳液', '面霜', '精华'] },
      { name: '彩妆', items: ['口红', '粉底', '眼影', '睫毛膏', '腮红'] },
      { name: '个人护理', items: ['洗发水', '沐浴露', '牙膏', '香水'] }
    ]
  },
  {
    id: 7,
    name: '女鞋/箱包/钟表',
    icon: 'Watch',
    children: [
      { name: '女鞋', items: ['高跟鞋', '单鞋', '靴子', '运动鞋', '凉鞋'] },
      { name: '箱包', items: ['双肩包', '单肩包', '手提包', '钱包', '旅行箱'] },
      { name: '钟表', items: ['机械表', '石英表', '智能手表', '挂钟'] }
    ]
  },
  {
    id: 8,
    name: '男鞋/运动/户外',
    icon: 'Football',
    children: [
      { name: '男鞋', items: ['休闲鞋', '皮鞋', '运动鞋', '凉鞋', '拖鞋'] },
      { name: '运动', items: ['跑步鞋', '篮球鞋', '足球鞋', '运动服', '健身器材'] },
      { name: '户外', items: ['冲锋衣', '登山鞋', '帐篷', '睡袋', '户外装备'] }
    ]
  },
  {
    id: 9,
    name: '食品/酒类/生鲜',
    icon: 'Food',
    children: [
      { name: '零食', items: ['坚果', '饼干', '糖果', '巧克力', '蜜饯'] },
      { name: '酒类', items: ['白酒', '红酒', '啤酒', '洋酒', '黄酒'] },
      { name: '生鲜', items: ['水果', '蔬菜', '肉类', '海鲜', '蛋奶'] }
    ]
  },
  {
    id: 10,
    name: '母婴/玩具乐器',
    icon: 'Present',
    children: [
      { name: '奶粉', items: ['婴儿奶粉', '儿童奶粉', '孕妇奶粉'] },
      { name: '尿裤', items: ['纸尿裤', '拉拉裤', '湿巾'] },
      { name: '玩具', items: ['积木', '遥控车', '毛绒玩具', '益智玩具'] }
    ]
  }
])

const navLinks = ref([
  { name: '秒杀', url: '#' },
  { name: '优惠券', url: '#' },
  { name: 'PLUS会员', url: '#' },
  { name: '闪购', url: '#' },
  { name: '拍卖', url: '#' },
  { name: '京东超市', url: '#' },
  { name: '京东生鲜', url: '#' },
  { name: '京东到家', url: '#' },
  { name: '京东国际', url: '#' }
])
</script>

<style lang="scss" scoped>
.main-nav {
  background: $jd-red;
  
  .container {
    display: flex;
    align-items: center;
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
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
  
  .el-icon {
    font-size: 18px;
    margin-right: $spacing-sm;
  }
  
  span {
    font-size: $font-size-base;
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
  
  .category-item {
    position: relative;
    
    .category-main {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      color: $color-text-primary;
      border-left: 2px solid transparent;
      transition: all $transition-fast;
      
      .el-icon {
        font-size: 16px;
        margin-right: $spacing-sm;
        color: $color-text-secondary;
      }
      
      span {
        flex: 1;
        font-size: $font-size-sm;
        @include ellipsis;
      }
      
      .arrow {
        font-size: 12px;
        color: $color-text-placeholder;
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
      
      .sub-group {
        width: 50%;
        margin-bottom: $spacing-md;
        
        h4 {
          font-size: $font-size-sm;
          font-weight: $font-weight-bold;
          color: $color-text-primary;
          margin-bottom: $spacing-sm;
          padding-bottom: $spacing-xs;
          border-bottom: 1px solid $border-light;
        }
        
        .sub-items {
          a {
            display: inline-block;
            padding: $spacing-xs $spacing-sm;
            font-size: $font-size-xs;
            color: $color-text-secondary;
            
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
  
  a {
    position: relative;
    padding: 0 $spacing-md;
    height: 45px;
    line-height: 45px;
    font-size: $font-size-sm;
    color: $color-white;
    transition: background $transition-fast;
    
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
