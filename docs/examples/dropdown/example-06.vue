<template>
  <Dropdown :max-height="168" max-width="18rem" @select="handleSelect">
    <template #trigger>
      <Button suffix-icon="chevron-down">选择视图</Button>
    </template>

    <DropdownItem v-for="view in views" :key="view.value" :value="view.value" :icon="view.icon">
      {{ view.label }}
    </DropdownItem>
  </Dropdown>

  <Text class="mt-3 block" theme="secondary">当前视图：{{ selectedView }}</Text>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, Dropdown, DropdownItem, Text, type DropdownValue } from '@/components'

const selectedValue = ref<DropdownValue>('overview')
const views = [
  { value: 'overview', label: '总览', icon: 'layout-dashboard' },
  { value: 'activity', label: '活动记录', icon: 'clock' },
  { value: 'members', label: '成员', icon: 'users' },
  { value: 'files', label: '文件', icon: 'file' },
  { value: 'settings', label: '设置', icon: 'settings' },
  { value: 'security', label: '安全', icon: 'shield-check' },
  { value: 'billing', label: '账单', icon: 'table' },
  { value: 'integrations', label: '集成', icon: 'layers' },
]

const selectedView = computed(
  () => views.find((view) => view.value === selectedValue.value)?.label ?? '无',
)

function handleSelect(value: DropdownValue) {
  selectedValue.value = value
}
</script>
