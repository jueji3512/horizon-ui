import { inject, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { DropdownItemRegistration, DropdownValue } from './types'

export interface DropdownContext {
  activeValue: Ref<DropdownValue | null>
  registerItem: (item: DropdownItemRegistration) => void
  unregisterItem: (value: DropdownValue) => void
  setActiveValue: (value: DropdownValue) => void
  selectItem: (value: DropdownValue) => void
  getItemId: (value: DropdownValue) => string
  isItemActive: (value: DropdownValue) => boolean
}

export interface DropdownGroupContext {
  disabled: ComputedRef<boolean>
}

export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('dropdownContext')
export const dropdownGroupContextKey: InjectionKey<DropdownGroupContext> =
  Symbol('dropdownGroupContext')

export function useDropdownContext() {
  return inject(dropdownContextKey, null)
}

export function useDropdownGroupContext() {
  return inject(dropdownGroupContextKey, null)
}
