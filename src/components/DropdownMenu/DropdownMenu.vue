<template>
  <Popover
    :open="computedOpen"
    :trigger="trigger"
    :placement="placement"
    :offset="offset"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :disabled="disabled"
    :close-on-outside-click="closeOnOutsideClick"
    :close-on-esc="closeOnEsc"
    :return-focus-on-close="returnFocusOnClose"
    :to="to"
    :flip="flip"
    :shift="shift"
    :match-width="matchWidth"
    :strategy="strategy"
    :auto-update="autoUpdate"
    :z-index="zIndex"
    @update:open="handleOpenUpdate"
    @open-change="handleOpenChange"
  >
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Popover } from '../Popover'
import type { DropdownMenuPlacement, DropdownMenuStrategy, DropdownMenuTriggerType } from './types'

const props = withDefaults(
  defineProps<{
    open?: boolean
    trigger?: DropdownMenuTriggerType
    placement?: DropdownMenuPlacement
    offset?: number
    openDelay?: number
    closeDelay?: number
    disabled?: boolean
    closeOnOutsideClick?: boolean
    closeOnEsc?: boolean
    returnFocusOnClose?: boolean
    to?: string | HTMLElement
    flip?: boolean
    shift?: boolean
    matchWidth?: boolean
    strategy?: DropdownMenuStrategy
    autoUpdate?: boolean
    zIndex?: number
  }>(),
  {
    open: undefined,
    trigger: 'click',
    placement: 'bottom-start',
    offset: 4,
    openDelay: 0,
    closeDelay: 0,
    disabled: false,
    closeOnOutsideClick: true,
    closeOnEsc: true,
    returnFocusOnClose: true,
    to: 'body',
    flip: true,
    shift: false,
    matchWidth: false,
    strategy: 'absolute',
    autoUpdate: true,
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  'open-change': [value: boolean]
}>()

const computedOpen = computed(() => props.open)

function handleOpenUpdate(value: boolean) {
  emit('update:open', value)
}

function handleOpenChange(value: boolean) {
  emit('open-change', value)
}
</script>
