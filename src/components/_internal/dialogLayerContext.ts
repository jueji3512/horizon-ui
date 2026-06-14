import type { InjectionKey } from 'vue'

export interface DialogLayerContext {
  containsElement: (target: EventTarget | null) => boolean
  getChildLayerZIndex: () => number | undefined
  registerTeleportedElement: (
    element: HTMLElement,
    options?: {
      onEscape?: () => boolean
    },
  ) => () => void
  whenLayerReady: () => Promise<void>
}

export interface DialogTeleportedLayerBehavior {
  onEscape?: () => boolean
}

export const dialogLayerContextKey = Symbol(
  'dialogLayerContext',
) as InjectionKey<DialogLayerContext>

export const dialogTeleportedLayerBehaviorKey = Symbol(
  'dialogTeleportedLayerBehavior',
) as InjectionKey<DialogTeleportedLayerBehavior>
