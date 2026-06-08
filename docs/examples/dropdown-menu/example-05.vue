<template>
  <div class="flex flex-wrap items-center gap-3">
    <DropdownMenu
      v-model:open="open"
      trigger="manual"
      :close-on-outside-click="false"
      :close-on-esc="false"
    >
      <DropdownMenuTrigger as-child>
        <Button suffix-icon="chevron-down">受控菜单</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Menu>
          <MenuItem value="save" icon="save">保存草稿</MenuItem>
          <MenuItem value="refresh" icon="refresh">刷新状态</MenuItem>
        </Menu>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button variant="outline" @click="open = true">打开</Button>
    <Button variant="outline" @click="open = false">关闭</Button>
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
} from '@/components'

const open = ref(false)
</script>
