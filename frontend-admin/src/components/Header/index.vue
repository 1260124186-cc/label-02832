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
  display: block; // 桌面端默认 block
  background: $color-white;

  // 平板和移动端使用 flex 布局显示汉堡菜单
  @include respond-to(md) {
    display: flex;
    align-items: center; // 垂直居中对齐
    padding: $spacing-xs $spacing-sm;
    flex-wrap: wrap;
  }
}
</style>
