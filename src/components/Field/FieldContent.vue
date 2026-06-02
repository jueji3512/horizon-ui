<template>
  <component :is="renderTag" v-bind="$attrs" :class="contentClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'
import { useFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  multiline?: boolean
  tag?: 'span' | 'div'
}>()

const field = useFieldContext()

const isMultiline = computed(() => props.multiline ?? field?.multiline.value ?? false)
const renderTag = computed(() => props.tag ?? (isMultiline.value ? 'div' : 'span'))

const contentClasses = computed(() =>
  cn(
    'relative flex min-w-0 flex-1',
    isMultiline.value ? 'flex-wrap items-center gap-1 py-1' : 'h-full items-center',
  ),
)
</script>
