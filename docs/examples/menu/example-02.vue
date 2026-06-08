<template>
  <Menu class="w-60 rounded-[var(--round-default)] bg-[var(--bg-color-container)] shadow-popper">
    <MenuLabel>视图设置</MenuLabel>
    <MenuCheckboxItem v-model:checked="showToolbar" value="toolbar"> 显示工具栏 </MenuCheckboxItem>
    <MenuCheckboxItem v-model:checked="showRowNumbers" value="row-numbers">
      显示行号
    </MenuCheckboxItem>
    <MenuCheckboxItem v-model:checked="wrapText" value="wrap-text"> 自动换行 </MenuCheckboxItem>
    <MenuCheckboxItem v-model:checked="showGrid" value="grid"> 显示网格线 </MenuCheckboxItem>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, MenuCheckboxItem, MenuLabel } from '@/components'

const showToolbar = ref(true)
const showRowNumbers = ref(false)
const wrapText = ref(true)
const showGrid = ref(true)
</script>
