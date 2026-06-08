import type { Ref, CSSProperties, MaybeRefOrGetter } from 'vue'
import type { MiddlewareData } from '@floating-ui/vue'

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type TriggerType = 'hover' | 'click' | 'focus' | 'manual'

export interface UsePopperOptions {
  placement: MaybeRefOrGetter<Placement>
  strategy?: MaybeRefOrGetter<'absolute' | 'fixed'>
  offset?: MaybeRefOrGetter<number>
  flip?: MaybeRefOrGetter<boolean>
  shift?: MaybeRefOrGetter<boolean>
  matchWidth?: MaybeRefOrGetter<boolean>
  autoUpdate?: MaybeRefOrGetter<boolean>
  arrow?: Ref<HTMLElement | undefined>
}

export interface UsePopperReturn {
  floatingStyles: Readonly<Ref<CSSProperties>>
  middlewareData: Readonly<Ref<MiddlewareData>>
  placement: Readonly<Ref<Placement>>
  update: () => void
}
