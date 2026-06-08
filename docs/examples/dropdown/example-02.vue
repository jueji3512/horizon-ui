<template>
  <div class="flex flex-wrap items-center gap-3">
    <Dropdown @select="handleSelect">
      <template #trigger>
        <Button>成员操作</Button>
      </template>

      <DropdownItem value="invite" icon="user-plus">邀请成员</DropdownItem>
      <DropdownItem value="transfer" icon="shield" disabled>转移所有权</DropdownItem>
      <DropdownItem value="remove" icon="delete" theme="error">移除成员</DropdownItem>
    </Dropdown>

    <Dropdown disabled>
      <template #trigger>
        <Button disabled>禁用菜单</Button>
      </template>

      <DropdownItem value="disabled">不可打开</DropdownItem>
    </Dropdown>

    <Text theme="secondary">当前操作：{{ selectedAction }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, DropdownItem, Text, type DropdownValue } from '@/components'

const selectedAction = ref('无')

function handleSelect(value: DropdownValue) {
  selectedAction.value = String(value)
}
</script>
