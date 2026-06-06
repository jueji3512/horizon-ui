import type { Ref } from 'vue'

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'
export type ScrollAreaScrollbarVisibility = 'auto' | 'always' | 'hidden'
export type ScrollAreaAxis = 'vertical' | 'horizontal'
export type ScrollAreaAlignment = 'start' | 'center' | 'end' | 'nearest'

export interface ScrollAreaScrollToOptions {
  top?: number
  left?: number
  behavior?: ScrollBehavior
}

export interface ScrollAreaState {
  scrollTop: number
  scrollLeft: number
  scrollHeight: number
  scrollWidth: number
  clientHeight: number
  clientWidth: number
  maxScrollTop: number
  maxScrollLeft: number
  isScrollableY: boolean
  isScrollableX: boolean
  isAtTop: boolean
  isAtBottom: boolean
  isAtLeft: boolean
  isAtRight: boolean
}

export interface ScrollAreaScrollToElementOptions {
  block?: ScrollAreaAlignment
  inline?: ScrollAreaAlignment
  behavior?: ScrollBehavior
  padding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
}

export interface ScrollAreaExpose {
  viewportRef: Ref<HTMLElement | null>
  contentRef: Ref<HTMLElement | null>
  scrollTo: (options: ScrollAreaScrollToOptions) => void
  scrollBy: (options: ScrollAreaScrollToOptions) => void
  scrollToElement: (element: HTMLElement, options?: ScrollAreaScrollToElementOptions) => void
  update: () => void
  getScrollState: () => ScrollAreaState
}

export type ScrollAreaContext = ScrollAreaExpose
