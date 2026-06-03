<template>
  <FieldRoot>
    <FieldNativeInput v-model="basic" placeholder="请输入内容" />
  </FieldRoot>
</template>

<script setup>
import { ref } from 'vue'

const basic = ref('')
</script>
