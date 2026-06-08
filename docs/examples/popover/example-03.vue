<template>
  <Popover placement="bottom-start">
    <PopoverTrigger as-child>
      <Button prefix-icon="filter">筛选</Button>
    </PopoverTrigger>

    <PopoverContent class="w-72 p-3">
      <div class="flex flex-col gap-3">
        <Title :level="5">筛选条件</Title>
        <Input v-model="keyword" placeholder="搜索项目" />
        <div class="flex justify-end gap-2">
          <Button variant="outline">重置</Button>
          <Button theme="brand">应用</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Title } from '@/components'

const keyword = ref('')
</script>
