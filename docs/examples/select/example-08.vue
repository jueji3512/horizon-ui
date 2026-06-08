<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" placeholder="选择技术栈">
      <SelectOption value="all">不限</SelectOption>

      <SelectOptionGroup title="前端框架">
        <SelectOption value="vue">Vue</SelectOption>
        <SelectOption value="react">React</SelectOption>
        <SelectOption value="svelte">Svelte</SelectOption>
      </SelectOptionGroup>

      <SelectOptionGroup title="后端框架">
        <SelectOption value="nestjs">NestJS</SelectOption>
        <SelectOption value="laravel" disabled>Laravel</SelectOption>
      </SelectOptionGroup>

      <SelectOptionGroup title="设计工具" disabled>
        <SelectOption value="figma">Figma</SelectOption>
        <SelectOption value="sketch">Sketch</SelectOption>
      </SelectOptionGroup>

      <SelectOption value="other">其他</SelectOption>
    </Select>
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, SelectOptionGroup, Text, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('vue')
</script>
