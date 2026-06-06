<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="loadingValue" loading :options="[]" placeholder="加载成员" />
    <Select v-model="emptyValue" :options="[]" empty-text="没有匹配选项" placeholder="选择成员" />
    <Select
      v-model="emptyGroupValue"
      :options="emptyGroupOptions"
      empty-text="分组内没有选项"
      placeholder="空分组"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectOption, type SelectValue } from '@/components'

const loadingValue = ref<SelectValue | null>(null)
const emptyValue = ref<SelectValue | null>(null)
const emptyGroupValue = ref<SelectValue | null>(null)

const emptyGroupOptions: SelectOption[] = [{ title: '空分组', children: [] }]
</script>
