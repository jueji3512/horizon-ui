<template>
  <Input v-model="clearable" clearable placeholder="输入试试" />
</template>

<script setup>
import { ref } from 'vue'

const clearable = ref('可清空文本')
</script>
