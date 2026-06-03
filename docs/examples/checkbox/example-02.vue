<template>
  <CheckboxGroup v-model="checked">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">checked: {{ checked }}</div>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(['a', 'b'])
</script>
