import type { Placement } from '../Popper'

export type SelectValue = string | number
export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectStatus = 'error' | 'warning' | 'success'
export type SelectPlacement = Placement

export interface SelectOptionRegistration {
  value: SelectValue
  label: string
  disabled: boolean
  element: HTMLElement | null
}

export interface SelectParsedOption {
  key: string
  value: SelectValue
  label: string
  disabled: boolean
}
