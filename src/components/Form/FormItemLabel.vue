<template>
  <label v-if="visible" :for="controlId" :class="labelClasses">
    <span v-if="required" class="text-error" aria-hidden="true">*</span>
    <slot name="label">
      <span class="truncate">{{ label }}</span>
    </slot>
    <Tooltip v-if="hasTip" trigger="manual" :visible="tipVisible" placement="top">
      <button
        type="button"
        class="inline-flex h-4 w-4 items-center justify-center rounded-[var(--round-full)] text-[var(--text-color-secondary)] outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand-focus"
        :aria-label="`${label || 'Field'} tip`"
        @mouseenter="showTip"
        @mouseleave="hideTip"
        @focus="showTip"
        @blur="hideTip"
      >
        <Icon name="circle-help" />
      </button>
      <template #content>
        <slot name="tip">{{ tip }}</slot>
      </template>
    </Tooltip>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import { cn } from '../../utils'

const props = withDefaults(
  defineProps<{
    controlId: string
    label?: string
    required?: boolean
    tip?: string
    disabled?: boolean
  }>(),
  {
    label: '',
    required: false,
    tip: '',
    disabled: false,
  },
)

const slots = useSlots()
const tipVisible = ref(false)

const hasTip = computed(() => Boolean(props.tip || slots.tip))
const visible = computed(() =>
  Boolean(props.label || props.required || hasTip.value || slots.label),
)

const labelClasses = computed(() =>
  cn(
    'font-body-md inline-flex min-w-0 items-center gap-1 text-[var(--text-color-primary)]',
    props.disabled && 'text-[var(--text-color-disabled)]',
  ),
)

function showTip() {
  tipVisible.value = true
}

function hideTip() {
  tipVisible.value = false
}
</script>
