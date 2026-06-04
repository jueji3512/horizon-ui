import type { Ref, ComputedRef, InjectionKey, CSSProperties } from 'vue'
import type { MiddlewareData } from '@floating-ui/vue'
import type { Placement, TriggerType } from './types'

export type { Placement, TriggerType } from './types'
export type { UsePopperOptions, UsePopperReturn } from './types'

export interface PopperContext {
  visible: Ref<boolean>
  show: () => void
  hide: () => void
  toggle: () => void
  trigger: ComputedRef<TriggerType>
  disabled: ComputedRef<boolean>
  triggerRef: Ref<HTMLElement | undefined>
  contentRef: Ref<HTMLElement | undefined>
  arrowRef: Ref<HTMLElement | undefined>
  floatingStyles: ComputedRef<CSSProperties>
  middlewareData: Ref<MiddlewareData>
  currentPlacement: Ref<Placement>
  to: ComputedRef<string | HTMLElement>
  updatePosition: () => void
  zIndex: ComputedRef<number>
  matchWidth: ComputedRef<boolean>
  contentId: string
}

export const popperContextKey: InjectionKey<PopperContext> = Symbol('popperContext')

export { default as Popper } from './Popper.vue'
export { default as PopperTrigger } from './PopperTrigger.vue'
export { default as PopperContent } from './PopperContent.vue'
export { default as PopperArrow } from './PopperArrow.vue'
export { usePopper } from './usePopper'
