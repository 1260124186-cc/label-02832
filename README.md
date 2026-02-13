# 京东商城项目

基于 Vue 3 + Vite + Element Plus 构建的京东商城风格项目，采用 Docker 容器化部署。

## How to Run

### 环境要求

- Docker >= 20.10
- Docker Compose >= 2.0
- Node.js >= 18 (仅本地开发需要)

### Docker 部署（推荐）

```bash

# 使用 docker-compose 构建并启动所有服务
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

### 本地开发

```bash
# 进入前端项目目录
cd frontend-admin

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## Services

| 服务名称 | 端口 | 描述 |
|---------|------|------|
| frontend-admin | 8081 | 管理后台前端服务 |

**访问地址：**
- 管理后台: http://localhost:8081

## 测试账号

本项目为纯前端静态页面实现，无需登录账号。

页面中的登录/注册功能为 UI 展示，点击后会显示"功能正在开发中"提示。

## 题目内容

使用Vue.js技术栈开发一个京东商城风格的首页纯前端实现。该实现应包含京东商城首页的核心视觉元素和交互功能，包括但不限于：顶部导航栏、搜索框、轮播图、分类导航、商品推荐区、限时抢购模块、品牌专区和页脚信息等。确保页面布局与京东商城首页保持高度相似，实现响应式设计以适配不同屏幕尺寸。使用Vue组件化开发思想，合理划分功能模块，确保代码结构清晰、可维护性高。集成必要的前端交互效果，如轮播切换、商品卡片悬停效果、导航菜单展开/收起等。采用适当的CSS预处理器或UI框架提升开发效率，确保视觉效果与京东商城首页一致。

---

## 项目结构

```
label-02832/
├── frontend-admin/                      # 管理后台前端
│   ├── public/                          # 公共静态资源
│   │   └── favicon.svg                  # 网站图标
│   ├── src/                             # 源代码目录
│   │   ├── assets/                      # 资源文件
│   │   │   ├── images/                  # 图片资源
│   │   │   │   └── products/            # 商品图片
│   │   │   └── styles/                  # 样式文件
│   │   │       ├── variables.scss       # 设计变量
│   │   │       ├── reset.scss           # 样式重置
│   │   │       ├── common.scss          # 通用样式
│   │   │       └── index.scss           # 样式入口
│   │   ├── components/                  # 组件目录
│   │   │   ├── Header/                  # 头部组件
│   │   │   │   ├── TopBar.vue           # 顶部导航
│   │   │   │   ├── SearchBar.vue        # 搜索栏
│   │   │   │   ├── MainNav.vue          # 主导航
│   │   │   │   └── index.vue            # 头部入口
│   │   │   ├── Banner/                  # 轮播图组件
│   │   │   │   └── index.vue
│   │   │   ├── Category/                # 分类导航组件
│   │   │   │   └── index.vue
│   │   │   ├── FlashSale/               # 限时秒杀组件
│   │   │   │   └── index.vue
│   │   │   ├── Brand/                   # 品牌专区组件
│   │   │   │   └── index.vue
│   │   │   ├── Product/                 # 商品推荐组件
│   │   │   │   └── index.vue
│   │   │   ├── Footer/                  # 页脚组件
│   │   │   │   └── index.vue
│   │   │   └── common/                  # 通用组件
│   │   │       └── ProductCard.vue      # 商品卡片
│   │   ├── views/                       # 页面视图
│   │   │   └── Home.vue                 # 首页
│   │   ├── router/                      # 路由配置
│   │   │   └── index.js
│   │   ├── stores/                      # 状态管理
│   │   │   └── cart.js                  # 购物车状态
│   │   ├── mock/                        # Mock 数据
│   │   │   ├── index.js                 # Mock 入口
│   │   │   ├── banner.js                # 轮播图数据
│   │   │   ├── categories.js            # 分类数据
│   │   │   ├── navigation.js            # 导航数据
│   │   │   ├── products.js              # 商品数据
│   │   │   └── README.md
│   │   ├── utils/                       # 工具函数
│   │   │   ├── toast.js                 # Toast 提示
│   │   │   └── logger.js                # 日志工具
│   │   ├── App.vue                      # 根组件
│   │   └── main.js                      # 入口文件
│   ├── index.html                       # HTML 模板
│   ├── vite.config.js                   # Vite 配置
│   ├── package.json                     # 项目依赖
│   ├── package-lock.json                # 依赖锁定文件
│   ├── Dockerfile                       # Docker 构建文件
│   └── nginx.conf                       # Nginx 配置
├── docker-compose.yml                   # Docker Compose 编排文件
├── .gitignore                           # Git 忽略文件
└── README.md                            # 项目说明文档
```

## Docker 镜像说明

本项目使用的基础镜像均为官方多架构镜像，同时支持：
- **AMD64 (x86_64)**: 适用于 Intel/AMD 处理器的服务器和 PC
- **ARM64 (aarch64)**: 适用于 Apple Silicon (M1/M2/M3) 和 ARM 服务器

### 验证镜像跨平台支持

```bash
# 验证 ARM64 架构支持
docker pull --platform linux/arm64 node:20-alpine
docker pull --platform linux/arm64 nginx:alpine

# 验证 AMD64 架构支持
docker pull --platform linux/amd64 node:20-alpine
docker pull --platform linux/amd64 nginx:alpine
```

## 子项目说明

### frontend-admin (管理后台前端)

基于 Vue 3 的京东商城风格管理后台前端。

**技术栈:**
- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Vue Router - 官方路由
- Pinia - 状态管理
- Element Plus - UI 组件库
- SCSS - CSS 预处理器

**功能模块:**
- 顶部导航栏
- 搜索栏 (支持热门搜索、搜索历史)
- 主导航 (分类展开)
- 轮播图区域
- 分类导航
- 限时秒杀 (倒计时)
- 品牌专区 (Tab切换)
- 商品推荐 (Tab切换、购物车同步)
- 页脚信息

## 设计规范

### 颜色系统

| 变量名 | 色值 | 用途 |
|--------|------|------|
| $jd-red | #e1251b | 京东红-主品牌色 |
| $jd-red-dark | #c81623 | 深红色-悬停状态 |
| $jd-orange | #f7931e | 橙色-促销/限时 |
| $bg-primary | #f5f5f5 | 页面主背景 |
| $bg-white | #ffffff | 卡片背景 |

### 间距系统

| 变量名 | 值 | 用途 |
|--------|------|------|
| $spacing-xs | 4px | 超小间距 |
| $spacing-sm | 8px | 小间距 |
| $spacing-md | 16px | 中等间距 |
| $spacing-lg | 24px | 大间距 |
| $spacing-xl | 32px | 超大间距 |

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## License

MIT License
