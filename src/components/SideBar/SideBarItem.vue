<script setup lang="ts">
import SideBarItem from './SideBarItem.vue';
defineProps<{
  routes: any,
  parentPath?: string
}>()

</script>

<template>
  <el-sub-menu v-if="routes.children" :index="routes.path">
    <template #title>
      <span>{{ routes.meta?.title }}</span>
    </template>
    <template v-for="(item, index) in routes.children" :key="index">
      <SideBarItem :routes="item" :parent-path="routes.path" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="routes.path">
    <template #title>
      <span>{{ routes.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>
