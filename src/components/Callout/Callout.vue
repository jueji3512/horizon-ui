<template>
  <div class="flex rounded overflow-hidden text-sm my-2">
    <div :class="calloutConfig.bar" class="w-1 flex-shrink-0" />
    <div :class="calloutConfig.bg" class="flex-1 px-[14px] py-[10px]">
      <Title
        v-if="hasTitle"
        :level="6"
        :style="titleColor"
        class="mb-1"
      >
        <slot name="title">{{ title }}</slot>
      </Title>
      <div :class="['leading-relaxed', calloutConfig.text]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Title from '../Title/Title.vue'

type CalloutType = 'note' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    type?: CalloutType
    title?: string
  }>(),
  {
    type: 'note',
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

const calloutMap: Record<CalloutType, CalloutConfig> = {
  note:    { bar: 'bg-slate-500',   bg: 'bg-slate-50',    text: 'text-slate-700' },
  info:    { bar: 'bg-sky-600',     bg: 'bg-sky-50',      text: 'text-sky-700' },
  success: { bar: 'bg-emerald-600', bg: 'bg-emerald-50',  text: 'text-emerald-700' },
  warning: { bar: 'bg-amber-600',   bg: 'bg-amber-50',    text: 'text-amber-800' },
  danger:  { bar: 'bg-red-600',     bg: 'bg-red-50',      text: 'text-red-700' },
}

const calloutConfig = computed(() => calloutMap[props.type])

const titleColorMap: Record<CalloutType, string> = {
  note: '#334155',
  info: '#0369a1',
  success: '#047857',
  warning: '#92400e',
  danger: '#b91c1c',
}

const titleColor = computed(() => ({ color: titleColorMap[props.type] }))
</script>
