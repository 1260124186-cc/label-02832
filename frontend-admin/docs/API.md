# API 文档

本文档介绍项目中的 Store、工具函数、指令和 Mock 数据接口。

## 目录

- [Store（状态管理）](#store状态管理)
  - [Cart Store](#cart-store)
- [工具函数](#工具函数)
  - [Toast](#toast)
- [自定义指令](#自定义指令)
  - [v-lazy-img](#v-lazy-img)
- [Mock 数据](#mock-数据)

---

## Store（状态管理）

项目使用 Pinia 进行状态管理。

### Cart Store

购物车状态管理。

#### 路径

```
src/stores/cart.js
```

#### State

| 属性 | 类型 | 说明 |
|------|------|------|
| cartItems | Array | 购物车商品列表 |

#### Getters

| 名称 | 返回类型 | 说明 |
|------|----------|------|
| cartCount | Number | 购物车商品总数量 |
| totalPrice | Number | 购物车商品总价格 |

#### Actions

| 方法 | 参数 | 说明 |
|------|------|------|
| addToCart | product: Object | 添加商品到购物车 |
| removeFromCart | productId: Number | 从购物车移除商品 |
| clearCart | - | 清空购物车 |

#### CartItem 结构

```typescript
interface CartItem {
  id: number | string   // 商品ID
  name: string          // 商品名称
  price: number         // 单价
  image: string         // 商品图片
  qty: number           // 数量
}
```

#### 使用示例

```javascript
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// 添加商品
cartStore.addToCart({
  id: 1,
  name: 'iPhone 15',
  price: 7999,
  image: '/images/iphone.webp'
})

// 获取购物车数量
console.log(cartStore.cartCount)

// 获取总价
console.log(cartStore.totalPrice)

// 移除商品
cartStore.removeFromCart(1)

// 清空购物车
cartStore.clearCart()
```

#### 数据持久化

购物车数据自动保存到 localStorage，刷新页面后自动恢复。

- 存储键名：`jd_cart_items`
- 存储格式：JSON 数组

---

## 工具函数

### Toast

提示消息工具函数。

#### 路径

```
src/utils/toast.js
```

#### 方法

##### showDevelopingToast()

显示"功能开发中"提示。

```javascript
import { showDevelopingToast } from '@/utils/toast'

// 显示开发中提示
showDevelopingToast()
```

---

## 自定义指令

### v-lazy-img

图片懒加载指令，基于 IntersectionObserver 实现。

#### 路径

```
src/directives/lazyImg.js
```

#### 使用方法

```vue
<template>
  <!-- 基本用法 -->
  <img v-lazy-img="imageUrl" alt="商品图片" />
  
  <!-- 绑定变量 -->
  <img v-lazy-img="product.image" :alt="product.name" />
</template>
```

#### 特性

- 使用 IntersectionObserver 检测元素可见性
- 100px 预加载距离
- 加载失败自动显示占位图
- CSS 类状态指示：
  - `.lazy-img` - 初始状态
  - `.lazy-loading` - 加载中
  - `.lazy-loaded` - 加载完成
  - `.lazy-error` - 加载失败

#### 全局注册

指令已在 `main.js` 中全局注册：

```javascript
import LazyImgPlugin from './directives/lazyImg'
app.use(LazyImgPlugin)
```

---

## Mock 数据

项目使用本地 Mock 数据进行开发和演示。

### 数据文件结构

```
src/mock/
├── index.js          # 统一导出入口
├── products.js       # 商品数据
├── categories.js     # 分类数据
├── banner.js         # 轮播图数据
├── navigation.js     # 导航数据
├── footer.js         # 页脚数据
├── brands.js         # 品牌数据
└── flashSale.js      # 秒杀数据
```

### 统一导入

```javascript
// 从统一入口导入
import { 
  recommendProducts, 
  mainCategories, 
  slides,
  brandTabs,
  flashSaleProducts
} from '@/mock'

// 或从具体模块导入
import { recommendProducts } from '@/mock/products'
```

### 商品数据 (products.js)

#### 导出内容

| 名称 | 类型 | 说明 |
|------|------|------|
| productTabs | Array | 商品分类标签 |
| recommendProducts | Array | 推荐商品列表 |
| newProducts | Array | 新品列表 |
| hotProducts | Array | 热销商品列表 |
| discountProducts | Array | 特惠商品列表 |
| getProductsByTab | Function | 根据Tab获取商品 |

#### 使用示例

```javascript
import { getProductsByTab, recommendProducts } from '@/mock/products'

// 获取推荐商品
const products = recommendProducts

// 根据Tab获取
const hotProducts = getProductsByTab('hot')
```

### 分类数据 (categories.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| quickCategories | Array | 快捷分类入口 |
| mainCategories | Array | 主导航分类 |
| sideCategories | Array | 侧边栏分类（含子分类） |

### Banner 数据 (banner.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| slides | Array | 轮播图数据 |
| newsList | Array | 京东快报 |
| services | Array | 服务入口 |
| hotSearchWords | Array | 热搜词 |
| defaultSearchHistory | Array | 默认搜索历史 |

### 导航数据 (navigation.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| navLinks | Array | 主导航链接 |
| userLinks | Array | 用户链接 |
| myJdLinks | Array | 我的京东菜单 |
| serviceLinks | Array | 客户服务菜单 |
| siteNavigation | Array | 网站导航 |
| topBarLinks | Array | 顶部栏链接 |
| mobileUserInfo | Object | 移动端用户信息 |
| mobileQuickLinks | Array | 移动端快捷入口 |
| mobileFooterLinks | Array | 移动端底部链接 |

### 页脚数据 (footer.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| serviceGuarantees | Array | 服务保障 |
| helpColumns | Array | 帮助中心栏目 |
| contactInfo | Object | 联系信息 |
| friendLinks | Array | 友情链接 |
| copyrightLinks | Array | 版权链接 |
| filingInfo | Array | 备案信息 |
| certifications | Array | 认证信息 |
| copyrightText | Object | 版权声明 |

### 品牌数据 (brands.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| brandTabs | Array | 品牌分类标签 |
| allBrands | Array | 全部品牌 |
| phoneBrands | Array | 手机数码品牌 |
| applianceBrands | Array | 家电品牌 |
| beautyBrands | Array | 美妆品牌 |
| fashionBrands | Array | 服饰品牌 |
| moreBrands | Array | 更多品牌 |
| getBrandsByCategory | Function | 根据分类获取品牌 |

#### 使用示例

```javascript
import { getBrandsByCategory, brandTabs } from '@/mock/brands'

// 获取手机品牌
const phoneBrands = getBrandsByCategory('phone')

// 获取所有标签
const tabs = brandTabs
```

### 秒杀数据 (flashSale.js)

| 名称 | 类型 | 说明 |
|------|------|------|
| flashSaleConfig | Object | 秒杀配置 |
| flashSaleProducts | Array | 秒杀商品 |
| getFlashSaleRemainingTime | Function | 获取剩余时间 |
| formatCountdown | Function | 格式化倒计时 |

#### 使用示例

```javascript
import { 
  flashSaleConfig, 
  flashSaleProducts,
  getFlashSaleRemainingTime,
  formatCountdown 
} from '@/mock/flashSale'

// 获取配置
console.log(flashSaleConfig.title) // '限时秒杀'

// 获取剩余时间（秒）
const remainingSeconds = getFlashSaleRemainingTime()

// 格式化为 HH:MM:SS
const { hours, minutes, seconds } = formatCountdown(remainingSeconds)
```

---

## 类型定义参考

### 通用类型

```typescript
// 商品标签
interface ProductTag {
  text: string
  type: 'new' | 'sale' | 'plus'
}

// 商品
interface Product {
  id: number | string
  name: string
  desc?: string
  price: number
  originalPrice?: number
  image: string
  comments?: number
  goodRate?: number
  isJdLogistics?: boolean
  tags?: ProductTag[]
  promotion?: string
}

// 分类
interface Category {
  id: number
  name: string
  icon?: string
  children?: SubCategory[]
}

// 子分类
interface SubCategory {
  title: string
  links: string[]
}

// 品牌
interface Brand {
  id: number
  name: string
  slogan: string
  tag: string
  bgColor: string
  activity: string
  products: BrandProduct[]
}

// 品牌商品
interface BrandProduct {
  id: number
  name: string
  price: number
  image: string
}

// 导航链接
interface NavLink {
  id: number
  name: string
  url: string
  isHot?: boolean
  isVip?: boolean
}
```

---

## 接入真实 API

如需接入后端 API，建议创建 `src/api/` 目录：

```
src/api/
├── index.js        # axios 实例配置
├── products.js     # 商品相关 API
├── cart.js         # 购物车 API
└── user.js         # 用户相关 API
```

### 示例：商品 API

```javascript
// src/api/products.js
import axios from './index'

export const getRecommendProducts = (params) => {
  return axios.get('/api/products/recommend', { params })
}

export const getProductDetail = (id) => {
  return axios.get(`/api/products/${id}`)
}
```

### 组件中使用

```javascript
import { getRecommendProducts } from '@/api/products'
import { recommendProducts as mockProducts } from '@/mock/products'

const products = ref([])

onMounted(async () => {
  try {
    const { data } = await getRecommendProducts()
    products.value = data
  } catch (error) {
    // 降级使用 Mock 数据
    console.warn('API 请求失败，使用 Mock 数据')
    products.value = mockProducts
  }
})
```
