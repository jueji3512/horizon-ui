<template>
  <div v-bind="$attrs" :data-disabled="disabled || undefined" :class="groupClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const groupClasses = computed(() =>
  cn('inline-flex min-w-0 items-stretch', props.disabled && 'cursor-not-allowed'),
)
</script>
