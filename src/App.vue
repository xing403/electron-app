<script setup lang="ts">
const sendMessageMain = () => {
  const result = API.sendMessageMain('hi, main')
  console.log(result)
}
</script>

<template>
  <div><button @click="sendMessageMain">sendMessageMain</button></div>
</template>

<style scoped>
</style>
