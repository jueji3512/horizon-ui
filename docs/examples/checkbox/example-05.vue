<template>
  <CheckboxGroup v-model="minmax" :min="1" :max="2">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">至少选 1 项，最多选 2 项</div>
</template>

<script setup>
import { ref } from 'vue'

const minmax = ref(['a', 'b'])
</script>
