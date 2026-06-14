import type { ComputedRef, CSSProperties, InjectionKey, Ref } from 'vue'
import type { MiddlewareData } from '@floating-ui/vue'
import type { Placement, TriggerType } from './types'

export interface PopperContext {
  visible: ComputedRef<boolean>
  show: () => void
  hide: (options?: { immediate?: boolean }) => void
  toggle: () => void
  trigger: ComputedRef<TriggerType>
  disabled: ComputedRef<boolean>
  closeOnOutsideClick: ComputedRef<boolean>
  closeOnEsc: ComputedRef<boolean>
  triggerRef: Ref<HTMLElement | undefined>
  contentRef: Ref<HTMLElement | undefined>
  arrowRef: Ref<HTMLElement | undefined>
  floatingStyles: Readonly<Ref<CSSProperties>>
  middlewareData: Readonly<Ref<MiddlewareData>>
  currentPlacement: Readonly<Ref<Placement>>
  to: ComputedRef<string | HTMLElement>
  updatePosition: () => void
  zIndex: ComputedRef<number>
  matchWidth: ComputedRef<boolean>
  contentId: string
}

export const popperContextKey: InjectionKey<PopperContext> = Symbol('popperContext')
