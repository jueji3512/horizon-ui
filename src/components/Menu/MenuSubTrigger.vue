<template>
  <PopoverTrigger as-child aria-haspopup="menu">
    <MenuItemBase
      kind="subtrigger"
      :value="value"
      :label="label"
      :disabled="disabled"
      :icon="icon"
      :theme="theme"
      :close-on-select="false"
      :open-submenu="submenu?.openSubmenu"
      :set-submenu-trigger-element="submenu?.setTriggerElement"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @select="handleSelect"
    >
      <slot />
      <template #suffix>
        <Icon name="chevron-right" class="text-base" />
      </template>
    </MenuItemBase>
  </PopoverTrigger>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue'
import { PopoverTrigger } from '../Popover'
import MenuItemBase from './MenuItemBase.vue'
import { useMenuSubContext } from './context'
import type { MenuItemTheme, MenuValue } from './types'

const props = withDefaults(
  defineProps<{
    value: MenuValue
    label?: string
    disabled?: boolean
    icon?: string
    theme?: MenuItemTheme
  }>(),
  {
    label: '',
    disabled: false,
    icon: '',
    theme: 'default',
  },
)

const submenu = useMenuSubContext()

function handleSelect() {
  submenu?.openSubmenu()
}

function handleMouseEnter() {
  if (!props.disabled) submenu?.openSubmenu()
}

function handleMouseLeave() {
  if (!props.disabled) submenu?.closeSubmenu()
}
</script>
