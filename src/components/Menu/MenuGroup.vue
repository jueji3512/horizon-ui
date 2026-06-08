<template>
  <div
    role="group"
    :aria-label="title || undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    class="min-w-0"
  >
    <MenuLabel v-if="title" :disabled="disabled">
      {{ title }}
    </MenuLabel>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { menuGroupContextKey } from './context'
import MenuLabel from './MenuLabel.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    disabled?: boolean
  }>(),
  {
    title: '',
    disabled: false,
  },
)

provide(menuGroupContextKey, {
  disabled: computed(() => props.disabled),
})
</script>
