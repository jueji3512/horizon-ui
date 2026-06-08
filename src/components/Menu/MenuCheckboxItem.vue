<template>
  <MenuItemBase
    kind="checkbox"
    :value="value"
    :label="label"
    :disabled="disabled"
    :theme="theme"
    :checked="checked"
    :close-on-select="closeOnSelect"
    @select="handleSelect"
  >
    <slot />
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </MenuItemBase>
</template>

<script setup lang="ts">
import MenuItemBase from './MenuItemBase.vue'
import type { MenuItemTheme, MenuValue } from './types'

const props = withDefaults(
  defineProps<{
    value: MenuValue
    label?: string
    checked?: boolean
    disabled?: boolean
    theme?: MenuItemTheme
    closeOnSelect?: boolean
  }>(),
  {
    label: '',
    checked: false,
    disabled: false,
    theme: 'default',
    closeOnSelect: undefined,
  },
)

const emit = defineEmits<{
  'update:checked': [value: boolean]
  change: [value: boolean]
  select: [value: MenuValue]
}>()

function handleSelect() {
  const next = !props.checked
  emit('update:checked', next)
  emit('change', next)
  emit('select', props.value)
}
</script>
