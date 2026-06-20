export type ProgressVariant = 'line' | 'circle'
export type ProgressTheme = 'brand' | 'success' | 'warning' | 'error'
export type ProgressPresetSize = 'sm' | 'md' | 'lg'

export interface ProgressSizeConfig {
  /**
   * line: track height
   * circle: stroke width
   */
  thickness?: number

  /**
   * Label font size in px.
   * Status icon follows the same px size.
   */
  labelSize?: number

  /**
   * Circle diameter in px. Only for variant="circle".
   */
  diameter?: number
}

export type ProgressSize = ProgressPresetSize | ProgressSizeConfig

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
