import type { Placement } from '../Popper'

export type SelectValue = string | number

export type SelectOption = SelectOptionItem | SelectOptionGroup

export interface SelectOptionItem {
  label: string
  value: SelectValue
  disabled?: boolean
  children?: never
}

export interface SelectOptionGroup {
  title: string
  disabled?: boolean
  children: SelectOptionItem[]
  value?: never
  label?: never
}

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectStatus = 'error' | 'warning' | 'success'
export type SelectPlacement = Placement
