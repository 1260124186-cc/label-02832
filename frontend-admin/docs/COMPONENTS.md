# 组件文档

本文档详细介绍项目中的 Vue 组件，包括使用方法、Props、Events 和插槽说明。

## 目录

- [通用组件](#通用组件)
  - [ProductCard](#productcard)
  - [Skeleton](#skeleton)
- [布局组件](#布局组件)
  - [Header](#header)
  - [Footer](#footer)
- [业务组件](#业务组件)
  - [Banner](#banner)
  - [FlashSale](#flashsale)
  - [BrandZone](#brandzone)
  - [ProductRecommend](#productrecommend)
  - [CategoryNav](#categorynav)

---

## 通用组件

### ProductCard

商品卡片组件，用于展示单个商品信息。

#### 路径

```
src/components/common/ProductCard.vue
```

#### Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| product | Object | ✅ | - | 商品数据对象 |

#### Product 对象结构

```typescript
interface Product {
  id: number | string        // 商品ID
  name: string               // 商品名称
  desc?: string              // 商品描述
  price: number              // 当前价格
  originalPrice?: number     // 原价（可选）
  image: string              // 商品图片URL
  comments?: number          // 评论数
  goodRate?: number          // 好评率（0-100）
  isJdLogistics?: boolean    // 是否京东物流
  tags?: Array<{             // 商品标签
    text: string
    type: 'new' | 'sale' | 'plus'
  }>
  promotion?: string         // 促销信息
}
```

#### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | product: Object | 点击卡片时触发 |
| add-cart | product: Object | 点击加入购物车时触发 |
| collect | product: Object | 点击收藏时触发 |

#### 使用示例

```vue
<template>
  <ProductCard 
    :product="productData"
    @click="handleProductClick"
    @add-cart="handleAddCart"
    @collect="handleCollect"
  />
</template>

<script setup>
import ProductCard from '@/components/common/ProductCard.vue'

const productData = {
  id: 1,
  name: 'iPhone 15 Pro',
  price: 7999,
  originalPrice: 8999,
  image: '/images/iphone15.webp',
  comments: 12000,
  goodRate: 98,
  isJdLogistics: true,
  tags: [{ text: '新品', type: 'new' }],
  promotion: '满2000减200'
}

const handleProductClick = (product) => {
  console.log('商品点击:', product)
}
</script>
```

#### 无障碍支持

- 支持键盘导航（Tab 和 Enter）
- 包含完整的 ARIA 标签
- 收藏按钮使用 `aria-pressed` 状态

---

### Skeleton

骨架屏组件，用于数据加载时的占位展示。

#### 路径

```
src/components/common/Skeleton.vue
```

#### Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| variant | String | ❌ | 'text' | 骨架类型 |
| rows | Number | ❌ | 3 | 文本行数（仅 variant='text' 时有效） |
| width | String | ❌ | '100%' | 骨架宽度 |
| height | String | ❌ | 'auto' | 骨架高度 |
| size | String | ❌ | 'medium' | 头像大小（仅 variant='avatar' 时有效） |
| shape | String | ❌ | 'square' | 形状：'square' 或 'circle' |

#### 支持的 Variant 类型

| 类型 | 说明 |
|------|------|
| text | 文本行骨架 |
| image | 图片占位骨架 |
| avatar | 头像骨架 |
| button | 按钮骨架 |
| product-card | 商品卡片骨架 |
| brand-card | 品牌卡片骨架 |
| flash-item | 秒杀商品骨架 |
| banner | 轮播图骨架 |
| category-nav | 分类导航骨架 |
| custom | 自定义骨架 |

#### 使用示例

```vue
<template>
  <!-- 商品卡片骨架 -->
  <Skeleton variant="product-card" />
  
  <!-- 文本骨架 -->
  <Skeleton variant="text" :rows="4" />
  
  <!-- 头像骨架 -->
  <Skeleton variant="avatar" size="large" shape="circle" />
  
  <!-- 自定义尺寸 -->
  <Skeleton variant="image" width="200px" height="150px" />
</template>
```

---

## 布局组件

### Header

页面头部组件，包含顶部栏、搜索栏、主导航。

#### 路径

```
src/components/Header/index.vue
```

#### 子组件

- `TopBar.vue` - 顶部信息栏（位置、登录、服务链接等）
- `SearchBar.vue` - 搜索栏（Logo、搜索框、购物车）
- `MainNav.vue` - 主导航栏
- `MobileNav.vue` - 移动端汉堡菜单

#### 使用示例

```vue
<template>
  <Header />
</template>

<script setup>
import Header from '@/components/Header/index.vue'
</script>
```

#### 响应式行为

- 桌面端：完整显示所有元素
- 平板端（≤1024px）：隐藏 TopBar，简化导航
- 移动端（≤768px）：显示汉堡菜单，隐藏桌面导航

---

### Footer

页面底部组件，包含服务保障、帮助中心、版权信息。

#### 路径

```
src/components/Footer/index.vue
```

#### 使用示例

```vue
<template>
  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer/index.vue'
</script>
```

---

## 业务组件

### Banner

首页轮播图区域，包含左侧分类、中间轮播、右侧信息栏。

#### 路径

```
src/components/Banner/index.vue
```

#### 特性

- 自动轮播（5秒间隔）
- 支持触摸滑动（移动端）
- 鼠标悬停暂停
- 键盘可访问

#### 无障碍支持

- 轮播图区域使用 `role="region"` 和 `aria-roledescription="carousel"`
- 切换按钮包含 `aria-label`
- 指示器使用 `role="tablist"` 和 `role="tab"`
- 分类菜单支持键盘导航

#### 使用示例

```vue
<template>
  <Banner />
</template>

<script setup>
import Banner from '@/components/Banner/index.vue'
</script>
```

---

### FlashSale

限时秒杀组件，展示秒杀商品和倒计时。

#### 路径

```
src/components/FlashSale/index.vue
```

#### 特性

- 实时倒计时
- 商品抢购进度显示
- 自动计算秒杀场次

#### 使用示例

```vue
<template>
  <FlashSale />
</template>

<script setup>
import FlashSale from '@/components/FlashSale/index.vue'
</script>
```

---

### BrandZone

品牌专区组件，展示各品牌及其热门商品。

#### 路径

```
src/components/Brand/index.vue
```

#### 特性

- Tab 切换不同品牌分类
- 品牌卡片展示
- 商品预览

#### 使用示例

```vue
<template>
  <BrandZone />
</template>

<script setup>
import BrandZone from '@/components/Brand/index.vue'
</script>
```

---

### ProductRecommend

商品推荐组件，展示精选推荐商品列表。

#### 路径

```
src/components/Product/index.vue
```

#### 特性

- Tab 切换商品分类（推荐/新品/热销/特惠）
- 响应式网格布局
- 懒加载图片

#### 使用示例

```vue
<template>
  <ProductRecommend />
</template>

<script setup>
import ProductRecommend from '@/components/Product/index.vue'
</script>
```

---

### CategoryNav

分类导航组件，快捷分类入口。

#### 路径

```
src/components/Category/index.vue
```

#### 特性

- 图标分类展示
- 响应式布局
- 点击跳转

#### 使用示例

```vue
<template>
  <CategoryNav />
</template>

<script setup>
import CategoryNav from '@/components/Category/index.vue'
</script>
```

---

## 组件设计原则

### 1. 单一职责

每个组件只负责一个功能模块，保持组件的简洁和可维护性。

### 2. Props 验证

所有 Props 都应该定义类型和必要的验证规则。

```javascript
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => value.id && value.name
  }
})
```

### 3. 事件命名

- 使用 kebab-case 命名
- 动词开头，如 `add-cart`、`update-quantity`

### 4. 无障碍

- 所有交互元素必须可通过键盘访问
- 使用语义化 HTML 标签
- 提供必要的 ARIA 属性

### 5. 响应式

- 使用 SCSS mixins 处理响应式
- 移动优先设计原则

```scss
@include respond-to(md) {
  // 平板样式
}

@include respond-to(lg) {
  // 桌面样式
}
```
