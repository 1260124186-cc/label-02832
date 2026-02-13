# 无障碍支持文档

本文档介绍项目中的无障碍（Accessibility, a11y）实现和最佳实践。

## 概述

项目遵循 WCAG 2.1 AA 级别标准，确保所有用户（包括使用辅助技术的用户）都能顺畅使用网站。

## 实现的无障碍特性

### 1. 语义化 HTML

使用正确的 HTML 元素表达内容的含义：

```html
<!-- 使用 nav 表示导航 -->
<nav role="navigation" aria-label="商品分类导航">

<!-- 使用 article 表示独立内容 -->
<article class="product-card" role="article">

<!-- 使用 button 表示可交互元素 -->
<button aria-label="加入购物车">
```

### 2. ARIA 属性

#### 轮播图组件

```html
<div 
  class="main-carousel"
  role="region"
  aria-label="促销轮播图"
  aria-roledescription="carousel"
>
  <!-- 幻灯片 -->
  <div 
    role="group"
    aria-roledescription="slide"
    :aria-label="`第 ${index + 1} 张，共 ${total} 张`"
    :aria-hidden="!isActive"
  >

  <!-- 控制按钮 -->
  <button aria-label="上一张幻灯片">
  <button aria-label="下一张幻灯片">

  <!-- 指示器 -->
  <div role="tablist" aria-label="幻灯片选择">
    <button 
      role="tab" 
      :aria-selected="isActive"
      :aria-label="`跳转到第 ${index + 1} 张`"
    >
  </div>
</div>
```

#### 搜索框

```html
<div role="search">
  <label for="search-input" class="visually-hidden">搜索商品</label>
  <input 
    id="search-input"
    type="search"
    aria-autocomplete="list"
    :aria-expanded="showHistory"
    aria-controls="search-history-list"
  />
</div>

<div 
  id="search-history-list"
  role="listbox"
  aria-label="搜索历史"
>
  <a role="option">历史项</a>
</div>
```

#### 移动端导航

```html
<button 
  :aria-expanded="isMenuOpen"
  aria-controls="mobile-menu-drawer"
  aria-label="打开导航菜单"
>

<nav 
  id="mobile-menu-drawer"
  role="dialog"
  aria-modal="true"
  aria-label="导航菜单"
>
  <!-- 可折叠分类 -->
  <button 
    :aria-expanded="isExpanded"
    :aria-controls="`category-sub-${id}`"
  >
  <div :id="`category-sub-${id}`" role="region">
</nav>
```

#### 商品卡片

```html
<article 
  class="product-card"
  :aria-label="`商品：${name}，价格：${price}元`"
  tabindex="0"
>
  <!-- 收藏按钮 -->
  <button 
    :aria-pressed="isCollected"
    :aria-label="isCollected ? '取消收藏' : '收藏'"
  >
</article>
```

### 3. 键盘导航

所有交互元素支持键盘操作：

| 按键 | 功能 |
|------|------|
| Tab | 在可聚焦元素间移动 |
| Enter/Space | 激活按钮/链接 |
| Escape | 关闭弹窗/下拉菜单 |
| 方向键 | 在列表/轮播中导航 |

#### 实现示例

```vue
<div 
  class="category-item"
  tabindex="0"
  @keydown.enter="handleClick"
  @focus="activeSideCategory = index"
  @blur="activeSideCategory = -1"
>
```

### 4. 焦点管理

焦点可见性增强：

```scss
:focus-visible {
  outline: 2px solid $jd-red;
  outline-offset: 2px;
}
```

### 5. 视觉隐藏辅助类

为屏幕阅读器提供额外信息：

```scss
// 视觉隐藏但屏幕阅读器可读
.visually-hidden,
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

使用示例：

```html
<span class="visually-hidden">原价</span>¥299
```

### 6. 减少动画

尊重用户的动画偏好设置：

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 7. 高对比度模式

支持系统高对比度模式：

```scss
@media (prefers-contrast: high) {
  .product-card,
  .brand-card,
  .category-item {
    border: 2px solid currentColor;
  }
  
  a:focus,
  button:focus {
    outline: 3px solid currentColor;
  }
}
```

### 8. 图片替代文本

所有图片都有描述性 alt 属性：

```html
<!-- 装饰性图片 -->
<el-icon aria-hidden="true"><ShoppingCart /></el-icon>

<!-- 功能性图片 -->
<img :alt="product.name" />
```

## 无障碍检查清单

### 感知性

- [x] 所有非文本内容都有替代文本
- [x] 颜色不是传达信息的唯一方式
- [x] 文本与背景有足够对比度

### 可操作性

- [x] 所有功能可通过键盘操作
- [x] 焦点指示器清晰可见
- [x] 没有导致癫痫发作的内容
- [x] 用户有足够时间阅读内容

### 可理解性

- [x] 文本可读且可理解
- [x] 网页以可预测的方式运行
- [x] 帮助用户避免和纠正错误

### 健壮性

- [x] 内容与当前和未来的辅助技术兼容
- [x] 使用有效的 HTML

## 测试工具推荐

1. **浏览器扩展**
   - axe DevTools
   - WAVE Evaluation Tool
   - Lighthouse

2. **屏幕阅读器**
   - macOS: VoiceOver
   - Windows: NVDA / JAWS
   - 移动端: TalkBack (Android) / VoiceOver (iOS)

3. **键盘测试**
   - 禁用鼠标，仅使用键盘导航网站

## 开发建议

### 1. 组件开发时

```vue
<template>
  <!-- 使用语义化标签 -->
  <article>
    <!-- 装饰性图标隐藏 -->
    <el-icon aria-hidden="true">
    
    <!-- 交互元素可聚焦 -->
    <button aria-label="明确的操作描述">
    
    <!-- 动态状态更新 -->
    <div :aria-expanded="isOpen">
  </article>
</template>
```

### 2. 表单开发

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- 关联标签和输入框 -->
    <label for="email">邮箱地址</label>
    <input 
      id="email"
      type="email"
      aria-required="true"
      :aria-invalid="hasError"
      aria-describedby="email-error"
    />
    <span id="email-error" role="alert" v-if="hasError">
      {{ errorMessage }}
    </span>
  </form>
</template>
```

### 3. 模态框/弹窗

```vue
<template>
  <div 
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
    @keydown.escape="closeDialog"
  >
    <h2 id="dialog-title">对话框标题</h2>
    <!-- 焦点应被限制在对话框内 -->
  </div>
</template>
```

## 参考资源

- [WCAG 2.1 指南](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA 规范](https://www.w3.org/TR/wai-aria-1.2/)
- [MDN 无障碍文档](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility)
- [Vue.js 无障碍指南](https://vuejs.org/guide/best-practices/accessibility.html)
