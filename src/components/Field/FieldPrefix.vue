<template>
  <span v-bind="$attrs" :class="prefixClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

defineOptions({ inheritAttrs: false })

const prefixClasses = computed(() => cn('ml-2 inline-flex shrink-0 items-center'))
</script>
