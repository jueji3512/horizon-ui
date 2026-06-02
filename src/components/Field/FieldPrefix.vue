<template>
  <span v-bind="prefixAttrs" :class="prefixClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const prefixAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const prefixClasses = computed(() =>
  cn('ml-2 inline-flex shrink-0 items-center', attrs.class as Parameters<typeof cn>[number]),
)
</script>
