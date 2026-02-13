<template>
  <div class="brand-zone">
    <div class="container">
      <!-- 区块标题 -->
      <div class="section-header">
        <div class="title">
          <el-icon class="icon"><Medal /></el-icon>
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
              <h3 class="brand-name">{{ brand.name }}</h3>
              <p class="brand-slogan">{{ brand.slogan }}</p>
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
                <img :src="product.image" :alt="product.name" class="product-img" />
              </div>
              <p class="product-name">{{ product.name }}</p>
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

// 导入本地图片
// Apple
import iphone15Img from '@/assets/images/products/iphone15.webp'
import macbookImg from '@/assets/images/products/macbook.webp'
import airpodsImg from '@/assets/images/products/airpods.webp'
// 华为
import huaweiMate60Img from '@/assets/images/products/huaweimeta50.webp'
import matePadImg from '@/assets/images/products/MatePad.webp'
// 小米
import xiaomi14Img from '@/assets/images/products/xiaomi14.jpeg'
import xiaomiTvImg from '@/assets/images/products/xiaomidianshi.webp'
import miBandImg from '@/assets/images/products/xiaomishouhuan.webp'
// 戴森
import dysonV15Img from '@/assets/images/products/daisenv15.webp'
import dysonHairDryerImg from '@/assets/images/products/daisenchuifengji.webp'
import dysonAirPurifierImg from '@/assets/images/products/daisenkongqijinghua.webp'
// 海尔
import haierFridgeImg from '@/assets/images/products/haierbcd.webp'
import haierWasherImg from '@/assets/images/products/haierxiyiji.webp'
// 美的
import mideaAcImg from '@/assets/images/products/mideakfr.webp'
import mideaRiceCookerImg from '@/assets/images/products/meididianfanbao.webp'
import mideaMicrowaveImg from '@/assets/images/products/meidiweibolu.webp'
// 雅诗兰黛
import esteeLauderImg from '@/assets/images/products/yashilandai.webp'
import redPomegranateImg from '@/assets/images/products/hongshiliu.webp'
import dwFoundationImg from '@/assets/images/products/dw.webp'
// SK-II
import skiiImg from '@/assets/images/products/skii.webp'
import skiiBigRedImg from '@/assets/images/products/dahongpig.webp'
import skiiMaskImg from '@/assets/images/products/qiannanyou.webp'
// 兰蔻
import lancomeBlackImg from '@/assets/images/products/xiaoheiping.webp'
import lancomePinkWaterImg from '@/assets/images/products/fenshui.webp'
import lancomeCreamImg from '@/assets/images/products/jingchun.webp'
// 资生堂
import shiseidoRedImg from '@/assets/images/products/hongyaozi.webp'
import shiseidoYueweiImg from '@/assets/images/products/yueweishuiru.webp'
import shiseidoPanliImg from '@/assets/images/products/panli.webp'
// Nike
import nikeAj1Img from '@/assets/images/products/AirJordan.webp'
import nikeAirForceImg from '@/assets/images/products/AirForce.webp'
import nikeAirMaxImg from '@/assets/images/products/AirMax.webp'
// Adidas
import adidasSuperstarImg from '@/assets/images/products/Superstar.webp'
import adidasStanSmithImg from '@/assets/images/products/StanSmith.webp'
import adidasUltraboostImg from '@/assets/images/products/Ultraboost.webp'
// 优衣库
import uniqloTshirtImg from '@/assets/images/products/UTshet.jpeg'
import uniqloFleeceImg from '@/assets/images/products/yaolirong.webp'
import uniqloDownImg from '@/assets/images/products/qinyurong.webp'
// 李宁
import liningWadeImg from '@/assets/images/products/weide.webp'
import liningChinaImg from '@/assets/images/products/zgln.webp'
import liningYushuaiImg from '@/assets/images/products/nushuai.jpeg'
// 三星
import samsungS24Img from '@/assets/images/products/sanixngGalaxyS24.webp'
import samsungFoldImg from '@/assets/images/products/sanxingGalaxyFold.webp'

const activeTab = ref('all')

const handleClick = () => {
  showDevelopingToast()
}

const tabs = ref([
  { id: 'all', name: '全部' },
  { id: 'phone', name: '手机数码' },
  { id: 'appliance', name: '家用电器' },
  { id: 'beauty', name: '美妆护肤' },
  { id: 'fashion', name: '服饰鞋包' }
])

// 全部品牌
const allBrands = ref([
  {
    id: 1,
    name: 'Apple',
    slogan: '创新科技，改变世界',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a1a1a, #333)',
    activity: '新品首发 限时优惠',
    category: 'phone',
    products: [
      { id: 1, name: 'iPhone 15 Pro', price: 7999, image: iphone15Img },
      { id: 2, name: 'MacBook Air', price: 8999, image: macbookImg },
      { id: 3, name: 'AirPods Pro', price: 1899, image: airpodsImg }
    ]
  },
  {
    id: 2,
    name: '华为',
    slogan: '构建万物互联的智能世界',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c7000b, #e1251b)',
    activity: 'Mate60系列热销中',
    category: 'phone',
    products: [
      { id: 1, name: 'Mate 60 Pro', price: 6999, image: huaweiMate60Img },
      { id: 2, name: 'MatePad Pro', price: 4999, image: matePadImg },
      { id: 3, name: 'FreeBuds Pro', price: 1199, image: airpodsImg }
    ]
  },
  {
    id: 3,
    name: '小米',
    slogan: '让每个人都能享受科技的乐趣',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #ff6700, #ff8533)',
    activity: '全场满减 至高省500',
    category: 'phone',
    products: [
      { id: 1, name: '小米14 Pro', price: 4999, image: xiaomi14Img },
      { id: 2, name: '小米电视', price: 2999, image: xiaomiTvImg },
      { id: 3, name: '小米手环8', price: 249, image: miBandImg }
    ]
  },
  {
    id: 4,
    name: '戴森',
    slogan: '科技改变生活',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #6b5b95, #9b8bb8)',
    activity: '以旧换新 补贴升级',
    category: 'appliance',
    products: [
      { id: 1, name: 'V15吸尘器', price: 5490, image: dysonV15Img },
      { id: 2, name: 'HD08吹风机', price: 3190, image: dysonHairDryerImg },
      { id: 3, name: '空气净化器', price: 4990, image: dysonAirPurifierImg }
    ]
  }
])

// 手机数码品牌
const phoneBrands = ref([
  {
    id: 101,
    name: 'Apple',
    slogan: '创新科技，改变世界',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a1a1a, #333)',
    activity: 'iPhone 15系列热销中',
    products: [
      { id: 1, name: 'iPhone 15 Pro', price: 7999, image: iphone15Img },
      { id: 2, name: 'iPhone 15', price: 5999, image: iphone15Img },
      { id: 3, name: 'AirPods Pro 2', price: 1899, image: airpodsImg }
    ]
  },
  {
    id: 102,
    name: '华为',
    slogan: '构建万物互联的智能世界',
    tag: '自营热卖',
    bgColor: 'linear-gradient(135deg, #c7000b, #e1251b)',
    activity: 'Mate60系列 现货发售',
    products: [
      { id: 1, name: 'Mate 60 Pro', price: 6999, image: huaweiMate60Img },
      { id: 2, name: 'Mate 60', price: 5999, image: huaweiMate60Img },
      { id: 3, name: 'nova 12', price: 2999, image: huaweiMate60Img }
    ]
  },
  {
    id: 103,
    name: '小米',
    slogan: '科技让生活更美好',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #ff6700, #ff8533)',
    activity: '小米14系列 火热预约',
    products: [
      { id: 1, name: '小米14 Pro', price: 4999, image: xiaomi14Img },
      { id: 2, name: '小米14', price: 3999, image: xiaomi14Img },
      { id: 3, name: '小米手环8', price: 249, image: miBandImg }
    ]
  },
  {
    id: 104,
    name: '三星',
    slogan: 'Inspire the World',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #1428a0, #2d4cb3)',
    activity: 'Galaxy系列 折叠新体验',
    products: [
      { id: 1, name: 'Galaxy S24', price: 6499, image: samsungS24Img },
      { id: 2, name: 'Galaxy Fold', price: 13999, image: samsungFoldImg },
      { id: 3, name: 'Galaxy Buds', price: 999, image: airpodsImg }
    ]
  }
])

// 家电品牌
const applianceBrands = ref([
  {
    id: 201,
    name: '戴森',
    slogan: '科技改变生活',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #6b5b95, #9b8bb8)',
    activity: '以旧换新 补贴1000元',
    products: [
      { id: 1, name: 'V15吸尘器', price: 5490, image: dysonV15Img },
      { id: 2, name: 'HD08吹风机', price: 3190, image: dysonHairDryerImg },
      { id: 3, name: '净化扇', price: 4990, image: dysonAirPurifierImg }
    ]
  },
  {
    id: 202,
    name: '海尔',
    slogan: '真诚到永远',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #0066b3, #0088cc)',
    activity: '大家电 满5000减500',
    products: [
      { id: 1, name: '十字对开冰箱', price: 5299, image: haierFridgeImg },
      { id: 2, name: '滚筒洗衣机', price: 3999, image: haierWasherImg },
      { id: 3, name: '空调挂机', price: 2999, image: mideaAcImg }
    ]
  },
  {
    id: 203,
    name: '美的',
    slogan: '科技尽善，生活尽美',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #00a0e9, #33b5e5)',
    activity: '空调新品 一级能效',
    products: [
      { id: 1, name: '变频空调', price: 3299, image: mideaAcImg },
      { id: 2, name: '电饭煲', price: 599, image: mideaRiceCookerImg },
      { id: 3, name: '微波炉', price: 499, image: mideaMicrowaveImg }
    ]
  },
  {
    id: 204,
    name: '格力',
    slogan: '好空调，格力造',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #00843d, #00a550)',
    activity: '空调特惠 低至6折',
    products: [
      { id: 1, name: '云锦空调', price: 4599, image: mideaAcImg },
      { id: 2, name: '云恬空调', price: 3299, image: mideaAcImg },
      { id: 3, name: '空气净化器', price: 1999, image: dysonAirPurifierImg }
    ]
  }
])

// 美妆品牌
const beautyBrands = ref([
  {
    id: 301,
    name: '雅诗兰黛',
    slogan: '美丽恒久远',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #1a3a5c, #2d5a8a)',
    activity: '小棕瓶 买一送一',
    products: [
      { id: 1, name: '小棕瓶精华', price: 1080, image: esteeLauderImg },
      { id: 2, name: '红石榴水', price: 580, image: redPomegranateImg },
      { id: 3, name: 'DW粉底液', price: 420, image: dwFoundationImg }
    ]
  },
  {
    id: 302,
    name: 'SK-II',
    slogan: '晶莹剔透',
    tag: '官方授权',
    bgColor: 'linear-gradient(135deg, #8b0000, #a52a2a)',
    activity: '神仙水 第二件半价',
    products: [
      { id: 1, name: '神仙水230ml', price: 1590, image: skiiImg },
      { id: 2, name: '大红瓶面霜', price: 1190, image: skiiBigRedImg },
      { id: 3, name: '前男友面膜', price: 890, image: skiiMaskImg }
    ]
  },
  {
    id: 303,
    name: '兰蔻',
    slogan: '法式优雅',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #000, #333)',
    activity: '小黑瓶 赠正装',
    products: [
      { id: 1, name: '小黑瓶精华', price: 980, image: lancomeBlackImg },
      { id: 2, name: '粉水400ml', price: 520, image: lancomePinkWaterImg },
      { id: 3, name: '菁纯面霜', price: 1280, image: lancomeCreamImg }
    ]
  },
  {
    id: 304,
    name: '资生堂',
    slogan: '万美之源',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c41e3a, #e1251b)',
    activity: '红腰子 限时特惠',
    products: [
      { id: 1, name: '红腰子精华', price: 890, image: shiseidoRedImg },
      { id: 2, name: '悦薇水乳', price: 680, image: shiseidoYueweiImg },
      { id: 3, name: '盼丽风姿', price: 560, image: shiseidoPanliImg }
    ]
  }
])

// 服饰鞋包品牌
const fashionBrands = ref([
  {
    id: 401,
    name: 'Nike',
    slogan: 'Just Do It',
    tag: '官方旗舰',
    bgColor: 'linear-gradient(135deg, #111, #333)',
    activity: 'AJ系列 新品上市',
    products: [
      { id: 1, name: 'Air Jordan 1', price: 1299, image: nikeAj1Img },
      { id: 2, name: 'Air Force 1', price: 799, image: nikeAirForceImg },
      { id: 3, name: 'Air Max 90', price: 999, image: nikeAirMaxImg }
    ]
  },
  {
    id: 402,
    name: 'Adidas',
    slogan: 'Impossible is Nothing',
    tag: '品牌日',
    bgColor: 'linear-gradient(135deg, #000, #1a1a1a)',
    activity: '三叶草 满减优惠',
    products: [
      { id: 1, name: 'Superstar', price: 899, image: adidasSuperstarImg },
      { id: 2, name: 'Stan Smith', price: 799, image: adidasStanSmithImg },
      { id: 3, name: 'Ultraboost', price: 1299, image: adidasUltraboostImg }
    ]
  },
  {
    id: 403,
    name: '优衣库',
    slogan: 'LifeWear',
    tag: '自营',
    bgColor: 'linear-gradient(135deg, #c41e3a, #e1251b)',
    activity: '基础款 特惠价',
    products: [
      { id: 1, name: 'U系T恤', price: 99, image: uniqloTshirtImg },
      { id: 2, name: '摇粒绒', price: 149, image: uniqloFleeceImg },
      { id: 3, name: '轻羽绒', price: 399, image: uniqloDownImg }
    ]
  },
  {
    id: 404,
    name: '李宁',
    slogan: '一切皆有可能',
    tag: '国潮',
    bgColor: 'linear-gradient(135deg, #e1251b, #ff3333)',
    activity: '中国李宁 限量发售',
    products: [
      { id: 1, name: '韦德之道', price: 1499, image: liningWadeImg },
      { id: 2, name: '中国李宁', price: 599, image: liningChinaImg },
      { id: 3, name: '驭帅15', price: 899, image: liningYushuaiImg }
    ]
  }
])

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

const moreBrands = ref([
  { id: 1, name: '索尼', bgColor: '#000' },
  { id: 2, name: '三星', bgColor: '#1428a0' },
  { id: 3, name: '联想', bgColor: '#e2231a' },
  { id: 4, name: '海尔', bgColor: '#0066b3' },
  { id: 5, name: '美的', bgColor: '#00a0e9' },
  { id: 6, name: '格力', bgColor: '#00843d' },
  { id: 7, name: '耐克', bgColor: '#111' },
  { id: 8, name: '阿迪达斯', bgColor: '#000' }
])
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
