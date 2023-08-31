<script lang="ts" setup>
import SideBar from '@/components/SideBar/index.vue'
</script>

<template>
  <div flex h-full>
    <SideBar />
    <div flex="1" p-1>
      <router-view />
    </div>
  </div>
</template>
