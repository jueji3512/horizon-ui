import type { Placement } from '../Popper'

export type PopoverTriggerType = 'click' | 'hover' | 'focus' | 'manual'
export type PopoverPlacement = Placement
export type PopoverStrategy = 'absolute' | 'fixed'

export interface PopoverCloseOptions {
  restoreFocus?: boolean
  immediate?: boolean
}

export interface PopoverLayer {
  id: symbol
  open: () => boolean
  close: () => void
  contains: (target: EventTarget | null) => boolean
}
