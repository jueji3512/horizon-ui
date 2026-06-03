<template>
  <div class="flex flex-col gap-3">
    <Input v-model="text" prefix-icon="search" placeholder="搜索" />
    <Input v-model="text" suffix-icon="search" placeholder="搜索" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
