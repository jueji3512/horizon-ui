<template>
  <Dropdown match-width @select="handleSelect">
    <template #trigger>
      <Button class="w-56 justify-between" suffix-icon="chevron-down">批量操作</Button>
    </template>

    <DropdownItem value="enable" icon="circle-check">启用选中项</DropdownItem>
    <DropdownItem value="archive" icon="archive">归档选中项</DropdownItem>
    <DropdownItem value="delete" icon="delete" theme="error">删除选中项</DropdownItem>
  </Dropdown>

  <Text class="mt-3 block" theme="secondary">当前操作：{{ selectedAction }}</Text>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, DropdownItem, Text, type DropdownValue } from '@/components'

const selectedAction = ref('无')

function handleSelect(value: DropdownValue) {
  selectedAction.value = String(value)
}
</script>
