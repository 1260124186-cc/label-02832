<template>
  <div class="banner-section">
    <div class="container">
      <div class="banner-wrapper">
        <!-- 左侧分类菜单 -->
        <div class="side-category">
          <div 
            v-for="(cat, index) in sideCategories" 
            :key="cat.id"
            class="category-item"
            @mouseenter="activeSideCategory = index"
            @mouseleave="activeSideCategory = -1"
          >
            <span class="cat-name">{{ cat.name }}</span>
            <el-icon class="arrow"><ArrowRight /></el-icon>
            
            <!-- 子分类浮层 -->
            <transition name="slide-right">
              <div v-if="activeSideCategory === index" class="sub-panel">
                <div v-for="sub in cat.children" :key="sub.title" class="sub-group">
                  <h4>{{ sub.title }}</h4>
                  <div class="sub-links">
                    <a v-for="link in sub.links" :key="link" href="javascript:void(0)" @click="handleClick">{{ link }}</a>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        
        <!-- 中间轮播图 -->
        <div class="main-carousel">
          <div class="carousel-container">
            <div 
              class="carousel-track" 
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(slide, index) in slides" 
                :key="index" 
                class="carousel-slide"
                :style="{ background: slide.bgColor }"
              >
                <div class="slide-content">
                  <div class="slide-text">
                    <h2>{{ slide.title }}</h2>
                    <p>{{ slide.subtitle }}</p>
                    <button class="slide-btn" @click="handleClick">{{ slide.btnText }}</button>
                  </div>
                  <div class="slide-image">
                    <div class="image-placeholder" :style="{ background: slide.imgBg }">
                      <el-icon :size="60"><component :is="slide.icon" /></el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 轮播控制 -->
            <button class="carousel-btn prev" @click="prevSlide">
              <el-icon><ArrowLeft /></el-icon>
            </button>
            <button class="carousel-btn next" @click="nextSlide">
              <el-icon><ArrowRight /></el-icon>
            </button>
            
            <!-- 轮播指示器 -->
            <div class="carousel-dots">
              <span 
                v-for="(_, index) in slides" 
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)"
              ></span>
            </div>
          </div>
        </div>
        
        <!-- 右侧信息栏 -->
        <div class="side-info">
          <!-- 用户信息 -->
          <div class="user-box">
            <div class="user-avatar">
              <el-icon :size="40"><User /></el-icon>
            </div>
            <p class="user-greeting">Hi，欢迎来到京东！</p>
            <div class="user-actions">
              <button class="btn-login" @click="handleClick">登录</button>
              <button class="btn-register" @click="handleClick">注册</button>
            </div>
            <div class="user-links">
              <a href="javascript:void(0)" @click="handleClick">新人福利</a>
              <a href="javascript:void(0)" @click="handleClick">PLUS会员</a>
            </div>
          </div>
          
          <!-- 京东快报 -->
          <div class="news-box">
            <div class="news-header">
              <span class="title">京东快报</span>
              <a href="javascript:void(0)" class="more" @click="handleClick">更多</a>
            </div>
            <ul class="news-list">
              <li v-for="news in newsList" :key="news.id">
                <span class="tag" :class="news.tagType">{{ news.tag }}</span>
                <a href="javascript:void(0)" @click="handleClick">{{ news.title }}</a>
              </li>
            </ul>
          </div>
          
          <!-- 服务入口 -->
          <div class="service-box">
            <a v-for="service in services" :key="service.name" href="javascript:void(0)" class="service-item" @click="handleClick">
              <el-icon><component :is="service.icon" /></el-icon>
              <span>{{ service.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  ArrowRight, ArrowLeft, User, Iphone, Monitor, 
  HomeFilled, ShoppingCart, Ticket, Service, 
  CreditCard, Van, Present, Goods
} from '@element-plus/icons-vue'
import { showDevelopingToast } from '@/utils/toast'

const currentSlide = ref(0)
const activeSideCategory = ref(-1)
let autoPlayTimer = null

const handleClick = () => {
  showDevelopingToast()
}

const slides = ref([
  {
    title: 'iPhone 15 Pro Max',
    subtitle: '钛金属设计，A17 Pro芯片',
    btnText: '立即抢购',
    bgColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    imgBg: 'rgba(255,255,255,0.1)',
    icon: 'Iphone'
  },
  {
    title: '京东超级品牌日',
    subtitle: '大牌狂欢，低至5折',
    btnText: '查看详情',
    bgColor: 'linear-gradient(135deg, #e1251b 0%, #c81623 100%)',
    imgBg: 'rgba(255,255,255,0.2)',
    icon: 'Present'
  },
  {
    title: '家电焕新季',
    subtitle: '以旧换新，补贴高达1000元',
    btnText: '立即参与',
    bgColor: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
    imgBg: 'rgba(255,255,255,0.1)',
    icon: 'HomeFilled'
  },
  {
    title: '电脑数码节',
    subtitle: '游戏本直降2000，限时特惠',
    btnText: '马上抢',
    bgColor: 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
    imgBg: 'rgba(255,255,255,0.15)',
    icon: 'Monitor'
  }
])

const sideCategories = ref([
  { 
    id: 1, 
    name: '手机/数码/配件',
    children: [
      { title: '手机通讯', links: ['手机', '游戏手机', '拍照手机', '5G手机', '老人机', '对讲机'] },
      { title: '手机配件', links: ['手机壳', '贴膜', '充电器', '数据线', '移动电源', '手机支架'] },
      { title: '智能设备', links: ['智能手表', '智能手环', '智能眼镜', 'VR设备', '智能家居'] },
      { title: '数码配件', links: ['存储卡', '读卡器', '数码相框', '录音笔', '电子词典'] }
    ]
  },
  { 
    id: 2, 
    name: '电脑/办公/外设',
    children: [
      { title: '电脑整机', links: ['笔记本', '游戏本', '台式机', '一体机', '服务器', '工作站'] },
      { title: '电脑配件', links: ['显卡', 'CPU', '主板', '内存', '硬盘', '机箱', '电源'] },
      { title: '外设产品', links: ['键盘', '鼠标', '显示器', '音箱', '耳机', '摄像头', '麦克风'] },
      { title: '办公设备', links: ['打印机', '投影仪', '扫描仪', '复印机', '碎纸机', '考勤机'] }
    ]
  },
  { 
    id: 3, 
    name: '家用电器',
    children: [
      { title: '大家电', links: ['电视', '空调', '冰箱', '洗衣机', '热水器', '油烟机'] },
      { title: '厨房电器', links: ['电饭煲', '微波炉', '电磁炉', '烤箱', '榨汁机', '豆浆机'] },
      { title: '生活电器', links: ['吸尘器', '空气净化器', '加湿器', '电风扇', '取暖器', '扫地机器人'] },
      { title: '个护健康', links: ['剃须刀', '电吹风', '美容仪', '按摩器', '体重秤', '血压计'] }
    ]
  },
  { 
    id: 4, 
    name: '家居/家具/家装',
    children: [
      { title: '家纺', links: ['四件套', '被子', '枕头', '毛巾', '窗帘', '地毯', '凉席'] },
      { title: '家具', links: ['沙发', '床', '餐桌', '衣柜', '书桌', '鞋柜', '茶几'] },
      { title: '灯具', links: ['吸顶灯', '吊灯', '台灯', '落地灯', '射灯', '壁灯'] },
      { title: '家装建材', links: ['瓷砖', '地板', '油漆', '壁纸', '五金', '开关插座'] }
    ]
  },
  { 
    id: 5, 
    name: '男装/女装/内衣',
    children: [
      { title: '男装', links: ['T恤', '衬衫', '外套', '夹克', '牛仔裤', '休闲裤', '西装'] },
      { title: '女装', links: ['连衣裙', '半身裙', '衬衫', '外套', '毛衣', '卫衣', '羽绒服'] },
      { title: '内衣', links: ['文胸', '内裤', '保暖内衣', '睡衣', '家居服', '袜子'] },
      { title: '配饰', links: ['帽子', '围巾', '手套', '腰带', '领带', '太阳镜'] }
    ]
  },
  { 
    id: 6, 
    name: '美妆/护肤/个护',
    children: [
      { title: '护肤', links: ['洁面', '化妆水', '乳液', '面霜', '精华', '面膜', '眼霜'] },
      { title: '彩妆', links: ['口红', '粉底', '眼影', '腮红', '眉笔', '睫毛膏', '卸妆'] },
      { title: '香水', links: ['女士香水', '男士香水', '中性香水', '香水套装', '车载香薰'] },
      { title: '个人护理', links: ['洗发水', '沐浴露', '牙膏', '牙刷', '漱口水', '身体乳'] }
    ]
  },
  { 
    id: 7, 
    name: '运动/户外/鞋靴',
    children: [
      { title: '运动鞋', links: ['跑步鞋', '篮球鞋', '足球鞋', '休闲鞋', '板鞋', '帆布鞋'] },
      { title: '运动服饰', links: ['运动套装', '运动T恤', '运动裤', '瑜伽服', '泳装'] },
      { title: '户外装备', links: ['冲锋衣', '帐篷', '睡袋', '登山杖', '户外鞋', '背包'] },
      { title: '健身器材', links: ['跑步机', '动感单车', '哑铃', '瑜伽垫', '拉力器', '仰卧板'] }
    ]
  },
  { 
    id: 8, 
    name: '食品/生鲜/酒水',
    children: [
      { title: '零食', links: ['坚果', '饼干', '糖果', '巧克力', '蜜饯', '肉干', '膨化食品'] },
      { title: '酒水', links: ['白酒', '红酒', '啤酒', '洋酒', '黄酒', '清酒', '果酒'] },
      { title: '生鲜', links: ['水果', '蔬菜', '肉类', '海鲜', '蛋奶', '豆制品'] },
      { title: '饮料冲调', links: ['牛奶', '咖啡', '茶叶', '果汁', '矿泉水', '功能饮料'] }
    ]
  },
  { 
    id: 9, 
    name: '母婴/玩具/童装',
    children: [
      { title: '奶粉辅食', links: ['婴儿奶粉', '儿童奶粉', '米粉', '果泥', '营养品'] },
      { title: '尿裤湿巾', links: ['纸尿裤', '拉拉裤', '湿巾', '棉柔巾', '隔尿垫'] },
      { title: '玩具', links: ['积木', '遥控车', '毛绒玩具', '益智玩具', '户外玩具', '电动玩具'] },
      { title: '童装童鞋', links: ['婴儿服', '儿童T恤', '儿童裤子', '童鞋', '书包'] }
    ]
  },
  { 
    id: 10, 
    name: '图书/音像/电子书',
    children: [
      { title: '图书', links: ['小说', '文学', '经管', '教育', '童书', '科技', '艺术'] },
      { title: '电子书', links: ['Kindle电子书', '多看电子书', '网络文学', '有声书'] },
      { title: '音像', links: ['音乐CD', '影视DVD', '游戏', '教育音像'] },
      { title: '文具', links: ['笔类', '本册', '文件管理', '学生文具', '办公文具'] }
    ]
  }
])

const newsList = ref([
  { id: 1, tag: '热门', tagType: 'hot', title: 'iPhone 15系列火爆预售中' },
  { id: 2, tag: '特惠', tagType: 'sale', title: '家电以旧换新补贴来了' },
  { id: 3, tag: '新品', tagType: 'new', title: '华为Mate60 Pro正式发布' },
  { id: 4, tag: '活动', tagType: 'event', title: '京东超级品牌日开启' }
])

const services = ref([
  { name: '话费', icon: 'Iphone' },
  { name: '机票', icon: 'Van' },
  { name: '充值', icon: 'CreditCard' },
  { name: '白条', icon: 'Ticket' }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style lang="scss" scoped>
.banner-section {
  padding: $spacing-md 0;
  background: $bg-primary;
  
  .container {
    max-width: $container-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
}

.banner-wrapper {
  display: flex;
  height: 460px;
  background: $color-white;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  position: relative;
  // 移除overflow:hidden，允许分类弹窗溢出显示
}

// 左侧分类菜单
.side-category {
  width: 210px;
  background: #5f5750;
  flex-shrink: 0;
  position: relative;
  z-index: 100; // 确保分类菜单在最上层
  border-radius: $radius-lg 0 0 $radius-lg;
  // 移除overflow:hidden，允许子分类浮层正常显示
  
  .category-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px $spacing-md;
    color: $color-white;
    cursor: pointer;
    transition: background $transition-fast;
    
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    
    .cat-name {
      font-size: $font-size-sm;
      @include ellipsis;
    }
    
    .arrow {
      font-size: 12px;
      opacity: 0.6;
    }
    
    // 子分类浮层
    .sub-panel {
      position: absolute;
      top: 0;
      left: 210px; // 使用固定值而非100%
      width: 540px;
      min-height: auto;
      max-height: 460px;
      background: $color-white;
      border: 1px solid $border-light;
      box-shadow: $shadow-lg;
      padding: $spacing-md $spacing-lg;
      overflow-y: auto;
      z-index: 1000; // 提高层级
      
      .sub-group {
        margin-bottom: $spacing-md;
        padding-bottom: $spacing-sm;
        border-bottom: 1px dashed $border-light;
        display: flex;
        align-items: flex-start;
        
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        h4 {
          flex-shrink: 0;
          width: 70px;
          font-size: $font-size-sm;
          font-weight: $font-weight-bold;
          color: $color-text-primary;
          line-height: 28px;
          margin-right: $spacing-sm;
        }
        
        .sub-links {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          
          a {
            display: inline-block;
            padding: $spacing-xs $spacing-sm;
            font-size: $font-size-xs;
            color: $color-text-secondary;
            line-height: 20px;
            transition: color $transition-fast;
            
            &:hover {
              color: $jd-red;
            }
          }
        }
      }
    }
  }
}

// 中间轮播图
.main-carousel {
  flex: 1;
  position: relative;
  overflow: hidden;
  
  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease;
  }
  
  .carousel-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    
    .slide-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: $spacing-xl $spacing-xxl;
    }
    
    .slide-text {
      color: $color-white;
      
      h2 {
        font-size: 36px;
        font-weight: $font-weight-bold;
        margin-bottom: $spacing-md;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      p {
        font-size: $font-size-lg;
        opacity: 0.9;
        margin-bottom: $spacing-lg;
      }
      
      .slide-btn {
        padding: $spacing-sm $spacing-xl;
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: $color-text-primary;
        background: $color-white;
        border: none;
        border-radius: $radius-lg;
        cursor: pointer;
        transition: all $transition-fast;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    .slide-image {
      .image-placeholder {
        width: 280px;
        height: 280px;
        border-radius: $radius-xl;
        @include flex-center;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  
  // 轮播控制按钮
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 60px;
    background: rgba(0, 0, 0, 0.3);
    color: $color-white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all $transition-fast;
    @include flex-center;
    
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
    
    &.prev {
      left: 0;
      border-radius: 0 $radius-md $radius-md 0;
    }
    
    &.next {
      right: 0;
      border-radius: $radius-md 0 0 $radius-md;
    }
  }
  
  &:hover .carousel-btn {
    opacity: 1;
  }
  
  // 轮播指示器
  .carousel-dots {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $spacing-sm;
    
    .dot {
      width: 24px;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      cursor: pointer;
      transition: all $transition-fast;
      
      &.active {
        background: $color-white;
        width: 32px;
      }
      
      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

// 右侧信息栏
.side-info {
  width: 210px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid $border-light;
}

// 用户信息
.user-box {
  padding: $spacing-md;
  text-align: center;
  border-bottom: 1px solid $border-light;
  
  .user-avatar {
    width: 60px;
    height: 60px;
    margin: 0 auto $spacing-sm;
    background: $bg-primary;
    border-radius: $radius-round;
    @include flex-center;
    color: $color-text-placeholder;
  }
  
  .user-greeting {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-sm;
  }
  
  .user-actions {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-sm;
    
    button {
      padding: $spacing-xs $spacing-md;
      font-size: $font-size-xs;
      border-radius: $radius-md;
      cursor: pointer;
      transition: all $transition-fast;
    }
    
    .btn-login {
      background: $jd-red;
      color: $color-white;
      border: none;
      
      &:hover {
        background: $jd-red-dark;
      }
    }
    
    .btn-register {
      background: $color-white;
      color: $jd-red;
      border: 1px solid $jd-red;
      
      &:hover {
        background: rgba($jd-red, 0.1);
      }
    }
  }
  
  .user-links {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    
    a {
      font-size: $font-size-xs;
      color: $color-text-secondary;
      
      &:hover {
        color: $jd-red;
      }
    }
  }
}

// 京东快报
.news-box {
  flex: 1;
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid $border-light;
  
  .news-header {
    @include flex-between;
    margin-bottom: $spacing-sm;
    
    .title {
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
    }
    
    .more {
      font-size: $font-size-xs;
      color: $color-text-placeholder;
      
      &:hover {
        color: $jd-red;
      }
    }
  }
  
  .news-list {
    li {
      display: flex;
      align-items: center;
      padding: $spacing-xs 0;
      
      .tag {
        flex-shrink: 0;
        padding: 1px 4px;
        font-size: 10px;
        border-radius: $radius-sm;
        margin-right: $spacing-xs;
        
        &.hot {
          background: rgba($jd-red, 0.1);
          color: $jd-red;
        }
        
        &.sale {
          background: rgba($jd-orange, 0.1);
          color: $jd-orange;
        }
        
        &.new {
          background: rgba(#52c41a, 0.1);
          color: #52c41a;
        }
        
        &.event {
          background: rgba(#1890ff, 0.1);
          color: #1890ff;
        }
      }
      
      a {
        flex: 1;
        font-size: $font-size-xs;
        color: $color-text-secondary;
        @include ellipsis;
        
        &:hover {
          color: $jd-red;
        }
      }
    }
  }
}

// 服务入口
.service-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: $spacing-sm;
  
  .service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm;
    color: $color-text-secondary;
    transition: all $transition-fast;
    
    .el-icon {
      font-size: 24px;
      margin-bottom: $spacing-xs;
    }
    
    span {
      font-size: $font-size-xs;
    }
    
    &:hover {
      color: $jd-red;
      background: $bg-primary;
      border-radius: $radius-md;
    }
  }
}

// 过渡动画
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all $transition-normal;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
