<template>
  <div :class="calloutGeometryMap.root">
    <div :class="[calloutGeometryMap.bar, calloutTheme.bar]" />
    <div :class="[calloutGeometryMap.content, calloutTheme.bg]">
      <Title v-if="hasTitle" :level="6" :style="titleColor" class="mb-1">
        <slot name="title">{{ title }}</slot>
      </Title>
      <div :class="['leading-relaxed', calloutTheme.text]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Title from '../Title/Title.vue'

type CalloutTheme = 'brand' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    theme?: CalloutTheme
    title?: string
  }>(),
  {
    theme: 'brand',
    title: '',
  },
)

const slots = useSlots()

const hasTitle = computed(() => !!(props.title || slots.title))

interface CalloutConfig {
  bar: string
  bg: string
  text: string
}

const calloutThemeMap: Record<CalloutTheme, CalloutConfig> = {
  brand: { bar: 'bg-brand', bg: 'bg-brand-light', text: 'text-brand' },
  success: { bar: 'bg-success', bg: 'bg-success-light', text: 'text-success' },
  warning: { bar: 'bg-warning', bg: 'bg-warning-light', text: 'text-warning' },
  error: { bar: 'bg-error', bg: 'bg-error-light', text: 'text-error' },
}

const calloutGeometryMap = {
  root: 'font-body-md my-2 flex overflow-hidden rounded-[var(--round-default)]',
  bar: 'w-1 flex-shrink-0',
  content: 'flex-1 px-4 py-3',
} as const

const calloutTheme = computed(() => calloutThemeMap[props.theme])

const titleColorMap: Record<CalloutTheme, string> = {
  brand: 'var(--color-brand)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
}

const titleColor = computed(() => ({ color: titleColorMap[props.theme] }))
</script>
