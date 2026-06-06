import { inject, type InjectionKey } from 'vue'
import type { ScrollAreaContext } from './types'

export const scrollAreaContextKey: InjectionKey<ScrollAreaContext> = Symbol('scrollAreaContext')

export function useScrollAreaContext(): ScrollAreaContext | null {
  return inject(scrollAreaContextKey, null)
}
