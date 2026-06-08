<template>
  <MenuItemBase
    kind="radio"
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
import { computed } from 'vue'
import MenuItemBase from './MenuItemBase.vue'
import { useMenuRadioGroupContext } from './context'
import type { MenuItemTheme, MenuValue } from './types'

const props = withDefaults(
  defineProps<{
    value: MenuValue
    label?: string
    disabled?: boolean
    theme?: MenuItemTheme
    closeOnSelect?: boolean
  }>(),
  {
    label: '',
    disabled: false,
    theme: 'default',
    closeOnSelect: undefined,
  },
)

const emit = defineEmits<{
  select: [value: MenuValue]
}>()

const group = useMenuRadioGroupContext()
const checked = computed(() => Boolean(group && group.modelValue.value === props.value))

function handleSelect() {
  group?.setValue(props.value)
  emit('select', props.value)
}
</script>
