<script setup lang="ts">
import { ref } from 'vue'
const Text = ref('')
function copyTextToClipboard() {
  window.SYSTEM_API.copyTextToClipboard(`${Math.random()}`)
}
function getClipboardText() {
  window.SYSTEM_API.getClipboardText().then((data: string) => {
    Text.value = data
  })
}
</script>

<template>
  <div>
    <h1>Index.vue</h1>
    <el-button type="primary" @click="copyTextToClipboard">点击复制</el-button>
    <el-button type="primary" @click="getClipboardText">查看内容</el-button>
    <el-input v-model="Text" />
  </div>
</template>
