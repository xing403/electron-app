<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
const copy_text = ref('')
const clipboard_text = ref('')
function getValue() {
  copy_text.value = Math.floor(Math.random() * 1000)
}
function copyTextToClipboard() {
  window.UtilsTools.copyTextToClipboard(`${copy_text.value}`)
  ElMessage.success('复制成功')
}
function getClipboardText() {
  window.UtilsTools.getClipboardText().then((data: string) => {
    clipboard_text.value = data
  })
}
getValue()
</script>

<template>
  <el-alert title="An integer between 1 and 1000 will be randomly generated." type="info" show-icon :closable="false" />
  <div flex="~ row gap-1" my-2>
    <el-button @click="getValue">refresh</el-button>
    <el-button type="primary" @click="copyTextToClipboard">copy text</el-button>
    <el-button type="success" @click="getClipboardText">get pasteboard</el-button>
  </div>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <el-input v-model="copy_text" placeholder="What will be copied" />
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <el-input v-model="clipboard_text" placeholder="Ctrl + V Paste content" />
    </el-col>
  </el-row>
  <el-collapse>
    <el-collapse-item title="code detail">
      
    </el-collapse-item>
  </el-collapse>
</template>
