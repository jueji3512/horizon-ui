<template>
  <!-- root > viewport > content -->
  <div
    v-bind="rootAttrs"
    ref="rootRef"
    :class="rootClasses"
    :style="rootStyle"
    :data-orientation="orientation"
    :data-scrollbar-visible="isScrollbarVisible || undefined"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="viewportRef"
      :class="viewportClasses"
      :style="viewportStyle"
      :tabindex="focusable ? 0 : undefined"
      :aria-label="focusable ? resolvedAriaLabel : undefined"
    >
      <div ref="contentRef" class="h-scroll-area-content">
        <slot />
      </div>
    </div>

    <div
      v-if="showVerticalScrollbar"
      ref="verticalTrackRef"
      :class="getScrollbarClasses('vertical')"
      :style="verticalTrackStyle"
      aria-hidden="true"
    >
      <div
        ref="verticalThumbRef"
        :class="getThumbClasses('vertical')"
        @pointerdown="handleThumbPointerDown('vertical', $event)"
      />
    </div>

    <div
      v-if="showHorizontalScrollbar"
      ref="horizontalTrackRef"
      :class="getScrollbarClasses('horizontal')"
      :style="horizontalTrackStyle"
      aria-hidden="true"
    >
      <div
        ref="horizontalThumbRef"
        :class="getThumbClasses('horizontal')"
        @pointerdown="handleThumbPointerDown('horizontal', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useAttrs,
  watch,
  type CSSProperties,
  type StyleValue,
} from 'vue'
import type { ClassValue } from 'clsx'
import { cn } from '../../utils'
import { scrollAreaContextKey } from './context'
import type {
  ScrollAreaAxis,
  ScrollAreaExpose,
  ScrollAreaOrientation,
  ScrollAreaScrollToElementOptions,
  ScrollAreaScrollToOptions,
  ScrollAreaScrollbarVisibility,
  ScrollAreaState,
} from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    orientation?: ScrollAreaOrientation
    scrollbarVisibility?: ScrollAreaScrollbarVisibility
    scrollbarHideDelay?: number
    maxHeight?: number | string
    maxWidth?: number | string
    focusable?: boolean
    ariaLabel?: string
  }>(),
  {
    orientation: 'vertical',
    scrollbarVisibility: 'auto',
    scrollbarHideDelay: 600,
    maxHeight: undefined,
    maxWidth: undefined,
    focusable: false,
    ariaLabel: '',
  },
)

const emit = defineEmits<{
  scroll: [state: ScrollAreaState]
  update: [state: ScrollAreaState]
}>()

const attrs = useAttrs()
const rootRef = ref<HTMLElement | null>(null)
const viewportRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const verticalTrackRef = ref<HTMLElement | null>(null)
const horizontalTrackRef = ref<HTMLElement | null>(null)
const verticalThumbRef = ref<HTMLElement | null>(null)
const horizontalThumbRef = ref<HTMLElement | null>(null)

const hasVerticalScrollbar = ref(false)
const hasHorizontalScrollbar = ref(false)
const isScrollbarVisible = ref(props.scrollbarVisibility === 'always')
const isHovering = ref(false)
const activeDragAxis = ref<ScrollAreaAxis | null>(null)

let currentState: ScrollAreaState = createEmptyState()
let resizeObserver: ResizeObserver | null = null
let frameId: number | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let pendingScrollEmit = false
let pendingUpdateEmit = false
let removeScrollListener: (() => void) | null = null
let removeResizeListener: (() => void) | null = null

interface AxisThumbMetrics {
  trackSize: number
  thumbSize: number
  maxThumbOffset: number
  hidden: boolean
}

interface DragState {
  axis: ScrollAreaAxis
  startPointer: number
  startScroll: number
  maxScroll: number
  trackSize: number
  thumbSize: number
}

let dragState: DragState | null = null
const thumbMetrics: Record<ScrollAreaAxis, AxisThumbMetrics> = {
  vertical: createEmptyThumbMetrics(),
  horizontal: createEmptyThumbMetrics(),
}

const rootAttrs = computed(() => {
  const { class: _class, style: _style, ...restAttrs } = attrs
  return restAttrs
})

const resolvedAriaLabel = computed(() => props.ariaLabel || '滚动区域')

const rootClasses = computed(() =>
  cn('h-scroll-area relative min-w-0 overflow-hidden', attrs.class as ClassValue),
)

const rootStyle = computed<StyleValue>(() => attrs.style as StyleValue)

const viewportStyle = computed<CSSProperties>(() => ({
  maxHeight: resolveLength(props.maxHeight),
  maxWidth: resolveLength(props.maxWidth),
}))

const viewportClasses = computed(() =>
  cn(
    'h-scroll-area-viewport min-w-0 overscroll-contain',
    allowsVerticalScroll.value ? 'overflow-y-auto' : 'overflow-y-hidden',
    allowsHorizontalScroll.value ? 'overflow-x-auto' : 'overflow-x-hidden',
    props.focusable &&
      'focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none',
  ),
)

const allowsVerticalScroll = computed(
  () => props.orientation === 'vertical' || props.orientation === 'both',
)
const allowsHorizontalScroll = computed(
  () => props.orientation === 'horizontal' || props.orientation === 'both',
)

const showVerticalScrollbar = computed(
  () =>
    props.scrollbarVisibility !== 'hidden' &&
    allowsVerticalScroll.value &&
    hasVerticalScrollbar.value,
)
const showHorizontalScrollbar = computed(
  () =>
    props.scrollbarVisibility !== 'hidden' &&
    allowsHorizontalScroll.value &&
    hasHorizontalScrollbar.value,
)

const verticalTrackStyle = computed<CSSProperties>(() => ({
  bottom: showHorizontalScrollbar.value ? '8px' : '0',
}))

const horizontalTrackStyle = computed<CSSProperties>(() => ({
  right: showVerticalScrollbar.value ? '8px' : '0',
}))

const scrollAreaApi: ScrollAreaExpose = {
  viewportRef,
  contentRef,
  scrollTo: scrollToPosition,
  scrollBy: scrollByOffset,
  scrollToElement,
  update,
  getScrollState,
}

provide(scrollAreaContextKey, scrollAreaApi)
defineExpose(scrollAreaApi)

function createEmptyState(): ScrollAreaState {
  return {
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
    maxScrollTop: 0,
    maxScrollLeft: 0,
    isScrollableY: false,
    isScrollableX: false,
    isAtTop: true,
    isAtBottom: true,
    isAtLeft: true,
    isAtRight: true,
  }
}

function createEmptyThumbMetrics(): AxisThumbMetrics {
  return {
    trackSize: 0,
    thumbSize: 0,
    maxThumbOffset: 0,
    hidden: true,
  }
}

function resolveLength(value: number | string | undefined) {
  if (value === undefined || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : value
}

function readScrollState(): ScrollAreaState {
  const viewport = viewportRef.value
  if (!viewport) return createEmptyState()

  const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
  const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth)

  return {
    scrollTop: viewport.scrollTop,
    scrollLeft: viewport.scrollLeft,
    scrollHeight: viewport.scrollHeight,
    scrollWidth: viewport.scrollWidth,
    clientHeight: viewport.clientHeight,
    clientWidth: viewport.clientWidth,
    maxScrollTop,
    maxScrollLeft,
    isScrollableY: maxScrollTop > 1,
    isScrollableX: maxScrollLeft > 1,
    isAtTop: viewport.scrollTop <= 1,
    isAtBottom: maxScrollTop - viewport.scrollTop <= 1,
    isAtLeft: viewport.scrollLeft <= 1,
    isAtRight: maxScrollLeft - viewport.scrollLeft <= 1,
  }
}

function statesHaveSameScrollability(a: ScrollAreaState, b: ScrollAreaState) {
  return (
    a.scrollHeight === b.scrollHeight &&
    a.scrollWidth === b.scrollWidth &&
    a.clientHeight === b.clientHeight &&
    a.clientWidth === b.clientWidth &&
    a.isScrollableY === b.isScrollableY &&
    a.isScrollableX === b.isScrollableX
  )
}

function syncState() {
  frameId = null

  const nextState = readScrollState()
  const didScrollabilityChange = !statesHaveSameScrollability(currentState, nextState)
  const shouldMeasureThumbs = pendingUpdateEmit || didScrollabilityChange
  const shouldEmitUpdate = shouldMeasureThumbs
  currentState = nextState

  hasVerticalScrollbar.value = allowsVerticalScroll.value && nextState.isScrollableY
  hasHorizontalScrollbar.value = allowsHorizontalScroll.value && nextState.isScrollableX

  if (shouldMeasureThumbs) {
    nextTick(() => {
      measureThumbMetrics(currentState)
      applyThumbTransforms(currentState)
    })
  } else {
    applyThumbTransforms(nextState)
  }

  if (pendingScrollEmit) {
    emit('scroll', { ...nextState })
  }

  if (shouldEmitUpdate) {
    emit('update', { ...nextState })
  }

  pendingScrollEmit = false
  pendingUpdateEmit = false
}

function scheduleSync(options: { emitScroll?: boolean; emitUpdate?: boolean } = {}) {
  pendingScrollEmit ||= Boolean(options.emitScroll)
  pendingUpdateEmit ||= Boolean(options.emitUpdate)

  if (frameId !== null) return
  frameId = requestAnimationFrame(syncState)
}

function cancelScheduledSync() {
  if (frameId === null) return
  cancelAnimationFrame(frameId)
  frameId = null
}

function update() {
  pendingUpdateEmit = true
  cancelScheduledSync()
  syncState()
}

function getScrollState() {
  currentState = readScrollState()
  measureThumbMetrics(currentState)
  applyThumbTransforms(currentState)
  return { ...currentState }
}

function scrollToPosition(options: ScrollAreaScrollToOptions) {
  viewportRef.value?.scrollTo(options)
  scheduleSync({ emitScroll: true })
  showScrollbar()
  scheduleHideScrollbar()
}

function scrollByOffset(options: ScrollAreaScrollToOptions) {
  viewportRef.value?.scrollBy(options)
  scheduleSync({ emitScroll: true })
  showScrollbar()
  scheduleHideScrollbar()
}

function normalizePadding(padding: ScrollAreaScrollToElementOptions['padding']) {
  if (typeof padding === 'number') {
    return { top: padding, right: padding, bottom: padding, left: padding }
  }

  return {
    top: padding?.top ?? 0,
    right: padding?.right ?? 0,
    bottom: padding?.bottom ?? 0,
    left: padding?.left ?? 0,
  }
}

function resolveAxisScroll(
  current: number,
  viewportSize: number,
  itemStart: number,
  itemEnd: number,
  align: NonNullable<ScrollAreaScrollToElementOptions['block']>,
  paddingStart: number,
  paddingEnd: number,
) {
  if (align === 'start') return itemStart - paddingStart
  if (align === 'end') return itemEnd + paddingEnd - viewportSize
  if (align === 'center') return itemStart - (viewportSize - (itemEnd - itemStart)) / 2

  const minVisible = current + paddingStart
  const maxVisible = current + viewportSize - paddingEnd

  if (itemStart < minVisible) return itemStart - paddingStart
  if (itemEnd > maxVisible) return itemEnd + paddingEnd - viewportSize
  return current
}

function scrollToElement(element: HTMLElement, options: ScrollAreaScrollToElementOptions = {}) {
  const viewport = viewportRef.value
  if (!viewport) return

  const viewportRect = viewport.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  const padding = normalizePadding(options.padding)

  const itemTop = elementRect.top - viewportRect.top + viewport.scrollTop
  const itemBottom = itemTop + elementRect.height
  const itemLeft = elementRect.left - viewportRect.left + viewport.scrollLeft
  const itemRight = itemLeft + elementRect.width

  const nextTop = allowsVerticalScroll.value
    ? resolveAxisScroll(
        viewport.scrollTop,
        viewport.clientHeight,
        itemTop,
        itemBottom,
        options.block ?? 'nearest',
        padding.top,
        padding.bottom,
      )
    : viewport.scrollTop
  const nextLeft = allowsHorizontalScroll.value
    ? resolveAxisScroll(
        viewport.scrollLeft,
        viewport.clientWidth,
        itemLeft,
        itemRight,
        options.inline ?? 'nearest',
        padding.left,
        padding.right,
      )
    : viewport.scrollLeft

  const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight)
  const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth)

  viewport.scrollTo({
    top: Math.max(0, Math.min(nextTop, maxScrollTop)),
    left: Math.max(0, Math.min(nextLeft, maxScrollLeft)),
    behavior: options.behavior,
  })
  scheduleSync({ emitScroll: true })
  showScrollbar()
  scheduleHideScrollbar()
}

function getTrack(axis: ScrollAreaAxis) {
  return axis === 'vertical' ? verticalTrackRef.value : horizontalTrackRef.value
}

function getThumb(axis: ScrollAreaAxis) {
  return axis === 'vertical' ? verticalThumbRef.value : horizontalThumbRef.value
}

function getScrollbarClasses(axis: ScrollAreaAxis) {
  return cn(
    'h-scroll-area-scrollbar absolute z-10 touch-none opacity-0 transition-opacity duration-150',
    axis === 'vertical'
      ? 'top-0 right-0 w-2 px-0.5 py-1'
      : 'right-0 bottom-0 left-0 h-2 px-1 py-0.5',
    isScrollbarVisible.value && 'opacity-100',
  )
}

function getThumbClasses(axis: ScrollAreaAxis) {
  return cn(
    'h-scroll-area-thumb absolute rounded-[var(--round-full)] transition-colors duration-150',
    axis === 'vertical' ? 'top-1 right-0.5 w-1' : 'bottom-0.5 left-1 h-1',
    activeDragAxis.value === axis && 'h-scroll-area-thumb-active',
  )
}

function measureThumbMetrics(state: ScrollAreaState) {
  measureAxisThumbMetrics('vertical', state)
  measureAxisThumbMetrics('horizontal', state)
}

function measureAxisThumbMetrics(axis: ScrollAreaAxis, state: ScrollAreaState) {
  const track = getTrack(axis)
  const thumb = getThumb(axis)
  if (!track || !thumb) {
    thumbMetrics[axis] = createEmptyThumbMetrics()
    return
  }

  const isVertical = axis === 'vertical'
  const viewportSize = isVertical ? state.clientHeight : state.clientWidth
  const scrollSize = isVertical ? state.scrollHeight : state.scrollWidth
  const trackSize = isVertical ? track.clientHeight - 8 : track.clientWidth - 8

  if (viewportSize <= 0 || scrollSize <= viewportSize || trackSize <= 0) {
    thumbMetrics[axis] = createEmptyThumbMetrics()
    thumb.style.display = 'none'
    return
  }

  const thumbSize = Math.max(24, Math.round((viewportSize / scrollSize) * trackSize))
  thumbMetrics[axis] = {
    trackSize,
    thumbSize,
    maxThumbOffset: Math.max(0, trackSize - thumbSize),
    hidden: false,
  }

  thumb.style.display = 'block'

  if (isVertical) {
    thumb.style.height = `${thumbSize}px`
  } else {
    thumb.style.width = `${thumbSize}px`
  }
}

function applyThumbTransforms(state: ScrollAreaState) {
  applyAxisThumbTransform('vertical', state)
  applyAxisThumbTransform('horizontal', state)
}

function applyAxisThumbTransform(axis: ScrollAreaAxis, state: ScrollAreaState) {
  const thumb = getThumb(axis)
  const metrics = thumbMetrics[axis]
  if (!thumb || metrics.hidden) return

  const isVertical = axis === 'vertical'
  const maxScroll = isVertical ? state.maxScrollTop : state.maxScrollLeft
  const currentScroll = isVertical ? state.scrollTop : state.scrollLeft
  const thumbOffset = maxScroll > 0 ? (currentScroll / maxScroll) * metrics.maxThumbOffset : 0

  if (isVertical) {
    thumb.style.transform = `translate3d(0, ${Math.round(thumbOffset)}px, 0)`
  } else {
    thumb.style.transform = `translate3d(${Math.round(thumbOffset)}px, 0, 0)`
  }
}

function showScrollbar() {
  if (props.scrollbarVisibility === 'hidden') return

  clearHideTimer()
  isScrollbarVisible.value = true
}

function scheduleHideScrollbar() {
  if (props.scrollbarVisibility !== 'auto' || isHovering.value || activeDragAxis.value) return

  clearHideTimer()
  hideTimer = setTimeout(() => {
    if (!isHovering.value && !activeDragAxis.value) {
      isScrollbarVisible.value = false
    }
  }, props.scrollbarHideDelay)
}

function clearHideTimer() {
  if (!hideTimer) return
  clearTimeout(hideTimer)
  hideTimer = null
}

function handleScroll() {
  showScrollbar()
  scheduleSync({ emitScroll: true })
  scheduleHideScrollbar()
}

function handleMouseEnter() {
  isHovering.value = true
  showScrollbar()
}

function handleMouseLeave() {
  isHovering.value = false
  scheduleHideScrollbar()
}

function handleThumbPointerDown(axis: ScrollAreaAxis, event: PointerEvent) {
  if (event.button !== 0) return

  const viewport = viewportRef.value
  const track = getTrack(axis)
  const thumb = getThumb(axis)
  if (!viewport || !track || !thumb) return

  event.preventDefault()
  event.stopPropagation()

  const isVertical = axis === 'vertical'
  const maxScroll = isVertical
    ? Math.max(0, viewport.scrollHeight - viewport.clientHeight)
    : Math.max(0, viewport.scrollWidth - viewport.clientWidth)

  dragState = {
    axis,
    startPointer: isVertical ? event.clientY : event.clientX,
    startScroll: isVertical ? viewport.scrollTop : viewport.scrollLeft,
    maxScroll,
    trackSize: isVertical ? track.clientHeight - 8 : track.clientWidth - 8,
    thumbSize: isVertical ? thumb.offsetHeight : thumb.offsetWidth,
  }

  activeDragAxis.value = axis
  showScrollbar()
  document.addEventListener('pointermove', handleDocumentPointerMove, { passive: false })
  document.addEventListener('pointerup', handleDocumentPointerUp, { passive: true })
  document.addEventListener('pointercancel', handleDocumentPointerCancel, { passive: true })
}

function handleDocumentPointerMove(event: PointerEvent) {
  if (!dragState || !viewportRef.value) return
  event.preventDefault()

  const isVertical = dragState.axis === 'vertical'
  const pointer = isVertical ? event.clientY : event.clientX
  const delta = pointer - dragState.startPointer
  const movableTrack = Math.max(1, dragState.trackSize - dragState.thumbSize)
  const nextScroll = dragState.startScroll + (delta / movableTrack) * dragState.maxScroll

  if (isVertical) {
    viewportRef.value.scrollTop = nextScroll
  } else {
    viewportRef.value.scrollLeft = nextScroll
  }

  scheduleSync({ emitScroll: true })
}

function handleDocumentPointerUp() {
  cleanupDocumentPointerListeners()
  dragState = null
  activeDragAxis.value = null
  scheduleHideScrollbar()
}

function handleDocumentPointerCancel() {
  cleanupDocumentPointerListeners()
  dragState = null
  activeDragAxis.value = null
  scheduleHideScrollbar()
}

function cleanupDocumentPointerListeners() {
  document.removeEventListener('pointermove', handleDocumentPointerMove)
  document.removeEventListener('pointerup', handleDocumentPointerUp)
  document.removeEventListener('pointercancel', handleDocumentPointerCancel)
}

function setupScrollListener() {
  const viewport = viewportRef.value
  if (!viewport) return

  viewport.addEventListener('scroll', handleScroll, { passive: true })
  removeScrollListener = () => {
    viewport.removeEventListener('scroll', handleScroll)
  }
}

function setupResizeObserver() {
  const viewport = viewportRef.value
  const content = contentRef.value
  if (!viewport || !content) return

  if (typeof ResizeObserver === 'undefined') {
    window.addEventListener('resize', handleWindowResize, { passive: true })
    removeResizeListener = () => {
      window.removeEventListener('resize', handleWindowResize)
    }
    return
  }

  resizeObserver = new ResizeObserver(() => {
    scheduleSync({ emitUpdate: true })
  })
  resizeObserver.observe(viewport)
  resizeObserver.observe(content)
}

function handleWindowResize() {
  scheduleSync({ emitUpdate: true })
}

watch(
  () => [props.orientation, props.scrollbarVisibility] as const,
  ([, visibility]) => {
    if (visibility === 'hidden') {
      clearHideTimer()
      isScrollbarVisible.value = false
    } else if (visibility === 'always') {
      clearHideTimer()
      isScrollbarVisible.value = true
    } else if (isHovering.value) {
      showScrollbar()
    } else {
      scheduleHideScrollbar()
    }

    nextTick(() => {
      scheduleSync({ emitUpdate: true })
    })
  },
)

watch(
  () => props.scrollbarHideDelay,
  () => {
    if (hideTimer) scheduleHideScrollbar()
  },
)

onMounted(() => {
  setupScrollListener()
  setupResizeObserver()
  nextTick(() => {
    scheduleSync({ emitUpdate: true })
    if (props.scrollbarVisibility === 'always') showScrollbar()
  })
})

onBeforeUnmount(() => {
  cancelScheduledSync()
  clearHideTimer()
  removeScrollListener?.()
  removeResizeListener?.()
  resizeObserver?.disconnect()
  cleanupDocumentPointerListeners()
})
</script>

<style scoped>
.h-scroll-area-viewport {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.h-scroll-area-viewport::-webkit-scrollbar {
  display: none;
}

.h-scroll-area-content {
  min-width: max-content;
}

.h-scroll-area[data-orientation='vertical'] .h-scroll-area-content {
  min-width: 0;
}

.h-scroll-area-scrollbar {
  contain: strict;
}

.h-scroll-area-thumb {
  background-color: color-mix(in oklch, var(--text-color-secondary) 38%, transparent);
}

.h-scroll-area-scrollbar:hover .h-scroll-area-thumb,
.h-scroll-area-thumb-active {
  background-color: color-mix(in oklch, var(--text-color-secondary) 64%, transparent);
}
</style>
