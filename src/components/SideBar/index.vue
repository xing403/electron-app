<script setup lang="ts">
import { useRouter } from 'vue-router'
import SideBarItem from './SideBarItem.vue';
const router = useRouter()
const routes = router.options.routes
</script>

<template>
  <el-menu h-full router :default-active="router.currentRoute.value.path">
    <SideBarItem v-for="(route, index) in routes" :key="index" :routes="route" />
  </el-menu>
</template>
<style>
.el-menu--vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
