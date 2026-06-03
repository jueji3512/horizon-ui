<template>
  <div class="flex flex-col gap-3">
    <Input v-model="text" size="sm" placeholder="小尺寸" />
    <Input v-model="text" size="md" placeholder="中尺寸（默认）" />
    <Input v-model="text" size="lg" placeholder="大尺寸" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
