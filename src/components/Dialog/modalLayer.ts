const modalLayerStack: Array<{ id: symbol; order: number; zIndex: number }> = []
let modalLayerOrder = 0
const modalZIndexBase = 10000
let scrollLockCount = 0
let originalBodyOverflow = ''
let originalBodyPaddingRight = ''

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function registerModalLayer(id: symbol) {
  modalLayerOrder += 1
  const layer = {
    id,
    order: modalLayerOrder,
    zIndex: modalZIndexBase + modalLayerOrder * 10,
  }
  modalLayerStack.push(layer)

  return {
    order: layer.order,
    zIndex: layer.zIndex,
    unregister: () => {
      let index = -1
      for (let i = modalLayerStack.length - 1; i >= 0; i -= 1) {
        if (modalLayerStack[i].id === id) {
          index = i
          break
        }
      }

      if (index >= 0) {
        modalLayerStack.splice(index, 1)
      }
      if (modalLayerStack.length === 0) {
        modalLayerOrder = 0
      }
    },
  }
}

export function isTopLayer(id: symbol) {
  return modalLayerStack[modalLayerStack.length - 1]?.id === id
}

export function lockBodyScroll() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (scrollLockCount === 0) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    originalBodyOverflow = document.body.style.overflow
    originalBodyPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'

    if (scrollBarWidth > 0) {
      const currentPaddingRight =
        Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${currentPaddingRight + scrollBarWidth}px`
    }
  }
  scrollLockCount += 1
}

export function releaseBodyScroll() {
  if (typeof document === 'undefined') return
  if (scrollLockCount === 0) return

  scrollLockCount -= 1
  if (scrollLockCount === 0) {
    document.body.style.overflow = originalBodyOverflow
    document.body.style.paddingRight = originalBodyPaddingRight
    originalBodyOverflow = ''
    originalBodyPaddingRight = ''
  }
}

function isElementVisible(element: HTMLElement) {
  if (typeof window === 'undefined') return false

  const style = window.getComputedStyle(element)

  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    (element.getClientRects().length > 0 || element === document.activeElement)
  )
}

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => {
      if (element.hasAttribute('disabled')) return false
      if (element.getAttribute('aria-hidden') === 'true') return false
      if (element.tabIndex < 0) return false
      if (element.closest('[inert]')) return false
      return isElementVisible(element)
    },
  )
}

export function focusFirstElement(container: HTMLElement) {
  const [firstElement] = getFocusableElements(container)
  ;(firstElement ?? container).focus({ preventScroll: true })
}

export function wrapFocus(
  event: KeyboardEvent,
  container: HTMLElement,
  extraContainers: HTMLElement[] = [],
) {
  const focusableElements = [container, ...extraContainers].flatMap((item) =>
    getFocusableElements(item),
  )

  if (focusableElements.length === 0) {
    event.preventDefault()
    container.focus({ preventScroll: true })
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement
  const activeIndex =
    activeElement instanceof HTMLElement ? focusableElements.indexOf(activeElement) : -1

  if (extraContainers.length > 0) {
    event.preventDefault()
    const nextIndex =
      activeIndex < 0
        ? event.shiftKey
          ? focusableElements.length - 1
          : 0
        : event.shiftKey
          ? (activeIndex - 1 + focusableElements.length) % focusableElements.length
          : (activeIndex + 1) % focusableElements.length
    focusableElements[nextIndex].focus({ preventScroll: true })
    return
  }

  if (!(activeElement instanceof Node) || !container.contains(activeElement)) {
    event.preventDefault()
    ;(event.shiftKey ? lastElement : firstElement).focus({ preventScroll: true })
    return
  }

  if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus({ preventScroll: true })
  } else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus({ preventScroll: true })
  }
}
