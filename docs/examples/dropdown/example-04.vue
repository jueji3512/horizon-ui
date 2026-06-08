<template>
  <div class="flex flex-wrap items-center gap-3">
    <Dropdown trigger="hover" :show-delay="120" :hide-delay="120">
      <template #trigger>
        <Button>悬停打开</Button>
      </template>

      <DropdownItem value="hover-preview" icon="eye">预览</DropdownItem>
      <DropdownItem value="hover-copy" icon="copy">复制链接</DropdownItem>
    </Dropdown>

    <Dropdown
      v-model:visible="visible"
      trigger="manual"
      :close-on-outside-click="false"
      :close-on-esc="false"
    >
      <template #trigger>
        <Button suffix-icon="chevron-down">手动菜单</Button>
      </template>

      <DropdownItem value="manual-save" icon="save">保存草稿</DropdownItem>
      <DropdownItem value="manual-refresh" icon="refresh">刷新状态</DropdownItem>
    </Dropdown>

    <Button variant="outline" @click="visible = true">打开</Button>
    <Button variant="outline" @click="visible = false">关闭</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dropdown, DropdownItem } from '@/components'

const visible = ref(false)
</script>
