# Mock 数据说明

本目录包含项目中使用的所有模拟数据。这些数据用于前端开发和演示目的，**非真实生产数据**。

## 目录结构

```
src/mock/
├── README.md           # 本说明文件
├── index.js            # 统一导出入口
├── products.js         # 商品数据
├── categories.js       # 分类数据
├── banner.js           # 轮播图、快报、服务入口数据
├── navigation.js       # 导航链接数据
├── footer.js           # 页脚数据（服务保障、帮助中心、版权信息等）
├── brands.js           # 品牌专区数据
└── flashSale.js        # 限时秒杀数据
```

## 数据说明

### 商品数据 (products.js)

包含以下商品列表：
- `recommendProducts` - 精选推荐商品（12条）
- `newProducts` - 新品上市商品（6条）
- `hotProducts` - 热销榜单商品（6条）
- `discountProducts` - 特惠专区商品（6条）
- `productTabs` - 商品分类标签

**商品数据结构：**
```javascript
{
  id: Number,           // 商品ID
  name: String,         // 商品名称
  desc: String,         // 商品描述
  price: Number,        // 当前价格
  originalPrice: Number,// 原价（可选）
  comments: Number,     // 评论数
  goodRate: Number,     // 好评率（百分比）
  isJdLogistics: Boolean, // 是否京东物流
  tags: Array,          // 标签列表 [{ text, type }]
  promotion: String,    // 促销信息（可选）
  image: String         // 商品图片路径
}
```

### 分类数据 (categories.js)

包含以下分类列表：
- `quickCategories` - 快捷分类入口（10个）
- `mainCategories` - 主导航分类（10个，含子分类）
- `sideCategories` - 侧边栏分类（10个，含详细子分类）

### Banner 数据 (banner.js)

包含以下数据：
- `slides` - 轮播图数据（4条）
- `newsList` - 京东快报数据（4条）
- `services` - 服务入口（4个）

### 导航数据 (navigation.js)

包含以下数据：
- `navLinks` - 顶部导航链接（9个）
- `userLinks` - 用户登录/注册链接
- `myJdLinks` - "我的京东"下拉菜单
- `serviceLinks` - "客户服务"下拉菜单
- `siteNavigation` - "网站导航"下拉菜单
- `topBarLinks` - 顶部栏其他链接
- `mobileUserInfo` - 移动端菜单用户信息
- `mobileQuickLinks` - 移动端快捷入口
- `mobileFooterLinks` - 移动端底部链接

### 页脚数据 (footer.js)

包含以下数据：
- `serviceGuarantees` - 服务保障数据（5个）
- `helpColumns` - 帮助中心栏目（4个）
- `contactInfo` - 联系我们信息
- `friendLinks` - 友情链接（10个）
- `copyrightLinks` - 版权链接（9个）
- `filingInfo` - 备案信息
- `certifications` - 认证信息（3个）
- `copyrightText` - 版权声明

### 品牌数据 (brands.js)

包含以下数据：
- `brandTabs` - 品牌分类标签页
- `allBrands` - 全部品牌首页展示
- `phoneBrands` - 手机数码品牌
- `applianceBrands` - 家电品牌
- `beautyBrands` - 美妆品牌
- `fashionBrands` - 服饰鞋包品牌
- `moreBrands` - 更多品牌入口
- `getBrandsByCategory()` - 根据分类获取品牌列表

### 秒杀数据 (flashSale.js)

包含以下数据：
- `flashSaleConfig` - 秒杀配置（标题、副标题、场次时间）
- `flashSaleProducts` - 秒杀商品列表（5个）
- `getFlashSaleRemainingTime()` - 获取当前场次剩余时间
- `formatCountdown()` - 格式化倒计时

## 使用方式

```javascript
// 方式1: 从统一入口导入
import { recommendProducts, mainCategories, slides } from '@/mock'

// 方式2: 从具体模块导入
import { recommendProducts, newProducts } from '@/mock/products'
import { quickCategories } from '@/mock/categories'
```

## 注意事项

1. **仅用于开发/演示**：这些数据是模拟数据，仅用于前端开发和演示目的
2. **图片资源**：商品图片使用本地资源，位于 `src/assets/images/products/` 目录
3. **数据更新**：如需修改模拟数据，请直接编辑对应的 `.js` 文件
4. **生产环境**：在实际生产环境中，这些数据应替换为后端 API 接口返回的真实数据

## 后续扩展

如需接入真实 API，建议：

1. 创建 `src/api/` 目录存放 API 请求函数
2. 使用 axios 或 fetch 进行数据请求
3. 在组件中通过 API 获取数据，替换 mock 数据引用
4. 可保留 mock 数据作为开发环境的 fallback

```javascript
// 示例：API 请求封装
// src/api/products.js
import axios from 'axios'

export const getRecommendProducts = () => {
  return axios.get('/api/products/recommend')
}

// 组件中使用
import { getRecommendProducts } from '@/api/products'
import { recommendProducts as mockProducts } from '@/mock/products'

const products = ref([])

onMounted(async () => {
  try {
    const res = await getRecommendProducts()
    products.value = res.data
  } catch (error) {
    // 降级使用 mock 数据
    products.value = mockProducts
  }
})
```
