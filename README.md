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
| frontend-admin | 8081 | 京东商城首页前端服务 |

**访问地址：**
- 首页: http://localhost:8081

## 测试账号

本项目为纯前端静态页面实现，无需登录账号。

页面中的登录/注册功能为 UI 展示，点击后会显示"功能正在开发中"提示。

## 题目内容

使用Vue.js技术栈开发一个京东商城风格的首页纯前端实现。该实现应包含京东商城首页的核心视觉元素和交互功能，包括但不限于：顶部导航栏、搜索框、轮播图、分类导航、商品推荐区、限时抢购模块、品牌专区和页脚信息等。确保页面布局与京东商城首页保持高度相似，实现响应式设计以适配不同屏幕尺寸。使用Vue组件化开发思想，合理划分功能模块，确保代码结构清晰、可维护性高。集成必要的前端交互效果，如轮播切换、商品卡片悬停效果、导航菜单展开/收起等。采用适当的CSS预处理器或UI框架提升开发效率，确保视觉效果与京东商城首页一致。

---

## 项目介绍

### 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | 渐进式 JavaScript 框架，使用 Composition API |
| Vite | 下一代前端构建工具，极速热更新 |
| Vue Router | 官方路由管理 |
| Pinia | 新一代状态管理库 |
| Element Plus | 基于 Vue 3 的 UI 组件库 |
| SCSS | CSS 预处理器，支持变量和混入 |
| Docker | 容器化部署，一键启动 |
| Nginx | 高性能 Web 服务器 |

### 功能模块

| 模块 | 功能描述 |
|------|----------|
| 顶部导航栏 | 用户入口、快捷链接、服务导航（桌面端显示） |
| 搜索栏 | 热门搜索、搜索历史持久化、智能提示 |
| 主导航 | 全部商品分类展开、分类联动、响应式布局 |
| 移动端导航 | 汉堡菜单、侧边抽屉、分类折叠展开 |
| 轮播图区域 | 自动轮播、触摸滑动、指示器导航 |
| 分类导航 | 商品分类入口、图标导航 |
| 限时秒杀 | 实时倒计时、商品列表、抢购入口 |
| 品牌专区 | Tab 切换、品牌 Logo 展示 |
| 商品推荐 | Tab 切换、购物车同步、加入购物车动画 |
| 购物车 | 添加商品、数量管理、数据持久化存储 |
| 页脚信息 | 帮助中心、友情链接、版权信息、备案信息 |

### 项目特性

| 特性 | 描述 |
|------|------|
| 响应式设计 | 适配桌面端（1200px+）、平板（768px）、手机（480px）等多种屏幕 |
| 组件化开发 | Vue 3 Composition API，合理划分功能模块 |
| 数据持久化 | 购物车、搜索历史使用 localStorage 本地存储 |
| 图片懒加载 | 自定义 v-lazy-img 指令，基于 IntersectionObserver |
| 组件懒加载 | defineAsyncComponent 按需加载，优化首屏性能 |
| 骨架屏加载 | Suspense + 骨架屏组件，提升加载体验 |
| 无障碍支持 | ARIA 属性、键盘导航、屏幕阅读器支持 |
| 代码规范 | ESLint + Prettier 统一代码风格 |
| 单元测试 | Vitest + Vue Test Utils 测试覆盖 |

## 项目结构

```
label-02832/
├── frontend-admin/                      # 前端项目
│   ├── public/                          # 公共静态资源
│   │   └── favicon.svg                  # 网站图标
│   ├── src/                             # 源代码目录
│   │   ├── assets/                      # 资源文件
│   │   │   ├── images/                  # 图片资源
│   │   │   │   └── products/            # 商品图片
│   │   │   └── styles/                  # 样式文件
│   │   │       ├── variables.scss       # 设计变量（颜色、间距、断点）
│   │   │       ├── reset.scss           # 样式重置
│   │   │       ├── common.scss          # 通用样式（无障碍、工具类）
│   │   │       └── index.scss           # 样式入口
│   │   ├── components/                  # 组件目录
│   │   │   ├── Header/                  # 头部组件
│   │   │   │   ├── index.vue            # 头部入口
│   │   │   │   ├── TopBar.vue           # 顶部导航（桌面端）
│   │   │   │   ├── SearchBar.vue        # 搜索栏
│   │   │   │   ├── MainNav.vue          # 主导航（分类菜单）
│   │   │   │   └── MobileNav.vue        # 移动端导航（汉堡菜单）
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
│   │   │       ├── ProductCard.vue      # 商品卡片
│   │   │       └── Skeleton.vue         # 骨架屏组件
│   │   ├── views/                       # 页面视图
│   │   │   └── Home.vue                 # 首页（组件懒加载）
│   │   ├── router/                      # 路由配置
│   │   │   └── index.js
│   │   ├── stores/                      # Pinia 状态管理
│   │   │   └── cart.js                  # 购物车状态（持久化）
│   │   ├── mock/                        # Mock 数据
│   │   │   ├── index.js                 # 统一导出
│   │   │   ├── banner.js                # 轮播图/搜索数据
│   │   │   ├── categories.js            # 分类数据
│   │   │   ├── navigation.js            # 导航数据
│   │   │   ├── products.js              # 商品数据
│   │   │   ├── brands.js                # 品牌数据
│   │   │   ├── flashSale.js             # 秒杀数据
│   │   │   ├── footer.js                # 页脚数据
│   │   │   └── README.md                # Mock 数据说明
│   │   ├── directives/                  # 自定义指令
│   │   │   └── lazyImg.js               # 图片懒加载指令
│   │   ├── utils/                       # 工具函数
│   │   │   ├── toast.js                 # Toast 提示
│   │   │   └── logger.js                # 日志工具
│   │   ├── App.vue                      # 根组件
│   │   └── main.js                      # 入口文件
│   ├── docs/                            # 项目文档
│   │   ├── COMPONENTS.md                # 组件文档
│   │   ├── API.md                       # API 文档
│   │   └── ACCESSIBILITY.md             # 无障碍文档
│   ├── tests/                           # 测试目录
│   │   ├── setup.js                     # 测试配置
│   │   └── unit/                        # 单元测试
│   │       ├── cart.spec.js             # 购物车测试
│   │       ├── mock-data.spec.js        # Mock 数据测试
│   │       └── components/              # 组件测试
│   │           └── ProductCard.spec.js  # 商品卡片测试
│   ├── index.html                       # HTML 模板
│   ├── vite.config.js                   # Vite 配置
│   ├── vitest.config.js                 # Vitest 测试配置
│   ├── .eslintrc.cjs                    # ESLint 配置
│   ├── .prettierrc                      # Prettier 配置
│   ├── .gitignore                       # Git 忽略配置
│   ├── package.json                     # 项目依赖
│   ├── package-lock.json                # 依赖锁定
│   ├── Dockerfile                       # Docker 构建文件
│   └── nginx.conf                       # Nginx 配置
├── docker-compose.yml                   # Docker Compose 编排
├── .gitignore                           # Git 忽略文件
└── README.md                            # 项目说明文档
```

## 设计规范

### 颜色系统

| 变量名 | 色值 | 用途 |
|--------|------|------|
| $jd-red | #e1251b | 京东红 - 主品牌色 |
| $jd-red-dark | #c81623 | 深红色 - 悬停状态 |
| $jd-orange | #f7931e | 橙色 - 促销/限时 |
| $jd-gold | #ffd700 | 金色 - VIP/会员 |
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

### 响应式断点

| 断点 | 宽度 | 设备 | 布局变化 |
|------|------|------|----------|
| xs | ≤480px | 手机竖屏 | 单列布局 |
| sm | ≤576px | 手机横屏 | 隐藏热搜 |
| md | ≤768px | 平板 | 显示汉堡菜单，隐藏顶部栏 |
| lg | ≤992px | 小型桌面 | 压缩导航间距 |
| xl | ≤1200px | 大型桌面 | 完整布局 |

## 开发命令

```bash
# 代码检查
npm run lint:check

# 代码格式化
npm run format

# 运行测试
npm run test

# 测试覆盖率
npm run test:coverage
```

## Docker 镜像说明

本项目使用官方多架构镜像，支持：
- **AMD64 (x86_64)**: Intel/AMD 处理器
- **ARM64 (aarch64)**: Apple Silicon (M1/M2/M3)

```bash
# 验证架构支持
docker pull --platform linux/arm64 node:20-alpine
docker pull --platform linux/amd64 nginx:alpine
```

## 浏览器支持

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 87+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 88+ |

## License

MIT License
