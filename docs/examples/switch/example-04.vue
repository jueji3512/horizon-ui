<template>
  <div class="flex items-center gap-4">
    <Switch v-model="loadingOn" loading />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loadingOn = ref(true)
</script>
