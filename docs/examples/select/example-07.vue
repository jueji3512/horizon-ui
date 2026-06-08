<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="loadingValue" loading placeholder="加载成员">
      <SelectOption value="placeholder">加载完成后显示</SelectOption>
    </Select>

    <Select v-model="emptyValue" empty-text="没有匹配选项" placeholder="选择成员" />

    <Select v-model="emptyGroupValue" empty-text="分组内暂无选项" placeholder="选择团队">
      <SelectOptionGroup title="设计团队" />
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, SelectOptionGroup, type SelectValue } from '@/components'

const loadingValue = ref<SelectValue | null>(null)
const emptyValue = ref<SelectValue | null>(null)
const emptyGroupValue = ref<SelectValue | null>(null)
</script>
