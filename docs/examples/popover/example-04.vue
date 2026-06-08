<template>
  <Popover placement="bottom-start">
    <PopoverTrigger as-child>
      <Button>父级浮层</Button>
    </PopoverTrigger>

    <PopoverContent class="w-64 p-3">
      <div class="flex flex-col gap-3">
        <Text theme="secondary">点击子浮层不会关闭父级内容。</Text>

        <Popover placement="right-start">
          <PopoverTrigger as-child>
            <Button variant="outline">打开子浮层</Button>
          </PopoverTrigger>
          <PopoverContent class="w-52 p-3">
            <Text>Esc 会优先关闭最内层浮层。</Text>
          </PopoverContent>
        </Popover>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@/components'
</script>
