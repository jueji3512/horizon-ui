export type TimePanelFormat =
  | 'HH:mm'
  | 'HH:mm:ss'
  | 'HH:mm:ss:SSS'
  | 'hh:mm A'
  | 'hh:mm:ss A'
  | 'hh:mm:ss:SSS A'

export type TimePanelUnit = 'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem'
export type TimePanelMeridiem = 'AM' | 'PM'
export type TimePanelSteps = [number, number, number, number]
export type TimePanelScrollBehavior = 'auto' | 'smooth' | 'instant'

export interface TimePanelValueParts {
  hour: number
  minute: number
  second: number
  millisecond: number
}

export interface TimePanelDisabledTimeContext extends TimePanelValueParts {
  format: TimePanelFormat
  meridiem: TimePanelMeridiem
  value: string
}

export type TimePanelDisabledTime = (
  unit: TimePanelUnit,
  value: number | TimePanelMeridiem,
  context: TimePanelDisabledTimeContext,
) => boolean

export interface TimePanelProps {
  modelValue?: string | null
  format?: TimePanelFormat
  steps?: TimePanelSteps
  disabledTime?: TimePanelDisabledTime
  ariaLabel?: string
}

export interface TimePanelExpose {
  focus: () => void
  scrollToActive: (behavior?: TimePanelScrollBehavior) => void
  getValue: () => string | null
  getParts: () => TimePanelValueParts | null
  setValue: (value: string | null) => string | null
  setNow: () => string
  clear: () => null
}
