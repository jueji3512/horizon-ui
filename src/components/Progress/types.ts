export type ProgressVariant = 'line' | 'circle'
export type ProgressTheme = 'brand' | 'success' | 'warning' | 'error'
export type ProgressSize = 'sm' | 'md' | 'lg' | number

export interface ProgressProps {
  variant?: ProgressVariant
  percent?: number
  theme?: ProgressTheme
  size?: ProgressSize
  active?: boolean
  color?: string
  showLabel?: boolean
  label?: string
  ariaLabel?: string
}
