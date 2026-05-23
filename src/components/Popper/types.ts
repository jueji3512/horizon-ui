import type { Ref, ComputedRef, CSSProperties } from 'vue'
import type { MiddlewareData } from '@floating-ui/vue'

export type Placement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

export type TriggerType = 'hover' | 'click' | 'focus' | 'manual'

export interface UsePopperOptions {
  placement: Ref<Placement>
  strategy?: 'absolute' | 'fixed'
  offset?: number
  flip?: boolean
  shift?: boolean
  matchWidth?: boolean
  autoUpdate?: boolean
  arrow?: Ref<HTMLElement | undefined>
}

export interface UsePopperReturn {
  floatingStyles: ComputedRef<CSSProperties>
  middlewareData: Ref<MiddlewareData>
  placement: Ref<Placement>
  update: () => Promise<void>
}
