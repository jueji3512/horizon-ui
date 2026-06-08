<template>
  <Dropdown @select="handleSelect">
    <template #trigger>
      <Button suffix-icon="more-horizontal">项目菜单</Button>
    </template>

    <DropdownGroup title="常用操作">
      <DropdownItem value="open" icon="external-link">打开</DropdownItem>
      <DropdownItem value="rename" icon="edit">重命名</DropdownItem>
    </DropdownGroup>

    <DropdownDivider />

    <DropdownGroup title="危险操作">
      <DropdownItem value="delete" icon="delete" theme="error">删除</DropdownItem>
    </DropdownGroup>
  </Dropdown>

  <Text class="mt-3 block" theme="secondary">最近选择：{{ latestAction }}</Text>
</template>

<script setup lang="ts">
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownGroup,
  DropdownItem,
  Text,
  type DropdownValue,
} from '@/components'
import { ref } from 'vue'

const latestAction = ref('无')

function handleSelect(value: DropdownValue) {
  latestAction.value = String(value)
}
</script>
