<template>
  <PopoverContent
    :panel-class="contentClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Menu nested>
      <slot />
    </Menu>
  </PopoverContent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverContent } from '../Popover'
import { cn } from '../../utils'
import Menu from './Menu.vue'
import { useMenuSubContext } from './context'

const props = withDefaults(
  defineProps<{
    panelClass?: string
  }>(),
  {
    panelClass: '',
  },
)

const contentClasses = computed(() =>
  cn(
    'overflow-hidden rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    props.panelClass,
  ),
)

const submenu = useMenuSubContext()

function handleMouseEnter() {
  submenu?.openSubmenu()
}

function handleMouseLeave() {
  submenu?.closeSubmenu()
}
</script>
