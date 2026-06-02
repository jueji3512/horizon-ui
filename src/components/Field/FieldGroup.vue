<template>
  <div v-bind="groupAttrs" :data-disabled="disabled || undefined" :class="groupClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
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

const attrs = useAttrs()

const groupAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const groupClasses = computed(() =>
  cn(
    'inline-flex min-w-0 items-stretch',
    props.disabled && 'cursor-not-allowed',
    attrs.class as Parameters<typeof cn>[number],
  ),
)
</script>
