<template>
  <span v-bind="suffixAttrs" :class="suffixClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '../../utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const suffixAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const suffixClasses = computed(() =>
  cn('mr-2 inline-flex shrink-0 items-center', attrs.class as Parameters<typeof cn>[number]),
)
</script>
