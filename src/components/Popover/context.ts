import { inject, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { PopoverCloseOptions, PopoverLayer, PopoverTriggerType } from './types'
import type { Placement } from '../Popper'

export interface PopoverContext {
  open: ComputedRef<boolean>
  trigger: ComputedRef<PopoverTriggerType>
  disabled: ComputedRef<boolean>
  closeOnOutsideClick: ComputedRef<boolean>
  closeOnEsc: ComputedRef<boolean>
  returnFocusOnClose: ComputedRef<boolean>
  placement: ComputedRef<Placement>
  triggerRef: Ref<HTMLElement | null>
  contentRef: Ref<HTMLElement | null>
  contentId: string
  triggerId: string
  show: () => void
  hide: (options?: PopoverCloseOptions) => void
  close: (options?: PopoverCloseOptions) => void
  toggle: () => void
  setTriggerElement: (element: HTMLElement | null) => void
  setContentElement: (element: HTMLElement | null) => void
  registerChildLayer: (layer: PopoverLayer) => () => void
  isEventInsideLayer: (target: EventTarget | null) => boolean
  hasOpenChildLayer: () => boolean
}

export const popoverContextKey: InjectionKey<PopoverContext> = Symbol('popoverContext')

export function usePopoverContext() {
  return inject(popoverContextKey, null)
}
