<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" placeholder="选择角色">
      <SelectOption value="owner">所有者</SelectOption>
      <SelectOption value="admin" disabled>管理员（不可选）</SelectOption>
      <SelectOption value="editor">编辑者</SelectOption>
      <SelectOption value="viewer">查看者</SelectOption>
    </Select>
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, Text, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('editor')
</script>
