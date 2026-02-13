<template>
  <header class="header">
    <TopBar />
    <div class="search-bar-wrapper">
      <MobileNav />
      <SearchBar />
    </div>
    <MainNav />
  </header>
</template>

<script setup>
import TopBar from './TopBar.vue'
import SearchBar from './SearchBar.vue'
import MainNav from './MainNav.vue'
import MobileNav from './MobileNav.vue'
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  box-shadow: $shadow-md;
}

.search-bar-wrapper {
  display: flex;
  align-items: center;
  background: $color-white;
  
  // 移动端显示汉堡菜单
  @include respond-to(md) {
    padding-left: $spacing-sm;
  }
  
  // 桌面端不需要额外样式
  @include respond-to(lg) {
    display: block;
  }
}
</style>
