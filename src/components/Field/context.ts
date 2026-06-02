import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { FieldSize } from './types'

export interface FieldContext {
  size: ComputedRef<FieldSize>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  multiline: ComputedRef<boolean>
}

export const fieldContextKey: InjectionKey<FieldContext> = Symbol('fieldContext')

export function useFieldContext(): FieldContext | null {
  return inject(fieldContextKey, null)
}
