<template>
  <div class="flex flex-wrap gap-2">
    <Tag
      checkable
      v-model:checked="checked1"
      variant="outline"
      :checked-props="{ variant: 'dark', theme: 'brand' }"
      >选项一</Tag
    >
    <Tag
      checkable
      v-model:checked="checked2"
      variant="outline"
      theme="brand"
      :checked-props="{ variant: 'dark', theme: 'brand' }"
      >选项二</Tag
    >
    <Tag
      checkable
      v-model:checked="checked3"
      variant="outline"
      theme="success"
      :checked-props="{ variant: 'dark', theme: 'success' }"
      >选项三</Tag
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)

const checked2 = ref(false)

const checked3 = ref(false)
</script>
