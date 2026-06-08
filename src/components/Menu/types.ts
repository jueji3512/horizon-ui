export type MenuValue = string | number
export type MenuItemTheme = 'default' | 'error'
export type MenuItemKind = 'item' | 'checkbox' | 'radio' | 'subtrigger'

export interface MenuItemRegistration {
  key: string
  value: MenuValue
  label: string
  disabled: boolean
  element: HTMLElement | null
  kind: MenuItemKind
  closeOnSelect: boolean
  select: () => void
  openSubmenu?: () => void
}
