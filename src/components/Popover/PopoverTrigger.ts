import {
  cloneVNode,
  Comment,
  defineComponent,
  Fragment,
  h,
  inject,
  onBeforeUnmount,
  type ComponentPublicInstance,
  type PropType,
  type VNode,
} from 'vue'
import { popperContextKey } from '../Popper/context'
import { popoverContextKey } from './context'

function resolveElement(value: Element | ComponentPublicInstance | null): HTMLElement | null {
  if (value instanceof HTMLElement) return value

  const element = (value as ComponentPublicInstance | null)?.$el
  return element instanceof HTMLElement ? element : null
}

function getSlotChild(nodes: VNode[] | undefined): VNode | null {
  if (!nodes) return null

  for (const node of nodes) {
    if (node.type === Comment) continue

    if (node.type === Fragment && Array.isArray(node.children)) {
      const child = getSlotChild(node.children as VNode[])
      if (child) return child
      continue
    }

    return node
  }

  return null
}

export default defineComponent({
  name: 'PopoverTrigger',
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    ariaHaspopup: {
      type: String as PropType<string>,
      default: 'dialog',
    },
  },
  emits: ['mouseenter', 'mouseleave', 'click', 'focus', 'focusin', 'blur', 'focusout', 'keydown'],
  setup(props, { emit, slots }) {
    const injectedCtx = inject(popoverContextKey)
    if (!injectedCtx) {
      throw new Error('<PopoverTrigger> must be used inside <Popover>')
    }
    const ctx = injectedCtx

    const popper = inject(popperContextKey, null)

    function setTriggerElement(value: Element | ComponentPublicInstance | null) {
      const element = resolveElement(value)
      ctx.setTriggerElement(element)
      if (popper) {
        popper.triggerRef.value = element ?? undefined
      }
    }

    function syncEventTarget(event: Event) {
      if (event.currentTarget instanceof HTMLElement) {
        setTriggerElement(event.currentTarget)
      }
    }

    function isInternalFocusMove(event: FocusEvent) {
      const relatedTarget = event.relatedTarget
      return relatedTarget instanceof Node && Boolean(ctx.triggerRef.value?.contains(relatedTarget))
    }

    function onMouseenter(event: MouseEvent) {
      syncEventTarget(event)
      if (ctx.trigger.value === 'hover' && !ctx.disabled.value) ctx.show()
      emit('mouseenter', event)
    }

    function onMouseleave(event: MouseEvent) {
      if (ctx.trigger.value === 'hover') ctx.hide()
      emit('mouseleave', event)
    }

    function onClick(event: MouseEvent) {
      syncEventTarget(event)
      if (ctx.trigger.value === 'click' && !ctx.disabled.value) ctx.toggle()
      emit('click', event)
    }

    function onFocus(event: FocusEvent) {
      if (isInternalFocusMove(event)) return
      emit('focus', event)
    }

    function onFocusin(event: FocusEvent) {
      syncEventTarget(event)
      if (isInternalFocusMove(event)) return
      if (ctx.trigger.value === 'focus' && !ctx.disabled.value) ctx.show()
      emit('focusin', event)
    }

    function onBlur(event: FocusEvent) {
      if (isInternalFocusMove(event)) return
      emit('blur', event)
    }

    function onFocusout(event: FocusEvent) {
      if (isInternalFocusMove(event)) return
      if (ctx.trigger.value === 'focus') ctx.hide()
      emit('focusout', event)
    }

    function onKeydown(event: KeyboardEvent) {
      emit('keydown', event)
    }

    onBeforeUnmount(() => {
      ctx.close({ immediate: true, restoreFocus: false })
      ctx.setTriggerElement(null)
      if (popper) popper.triggerRef.value = undefined
    })

    return () => {
      const triggerProps = {
        ref: setTriggerElement,
        class: props.asChild ? undefined : 'inline-flex',
        id: ctx.triggerId,
        'aria-haspopup': props.ariaHaspopup || undefined,
        'aria-expanded': ctx.open.value,
        'aria-controls': ctx.open.value ? (popper?.contentId ?? ctx.contentId) : undefined,
        onMouseenter,
        onMouseleave,
        onClick,
        onFocus,
        onFocusin,
        onBlur,
        onFocusout,
        onKeydown,
      }

      if (props.asChild) {
        const child = getSlotChild(slots.default?.())
        return child ? cloneVNode(child, triggerProps, true) : null
      }

      return h('div', triggerProps, slots.default?.())
    }
  },
})
