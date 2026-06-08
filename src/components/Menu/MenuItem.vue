<template>
  <MenuItemBase
    kind="item"
    :value="value"
    :label="label"
    :disabled="disabled"
    :icon="icon"
    :theme="theme"
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
    disabled?: boolean
    icon?: string
    theme?: MenuItemTheme
    closeOnSelect?: boolean
  }>(),
  {
    label: '',
    disabled: false,
    icon: '',
    theme: 'default',
    closeOnSelect: undefined,
  },
)

const emit = defineEmits<{
  select: [value: MenuValue]
}>()

function handleSelect() {
  emit('select', props.value)
}
</script>
