<template>
  <div class="flex flex-wrap items-center gap-3">
    <Popover
      v-model:open="open"
      trigger="manual"
      :close-on-outside-click="false"
      :close-on-esc="false"
    >
      <PopoverTrigger as-child>
        <Button suffix-icon="chevron-down">受控浮层</Button>
      </PopoverTrigger>

      <PopoverContent class="w-56 p-3">
        <Text>这里只由外部按钮控制开关。</Text>
      </PopoverContent>
    </Popover>

    <Button variant="outline" @click="open = true">打开</Button>
    <Button variant="outline" @click="open = false">关闭</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@/components'

const open = ref(false)
</script>
