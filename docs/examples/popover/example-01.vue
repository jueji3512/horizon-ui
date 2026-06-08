<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button>查看详情</Button>
    </PopoverTrigger>

    <PopoverContent class="w-64 p-3">
      <Title :level="5">项目状态</Title>
      <Text theme="secondary">当前项目正在同步成员、权限和最新活动。</Text>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Button, Popover, PopoverContent, PopoverTrigger, Text, Title } from '@/components'
</script>
