import type { Placement } from '../Popper'

export type SelectValue = string | number

export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectStatus = 'error' | 'warning' | 'success'
export type SelectPlacement = Placement
