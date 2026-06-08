<template>
  <div role="group" :aria-label="label || undefined" class="min-w-0">
    <MenuLabel v-if="label">
      {{ label }}
    </MenuLabel>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { menuRadioGroupContextKey } from './context'
import MenuLabel from './MenuLabel.vue'
import type { MenuValue } from './types'

const props = withDefaults(
  defineProps<{
    modelValue?: MenuValue | null
    label?: string
  }>(),
  {
    modelValue: null,
    label: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: MenuValue]
  change: [value: MenuValue]
}>()

function setValue(value: MenuValue) {
  if (value === props.modelValue) return
  emit('update:modelValue', value)
  emit('change', value)
}

provide(menuRadioGroupContextKey, {
  modelValue: computed(() => props.modelValue ?? null),
  setValue,
})
</script>
