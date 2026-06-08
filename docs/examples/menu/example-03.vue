<template>
  <Menu class="w-56 rounded-[var(--round-default)] bg-[var(--bg-color-container)] shadow-popper">
    <MenuRadioGroup v-model="density" label="显示密度">
      <MenuRadioItem value="comfortable">舒适</MenuRadioItem>
      <MenuRadioItem value="balanced">平衡</MenuRadioItem>
      <MenuRadioItem value="compact">紧凑</MenuRadioItem>
    </MenuRadioGroup>
  </Menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, MenuRadioGroup, MenuRadioItem } from '@/components'

const density = ref('balanced')
</script>
