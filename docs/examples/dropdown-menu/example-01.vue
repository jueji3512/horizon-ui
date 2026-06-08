<template>
  <div class="flex flex-col items-start gap-3">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button suffix-icon="chevron-down">更多操作</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Menu @select="handleSelect">
          <MenuItem value="edit" icon="edit">编辑项目</MenuItem>
          <MenuItem value="copy" icon="copy">复制项目</MenuItem>
          <MenuItem value="archive" icon="archive">归档项目</MenuItem>
          <MenuSeparator />
          <MenuItem value="delete" icon="delete" theme="error">删除项目</MenuItem>
        </Menu>
      </DropdownMenuContent>
    </DropdownMenu>

    <Text theme="secondary">最近操作：{{ latestAction }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Menu,
  MenuItem,
  MenuSeparator,
  Text,
  type MenuValue,
} from '@/components'

const latestAction = ref('尚未选择')

function handleSelect(value: MenuValue) {
  latestAction.value = String(value)
}
</script>
