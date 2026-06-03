<template>
  <div class="flex flex-col gap-3">
    <Input v-model="disabled" disabled />
    <Input v-model="readonly" readonly />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabled = ref('禁用状态')

const readonly = ref('只读状态')
</script>
