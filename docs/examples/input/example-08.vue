<template>
  <Input v-model="wordLimited" :maxlength="50" show-word-limit placeholder="最多输入 50 个字符" />
</template>

<script setup>
import { ref } from 'vue'

const wordLimited = ref('')
</script>
