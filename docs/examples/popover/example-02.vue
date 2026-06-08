<template>
  <div class="flex flex-wrap items-center gap-3">
    <Popover trigger="hover" :open-delay="120" :close-delay="120">
      <PopoverTrigger as-child>
        <Button variant="outline">悬停</Button>
      </PopoverTrigger>
      <PopoverContent class="w-56 p-3">
        <Text>悬停触发适合轻量预览内容。</Text>
      </PopoverContent>
    </Popover>

    <Popover trigger="focus">
      <PopoverTrigger as-child>
        <Button variant="outline">聚焦</Button>
      </PopoverTrigger>
      <PopoverContent class="w-56 p-3">
        <Text>聚焦触发适合辅助说明。</Text>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@/components'
</script>
