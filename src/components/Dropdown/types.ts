import type { Placement, TriggerType } from '../Popper'

export type DropdownValue = string | number
export type DropdownTrigger = TriggerType
export type DropdownPlacement = Placement
export type DropdownStrategy = 'absolute' | 'fixed'
export type DropdownItemTheme = 'default' | 'error'

export interface DropdownItemRegistration {
  value: DropdownValue
  label: string
  disabled: boolean
  element: HTMLElement | null
}

export interface DropdownParsedItem {
  key: string
  value: DropdownValue
  label: string
  disabled: boolean
}
