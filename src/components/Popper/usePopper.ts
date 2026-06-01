import { computed, type Ref, type ComputedRef, type CSSProperties } from 'vue'
import { useFloating, flip, offset as offsetMiddleware, shift, arrow } from '@floating-ui/vue'
import { autoUpdate, type Middleware } from '@floating-ui/vue'
import type { UsePopperOptions, UsePopperReturn } from './types'
import type { Placement } from './types'

export function usePopper(
  referenceEl: Ref<HTMLElement | undefined>,
  floatingEl: Ref<HTMLElement | undefined>,
  options: UsePopperOptions,
): UsePopperReturn {
  const middleware = computed(() => {
    const m: Middleware[] = []
    m.push(offsetMiddleware(options.offset ?? 8))
    if (options.flip !== false) m.push(flip())
    if (options.shift !== false) m.push(shift({ padding: 4 }))
    // matchWidth is handled reactively in PopperContent
    if (options.arrow?.value) {
      m.push(arrow({ element: options.arrow, padding: 4 }))
    }
    return m
  })

  const whileElementsMounted = options.autoUpdate !== false ? autoUpdate : undefined

  const {
    floatingStyles,
    middlewareData,
    placement,
    update: floatingUpdate,
  } = useFloating(referenceEl, floatingEl, {
    placement: options.placement,
    strategy: options.strategy ?? 'absolute',
    middleware,
    whileElementsMounted,
  })

  return {
    floatingStyles: floatingStyles as unknown as ComputedRef<CSSProperties>,
    middlewareData,
    placement: placement as Ref<Placement>,
    update: () => {
      floatingUpdate()
      return Promise.resolve()
    },
  }
}
