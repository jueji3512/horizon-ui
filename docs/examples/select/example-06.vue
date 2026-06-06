<template>
  <div class="max-w-80">
    <Select v-model="value" :options="roleOptions" placeholder="选择角色" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectOption, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('editor')

const roleOptions: SelectOption[] = [
  { label: '所有者', value: 'owner', disabled: true },
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '只读成员', value: 'viewer' },
]
</script>
