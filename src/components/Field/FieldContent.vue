<template>
  <component :is="renderTag" v-bind="contentAttrs" :class="contentClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../utils'
import { useFieldContext } from './context'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  multiline?: boolean
  tag?: 'span' | 'div'
}>()

const field = useFieldContext()
const attrs = useAttrs()

const isMultiline = computed(() => props.multiline ?? field?.multiline.value ?? false)
const renderTag = computed(() => props.tag ?? (isMultiline.value ? 'div' : 'span'))

const contentAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const contentClasses = computed(() =>
  cn(
    'relative flex min-w-0 flex-1',
    isMultiline.value ? 'flex-wrap items-center gap-1 py-1' : 'h-full items-center',
    attrs.class as Parameters<typeof cn>[number],
  ),
)
</script>
