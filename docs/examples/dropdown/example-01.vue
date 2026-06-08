<template>
  <div class="flex flex-col items-start gap-3">
    <Dropdown @select="handleSelect">
      <template #trigger="{ visible }">
        <Button suffix-icon="chevron-down">
          {{ visible ? '收起操作' : '更多操作' }}
        </Button>
      </template>

      <DropdownItem value="edit" icon="edit">编辑项目</DropdownItem>
      <DropdownItem value="copy" icon="copy">复制项目</DropdownItem>
      <DropdownItem value="archive" icon="archive">归档项目</DropdownItem>
    </Dropdown>

    <Text theme="secondary">最近操作：{{ latestAction }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, DropdownItem, Text, type DropdownValue } from '@/components'

const latestAction = ref('尚未选择')

function handleSelect(value: DropdownValue) {
  latestAction.value = String(value)
}
</script>
