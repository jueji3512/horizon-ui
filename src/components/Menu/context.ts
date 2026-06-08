import { inject, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { MenuItemRegistration, MenuValue } from './types'

export interface MenuContext {
  activeValue: Ref<MenuValue | null>
  registerItem: (item: MenuItemRegistration) => void
  unregisterItem: (value: MenuValue) => void
  setActiveValue: (value: MenuValue) => void
  selectItem: (value: MenuValue) => void
  getItemId: (value: MenuValue) => string
  isItemActive: (value: MenuValue) => boolean
  requestClose: () => void
}

export interface MenuGroupContext {
  disabled: ComputedRef<boolean>
}

export interface MenuRadioGroupContext {
  modelValue: ComputedRef<MenuValue | null>
  setValue: (value: MenuValue) => void
}

export interface MenuDismissContext {
  close: () => void
}

export interface MenuSubContext {
  open: Ref<boolean>
  openSubmenu: () => void
  closeSubmenu: (options?: { restoreFocus?: boolean; immediate?: boolean }) => void
  setTriggerElement: (element: HTMLElement | null) => void
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol('menuContext')
export const menuGroupContextKey: InjectionKey<MenuGroupContext> = Symbol('menuGroupContext')
export const menuRadioGroupContextKey: InjectionKey<MenuRadioGroupContext> =
  Symbol('menuRadioGroupContext')
export const menuDismissContextKey: InjectionKey<MenuDismissContext> = Symbol('menuDismissContext')
export const menuSubContextKey: InjectionKey<MenuSubContext> = Symbol('menuSubContext')

export function useMenuContext() {
  return inject(menuContextKey, null)
}

export function useMenuGroupContext() {
  return inject(menuGroupContextKey, null)
}

export function useMenuRadioGroupContext() {
  return inject(menuRadioGroupContextKey, null)
}

export function useMenuDismissContext() {
  return inject(menuDismissContextKey, null)
}

export function useMenuSubContext() {
  return inject(menuSubContextKey, null)
}
