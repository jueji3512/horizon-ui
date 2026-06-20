<template>
  <div
    :class="rootClasses"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="roundedPercent"
    :aria-label="ariaLabel || undefined"
  >
    <template v-if="resolvedVariant === 'line'">
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <div
          class="relative min-w-0 flex-1 overflow-hidden rounded-[var(--round-full)] bg-[var(--bg-color-component)]"
          :style="lineTrackStyle"
        >
          <div
            class="relative h-full overflow-hidden rounded-[var(--round-full)] transition-[width,background-color] duration-300 ease-out"
            :class="[!props.color && themeClasses.fill, isFlowing && 'h-progress-flow']"
            :style="lineFillStyle"
          >
            <span v-if="isFlowing" class="h-progress-flow-sweep" />
          </div>
        </div>

        <div v-if="shouldRenderMeta" :class="labelClasses">
          <template v-if="resolvedShowLabel">
            <slot
              name="label"
              :percent="normalizedPercent"
              :rounded-percent="roundedPercent"
              :theme="resolvedTheme"
            >
              <span>{{ displayLabel }}</span>
            </slot>
          </template>
          <Icon
            v-else-if="shouldShowStatusIcon"
            :name="statusIconName"
            :class="statusIconClasses"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="relative inline-flex items-center justify-center" :style="circleRootStyle">
        <svg
          class="block"
          :width="circleSize"
          :height="circleSize"
          :viewBox="`0 0 ${circleSize} ${circleSize}`"
          aria-hidden="true"
        >
          <defs v-if="isCircleFlowing">
            <linearGradient
              :id="circleFlowGradientId"
              gradientUnits="userSpaceOnUse"
              x1="0"
              :x2="circleSize"
              y1="0"
              y2="0"
            >
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                :from="circleFlowGradientFrom"
                :to="circleFlowGradientTo"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <stop offset="0%" stop-color="white" stop-opacity="0" />
              <stop offset="50%" stop-color="white" stop-opacity="0.52" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>

          <circle
            fill="none"
            :cx="circleCenter"
            :cy="circleCenter"
            :r="circleRadius"
            :stroke-width="circleStroke"
            :style="circleTrackStyle"
          />
          <circle
            fill="none"
            stroke-linecap="round"
            :cx="circleCenter"
            :cy="circleCenter"
            :r="circleRadius"
            :stroke-width="circleStroke"
            :stroke-dasharray="circleCircumference"
            :stroke-dashoffset="circleDashOffset"
            :transform="circleTransform"
            :style="circleFillStyle"
          />
          <circle
            v-if="isCircleFlowing"
            class="h-progress-circle-flow-sweep"
            fill="none"
            stroke-linecap="round"
            :cx="circleCenter"
            :cy="circleCenter"
            :r="circleRadius"
            :stroke-width="circleStroke"
            :stroke-dasharray="circleCircumference"
            :stroke-dashoffset="circleDashOffset"
            :transform="circleTransform"
            :stroke="circleFlowGradientUrl"
          />
        </svg>

        <div v-if="shouldRenderMeta" :class="circleLabelClasses">
          <template v-if="resolvedShowLabel">
            <slot
              name="label"
              :percent="normalizedPercent"
              :rounded-percent="roundedPercent"
              :theme="resolvedTheme"
            >
              <span>{{ displayLabel }}</span>
            </slot>
          </template>
          <Icon
            v-else-if="shouldShowStatusIcon"
            :name="statusIconName"
            :class="statusIconClasses"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useSlots } from 'vue'
import { cn } from '../../utils'
import Icon from '../Icon/Icon.vue'
import type { ProgressProps, ProgressSize, ProgressTheme, ProgressVariant } from './types'

const props = withDefaults(defineProps<ProgressProps>(), {
  variant: 'line',
  percent: 0,
  theme: 'brand',
  size: 'md',
  active: true,
  showLabel: undefined,
})
const slots = useSlots()
const progressId = useId().replace(/:/g, '')

const progressDefaults = {
  variant: 'line',
  percent: 0,
  theme: 'brand',
  size: 'md',
  active: true,
} satisfies Required<Pick<ProgressProps, 'variant' | 'percent' | 'theme' | 'size' | 'active'>>

const progressGeometryMap = {
  lineHeightMap: {
    sm: 4,
    md: 6,
    lg: 8,
  },
  circleSizeMap: {
    sm: 72,
    md: 120,
    lg: 160,
  },
  circleStrokeMap: {
    sm: 4,
    md: 6,
    lg: 8,
  },
} as const

const { lineHeightMap, circleSizeMap, circleStrokeMap } = progressGeometryMap

const circleLabelTypographyClassMap = {
  sm: 'font-body-sm',
  md: 'font-body-md',
  lg: 'font-body-lg',
} as const satisfies Record<Extract<ProgressSize, string>, string>

interface ProgressThemeClasses {
  fill: string
  label: string
  lineIcon: string
  circleIcon: string
  color: string
  trackColor: string
}

const themeClassMap: Record<ProgressTheme, ProgressThemeClasses> = {
  brand: {
    fill: 'bg-brand',
    label: 'text-brand',
    lineIcon: 'info',
    circleIcon: 'info-plain',
    color: 'var(--color-brand)',
    trackColor: 'var(--bg-color-component)',
  },
  success: {
    fill: 'bg-success',
    label: 'text-success',
    lineIcon: 'circle-check-filled',
    circleIcon: 'check',
    color: 'var(--color-success)',
    trackColor: 'var(--bg-color-component)',
  },
  warning: {
    fill: 'bg-warning',
    label: 'text-warning',
    lineIcon: 'circle-alert-filled',
    circleIcon: 'alert',
    color: 'var(--color-warning)',
    trackColor: 'var(--bg-color-component)',
  },
  error: {
    fill: 'bg-error',
    label: 'text-error',
    lineIcon: 'circle-close-filled',
    circleIcon: 'close',
    color: 'var(--color-error)',
    trackColor: 'var(--bg-color-component)',
  },
}

const resolvedVariant = computed<ProgressVariant>(() => props.variant)
const resolvedTheme = computed<ProgressTheme>(() => props.theme)
const resolvedSize = computed<ProgressSize>(() => props.size)
const themeClasses = computed(() => themeClassMap[resolvedTheme.value])

function clampPercent(value = progressDefaults.percent) {
  if (!Number.isFinite(value)) return progressDefaults.percent
  return Math.min(100, Math.max(0, value))
}

const normalizedPercent = computed(() => clampPercent(props.percent))
const roundedPercent = computed(() => Math.round(normalizedPercent.value))
const displayLabel = computed(() =>
  props.label !== undefined ? props.label : `${roundedPercent.value}%`,
)

const hasCustomLabel = computed(() => Boolean(slots.label || props.label !== undefined))
const isStatusTheme = computed(() => resolvedTheme.value !== 'brand')
const resolvedShowGeneratedLabel = computed(
  () => props.showLabel ?? (resolvedVariant.value === 'circle' && !isStatusTheme.value),
)
const resolvedShowLabel = computed(() => hasCustomLabel.value || resolvedShowGeneratedLabel.value)
const shouldShowStatusIcon = computed(() => !resolvedShowLabel.value && isStatusTheme.value)
const shouldRenderMeta = computed(() => resolvedShowLabel.value || shouldShowStatusIcon.value)
const statusIconName = computed(() =>
  resolvedVariant.value === 'circle' ? themeClasses.value.circleIcon : themeClasses.value.lineIcon,
)
const statusIconClasses = computed(() =>
  resolvedVariant.value === 'circle' ? 'text-2xl' : 'text-sm',
)
const circleLabelTypographyClass = computed(() => {
  if (typeof resolvedSize.value === 'number') {
    if (circleSize.value >= circleSizeMap.lg) return circleLabelTypographyClassMap.lg
    if (circleSize.value >= circleSizeMap.md) return circleLabelTypographyClassMap.md
    return circleLabelTypographyClassMap.sm
  }

  return circleLabelTypographyClassMap[resolvedSize.value]
})

const isCustomCircleSize = computed(
  () => resolvedVariant.value === 'circle' && typeof resolvedSize.value === 'number',
)

const lineHeight = computed(() => {
  if (typeof resolvedSize.value === 'number') return lineHeightMap[progressDefaults.size]
  return lineHeightMap[resolvedSize.value]
})

const circleSize = computed(() => {
  if (isCustomCircleSize.value) return resolvedSize.value as number
  if (typeof resolvedSize.value === 'number') return circleSizeMap[progressDefaults.size]
  return circleSizeMap[resolvedSize.value]
})

const circleStroke = computed(() => {
  if (typeof resolvedSize.value === 'number') {
    return Math.max(4, Math.round((resolvedSize.value as number) / 20))
  }
  return circleStrokeMap[resolvedSize.value]
})

const circleCenter = computed(() => circleSize.value / 2)
const circleRadius = computed(() => (circleSize.value - circleStroke.value) / 2)
const circleCircumference = computed(() => 2 * Math.PI * circleRadius.value)
const circleTransform = computed(() => `rotate(-90 ${circleCenter.value} ${circleCenter.value})`)
const circleDashOffset = computed(
  () => circleCircumference.value * (1 - normalizedPercent.value / 100),
)
const circleFlowGradientId = `${progressId}-circle-flow-gradient`
const circleFlowGradientUrl = computed(() => `url(#${circleFlowGradientId})`)
const circleFlowGradientFrom = computed(() => `${circleSize.value} 0`)
const circleFlowGradientTo = computed(() => `${-circleSize.value} 0`)

const shouldStopFlow = computed(
  () => (props.percent !== undefined && props.percent >= 100) || roundedPercent.value >= 100,
)
const isFlowing = computed(
  () =>
    resolvedVariant.value === 'line' &&
    resolvedTheme.value === 'brand' &&
    props.active &&
    roundedPercent.value > 0 &&
    !shouldStopFlow.value,
)
const isCircleFlowing = computed(
  () =>
    resolvedVariant.value === 'circle' &&
    resolvedTheme.value === 'brand' &&
    props.active &&
    roundedPercent.value > 0 &&
    !shouldStopFlow.value,
)

const rootClasses = computed(() =>
  cn(
    'h-progress font-body-sm text-[var(--text-color-primary)]',
    resolvedVariant.value === 'line' ? 'flex w-full min-w-0' : 'inline-flex',
  ),
)

const labelClasses = computed(() =>
  cn('inline-flex shrink-0 items-center gap-1 leading-none tabular-nums', themeClasses.value.label),
)

const circleLabelClasses = computed(() =>
  cn(
    'absolute inset-0 flex flex-col items-center justify-center gap-1 text-center font-medium tabular-nums',
    circleLabelTypographyClass.value,
    themeClasses.value.label,
  ),
)

const lineTrackStyle = computed(() => ({
  height: `${lineHeight.value}px`,
}))

const lineFillStyle = computed(() => ({
  width: `${normalizedPercent.value}%`,
  ...(props.color ? { backgroundColor: props.color } : {}),
}))

const circleRootStyle = computed(() => ({
  width: `${circleSize.value}px`,
  height: `${circleSize.value}px`,
}))

const circleTrackStyle = computed(() => ({
  stroke: themeClasses.value.trackColor,
}))

const circleFillStyle = computed(() => ({
  stroke: props.color || themeClasses.value.color,
  transition: 'stroke-dashoffset var(--duration-slow) ease, stroke var(--duration-fast) ease',
}))
</script>

<style scoped>
.h-progress-flow-sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / 52%), transparent);
  transform: translateX(-100%);
  animation: h-progress-flow 1.4s ease-in-out infinite;
}

@keyframes h-progress-flow {
  to {
    transform: translateX(100%);
  }
}

.h-progress-circle-flow-sweep {
  pointer-events: none;
}
</style>
