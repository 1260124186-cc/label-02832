# 京东商城首页 - Vue.js 实现

基于 Vue 3 + Vite + Element Plus 构建的京东商城风格首页，完整复刻京东商城首页的核心视觉元素和交互功能。

## How to Run

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### Docker 部署

```bash
# 使用 docker-compose 构建并启动
docker-compose up -d --build

# 或者手动构建镜像
docker build -t jd-mall-homepage .
docker run -d -p 8081:8081 --name jd-mall-homepage jd-mall-homepage

# 查看容器日志
docker logs -f jd-mall-homepage

# 停止并删除容器
docker-compose down
```

## Services

| 服务名称 | 端口 | 描述 |
|---------|------|------|
| jd-mall-homepage | 8081 | 京东商城首页前端服务 |

访问地址：http://localhost:8081

## 测试账号

本项目为纯前端静态页面实现，无需登录账号。

页面中的登录/注册功能为 UI 展示，点击后会显示"功能正在开发中"提示。

---

## 题目内容

使用Vue.js技术栈开发一个京东商城风格的首页纯前端实现。该实现应包含京东商城首页的核心视觉元素和交互功能，包括但不限于：顶部导航栏、搜索框、轮播图、分类导航、商品推荐区、限时抢购模块、品牌专区和页脚信息等。确保页面布局与京东商城首页保持高度相似，实现响应式设计以适配不同屏幕尺寸。使用Vue组件化开发思想，合理划分功能模块，确保代码结构清晰、可维护性高。集成必要的前端交互效果，如轮播切换、商品卡片悬停效果、导航菜单展开/收起等。采用适当的CSS预处理器或UI框架提升开发效率，确保视觉效果与京东商城首页一致。

---

## 项目介绍

### 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由
- **Pinia** - Vue 状态管理库（购物车状态管理）
- **Element Plus** - 基于 Vue 3 的组件库
- **SCSS** - CSS 预处理器
- **Docker** - 容器化部署

### 功能特性

#### 核心模块

1. **顶部导航栏 (TopBar)**
   - 地区选择
   - 用户登录/注册入口
   - 我的订单、我的京东等快捷入口
   - 客户服务、网站导航下拉菜单
   - 所有按钮可点击，显示Toast提示

2. **搜索栏 (SearchBar)**
   - Logo 展示
   - 搜索框（支持热门搜索、搜索历史）
   - 购物车悬浮预览（实时同步商品数据）

3. **主导航 (MainNav)**
   - 全部商品分类（多级分类展开）
   - 秒杀、优惠券、PLUS会员等快捷入口

4. **轮播图区域 (Banner)**
   - 左侧分类菜单
   - 中间轮播图（自动播放、手动切换）
   - 右侧用户信息、京东快报、服务入口

5. **分类导航 (CategoryNav)**
   - 10个快捷分类入口
   - 图标+文字展示

6. **限时秒杀 (FlashSale)**
   - 倒计时功能
   - 商品进度条
   - 立即抢购按钮
   - 本地商品图片展示

7. **品牌专区 (BrandZone)**
   - 品牌卡片展示
   - 品牌商品预览（本地图片）
   - 进入店铺入口
   - **Tab切换功能**：支持全部、手机数码、家用电器、美妆护肤、服饰鞋包分类切换

8. **商品推荐 (ProductRecommend)**
   - 商品卡片网格布局
   - 商品悬停效果
   - 加入购物车功能（与购物车实时同步）
   - 收藏功能
   - 加载更多
   - **Tab切换功能**：支持精选推荐、新品上市、热销榜单、特惠专区分类切换
   - 本地商品图片展示

9. **页脚 (Footer)**
   - 服务保障
   - 帮助中心
   - 友情链接
   - 版权信息

#### 交互特性

- 轮播图自动播放与手动切换
- 导航菜单悬停展开/收起
- 商品卡片悬停效果（阴影、上浮、操作按钮）
- 购物车悬浮预览（实时显示添加的商品）
- 限时秒杀倒计时
- 回到顶部按钮
- Toast 消息提示（所有按钮点击显示"功能正在开发中"）
- 品牌专区和商品推荐Tab切换

#### 视觉设计

- 京东红主题色 (#e1251b)
- 统一的间距系统 (8px/16px/24px)
- 卡片阴影分层
- 响应式布局适配
- 统一的字体、字号、圆角风格
- 本地商品图片资源

### 项目结构

```
jd-mall-homepage/
├── public/                    # 静态资源
│   └── favicon.svg           # 网站图标
├── src/
│   ├── assets/               # 资源文件
│   │   ├── images/           # 图片资源
│   │   │   └── products/     # 商品图片
│   │   └── styles/           # 样式文件
│   │       ├── variables.scss  # 设计变量
│   │       ├── reset.scss      # 样式重置
│   │       ├── common.scss     # 通用样式
│   │       └── index.scss      # 样式入口
│   ├── components/           # 组件目录
│   │   ├── Header/           # 头部组件
│   │   │   ├── TopBar.vue      # 顶部导航
│   │   │   ├── SearchBar.vue   # 搜索栏
│   │   │   ├── MainNav.vue     # 主导航
│   │   │   └── index.vue       # 头部入口
│   │   ├── Banner/           # 轮播图组件
│   │   │   └── index.vue
│   │   ├── Category/         # 分类导航组件
│   │   │   └── index.vue
│   │   ├── FlashSale/        # 限时秒杀组件
│   │   │   └── index.vue
│   │   ├── Brand/            # 品牌专区组件
│   │   │   └── index.vue
│   │   ├── Product/          # 商品推荐组件
│   │   │   └── index.vue
│   │   ├── Footer/           # 页脚组件
│   │   │   └── index.vue
│   │   └── common/           # 通用组件
│   │       └── ProductCard.vue # 商品卡片
│   ├── views/                # 页面视图
│   │   └── Home.vue          # 首页
│   ├── router/               # 路由配置
│   │   └── index.js
│   ├── stores/               # 状态管理
│   │   └── cart.js           # 购物车状态（Pinia）
│   ├── utils/                # 工具函数
│   │   └── toast.js          # Toast提示工具
│   ├── App.vue               # 根组件
│   └── main.js               # 入口文件
├── index.html                # HTML 模板
├── vite.config.js            # Vite 配置
├── package.json              # 项目配置
├── Dockerfile                # Docker 构建文件
├── docker-compose.yml        # Docker Compose 配置
├── nginx.conf                # Nginx 配置
├── .gitignore                # Git 忽略文件
└── README.md                 # 项目说明
```

### 设计规范

#### 颜色系统

| 变量名 | 色值 | 用途 |
|--------|------|------|
| $jd-red | #e1251b | 京东红-主品牌色 |
| $jd-red-dark | #c81623 | 深红色-悬停状态 |
| $jd-orange | #f7931e | 橙色-促销/限时 |
| $bg-primary | #f5f5f5 | 页面主背景 |
| $bg-white | #ffffff | 卡片背景 |

#### 间距系统

| 变量名 | 值 | 用途 |
|--------|------|------|
| $spacing-xs | 4px | 超小间距 |
| $spacing-sm | 8px | 小间距 |
| $spacing-md | 16px | 中等间距 |
| $spacing-lg | 24px | 大间距 |
| $spacing-xl | 32px | 超大间距 |

#### 字体系统

| 变量名 | 值 | 用途 |
|--------|------|------|
| $font-size-xs | 12px | 辅助文字 |
| $font-size-sm | 13px | 次要文字 |
| $font-size-base | 14px | 正文 |
| $font-size-md | 16px | 小标题 |
| $font-size-lg | 18px | 标题 |
### 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

### License

MIT License
