<template>
  <header class="header">
    <TopBar />
    <SearchBar />
    <MainNav />
  </header>
</template>

<script setup>
import TopBar from './TopBar.vue'
import SearchBar from './SearchBar.vue'
import MainNav from './MainNav.vue'
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  box-shadow: $shadow-md;
}
</style>
