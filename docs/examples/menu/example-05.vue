<template>
  <Menu class="w-60 rounded-[var(--round-default)] bg-[var(--bg-color-container)] shadow-popper">
    <MenuItem value="refresh" icon="refresh">刷新数据</MenuItem>
    <MenuCheckboxItem v-model:checked="showGrid" value="grid"> 显示网格线 </MenuCheckboxItem>
    <MenuCheckboxItem v-model:checked="pinToolbar" value="pin" close-on-select>
      固定工具栏
    </MenuCheckboxItem>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, MenuCheckboxItem, MenuItem } from '@/components'

const showGrid = ref(true)
const pinToolbar = ref(false)
</script>
