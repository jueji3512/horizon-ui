<template>
  <div class="flex flex-col gap-3">
    <Input v-model="statusError" status="error" placeholder="错误状态" />
    <Input v-model="statusWarning" status="warning" placeholder="警告状态" />
    <Input v-model="statusSuccess" status="success" placeholder="成功状态" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const statusError = ref('错误内容')

const statusWarning = ref('警告内容')

const statusSuccess = ref('成功内容')
</script>
