<template>
  <Input v-model="password" type="password" show-password placeholder="请输入密码" />
</template>

<script setup>
import { ref } from 'vue'

const password = ref('123456')
</script>
