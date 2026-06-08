import { computed, toValue, watch, type Ref } from 'vue'
import {
  useFloating,
  flip,
  offset as offsetMiddleware,
  shift,
  arrow,
  size,
  autoUpdate,
  type Middleware,
} from '@floating-ui/vue'
import type { Placement, UsePopperOptions, UsePopperReturn } from './types'

export function usePopper(
  referenceEl: Ref<HTMLElement | undefined>,
  floatingEl: Ref<HTMLElement | undefined>,
  options: UsePopperOptions,
): UsePopperReturn {
  const middleware = computed(() => {
    const m: Middleware[] = []
    m.push(offsetMiddleware(toValue(options.offset) ?? 8))
    if (toValue(options.flip) !== false) m.push(flip())
    if (toValue(options.shift) === true) m.push(shift({ padding: 4, crossAxis: true }))
    if (toValue(options.matchWidth)) {
      m.push(
        size({
          apply({ rects, elements }) {
            elements.floating.style.setProperty(
              '--h-popper-match-width',
              `${rects.reference.width}px`,
            )
          },
        }),
      )
    }
    if (options.arrow?.value) {
      m.push(arrow({ element: options.arrow, padding: 4 }))
    }
    return m
  })

  const whileElementsMounted = (
    reference: HTMLElement,
    floating: HTMLElement,
    update: () => void,
  ) => {
    let cleanup: (() => void) | undefined

    const stopAutoUpdateWatch = watch(
      () => toValue(options.autoUpdate),
      (enabled) => {
        cleanup?.()
        cleanup = enabled === false ? undefined : autoUpdate(reference, floating, update)
        if (enabled === false) update()
      },
      { immediate: true },
    )

    return () => {
      stopAutoUpdateWatch()
      cleanup?.()
    }
  }

  const {
    floatingStyles,
    middlewareData,
    placement,
    update: floatingUpdate,
  } = useFloating(referenceEl, floatingEl, {
    placement: options.placement,
    strategy: computed(() => toValue(options.strategy) ?? 'absolute'),
    middleware,
    whileElementsMounted,
  })

  return {
    floatingStyles,
    middlewareData,
    placement: placement as Readonly<Ref<Placement>>,
    update: floatingUpdate,
  }
}
