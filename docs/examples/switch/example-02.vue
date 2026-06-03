<template>
  <div class="flex items-center gap-4">
    <Switch v-model="active" size="sm" />
    <Switch v-model="active" size="md" />
    <Switch v-model="active" size="lg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(true)
</script>
