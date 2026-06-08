<template>
  <PopoverTrigger :as-child="asChild" aria-haspopup="menu">
    <slot />
  </PopoverTrigger>
</template>

<script setup lang="ts">
import { PopoverTrigger } from '../Popover'

withDefaults(
  defineProps<{
    asChild?: boolean
  }>(),
  {
    asChild: false,
  },
)
</script>
