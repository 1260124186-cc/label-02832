<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 页面加载时强制滚动到顶部（处理浏览器刷新时的滚动位置恢复）
onMounted(() => {
  // 使用 history.scrollRestoration 禁用浏览器自动恢复滚动位置
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  // 强制滚动到顶部
  window.scrollTo(0, 0)
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: $bg-primary;
}
</style>
