<template>
  <span v-bind="$attrs" :class="suffixClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

defineOptions({ inheritAttrs: false })

const suffixClasses = computed(() => cn('mr-2 inline-flex shrink-0 items-center'))
</script>
