import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const checks = []
const fileCache = new Map()

function read(relativePath) {
  if (!fileCache.has(relativePath)) {
    fileCache.set(relativePath, readFileSync(join(root, relativePath), 'utf8'))
  }
  return fileCache.get(relativePath)
}

function expectFile(relativePath) {
  checks.push({
    name: `${relativePath} exists`,
    pass: existsSync(join(root, relativePath)),
  })
}

function expectNoFile(relativePath) {
  checks.push({
    name: `${relativePath} must not exist`,
    pass: !existsSync(join(root, relativePath)),
  })
}

function expectIncludes(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} includes ${pattern}`,
    pass: existsSync(filePath) && read(relativePath).includes(pattern),
  })
}

function expectNotIncludes(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} does not include ${pattern}`,
    pass: existsSync(filePath) && !read(relativePath).includes(pattern),
  })
}

function expectMatches(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} matches ${pattern}`,
    pass: existsSync(filePath) && pattern.test(read(relativePath)),
  })
}

expectFile('src/components/Dialog/Dialog.vue')
expectFile('src/components/Dialog/index.ts')
expectFile('src/components/Dialog/types.ts')
expectFile('src/components/Dialog/modalLayer.ts')
expectFile('src/components/_internal/dialogLayerContext.ts')
expectFile('docs/components/dialog.md')
expectFile('docs/examples/dialog/example-01.vue')
expectFile('docs/examples/dialog/example-02.vue')
expectFile('docs/examples/dialog/example-03.vue')
expectFile('docs/examples/dialog/example-04.vue')
expectFile('docs/examples/dialog/example-05.vue')
expectFile('docs/examples/dialog/example-06.vue')

expectNoFile('src/components/Dialog/DialogTrigger.vue')
expectNoFile('src/components/Dialog/DialogContent.vue')
expectNoFile('src/components/Dialog/DialogClose.vue')
expectNoFile('src/components/Dialog/context.ts')

expectIncludes('src/components/Dialog/Dialog.vue', '<Teleport')
expectIncludes('src/components/Dialog/Dialog.vue', ':to="resolvedTeleportTarget"')
expectIncludes('src/components/Dialog/Dialog.vue', 'open?: boolean')
expectIncludes('src/components/Dialog/Dialog.vue', "'update:open'")
expectIncludes('src/components/Dialog/Dialog.vue', "'open-change'")
expectIncludes('src/components/Dialog/Dialog.vue', "emit('open-change', true)")
expectIncludes('src/components/Dialog/Dialog.vue', "emit('open-change', false)")
expectIncludes('src/components/Dialog/Dialog.vue', 'closeOnEsc')
expectIncludes('src/components/Dialog/Dialog.vue', 'closeOnOverlayClick')
expectIncludes('src/components/Dialog/Dialog.vue', 'returnFocusOnClose')
expectIncludes('src/components/Dialog/Dialog.vue', 'trapFocus')
expectIncludes('src/components/Dialog/Dialog.vue', 'lockScroll')
expectIncludes('src/components/Dialog/Dialog.vue', 'ariaLabel?: string')
expectIncludes('src/components/Dialog/Dialog.vue', ':aria-label="ariaLabelAttribute"')
expectIncludes('src/components/Dialog/Dialog.vue', 'layerStackOrder')
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'layerZIndex',
  'Dialog overlay should use the modal layer z-index allocation',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'resolveTeleportTarget',
  'Dialog should safely resolve Teleport targets',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  "document.querySelector(target) ? target : 'body'",
  'Dialog should fall back to body when a string Teleport target is missing',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'resolvedLayerZIndex',
  'Dialog overlay and child teleported layers should share the same resolved z-index base',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'const inheritedChildLayerZIndex = computed(() => parentDialogLayer?.getChildLayerZIndex())',
  'Nested Dialog should be able to inherit the parent Dialog layer z-index base',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'if (props.zIndex !== undefined) return props.zIndex + layerStackOrder.value',
  'Dialog custom zIndex should feed the resolved modal layer z-index',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'return Math.max(layerZIndex.value, inheritedZIndex + layerStackOrder.value)',
  'Nested Dialog without a custom zIndex should render above a parent custom Dialog layer',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'return resolvedLayerZIndex.value === undefined ? undefined : resolvedLayerZIndex.value + 1',
  'Dialog child teleported layers should render directly above the resolved Dialog layer',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'wasTopLayer',
  'Dialog should only restore focus when the closing layer was topmost',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'deactivateLayer(true)',
  'Dialog should restore focus when an open top layer unmounts',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'initialFocusToken',
  'Dialog should cancel stale initial focus callbacks',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'restoreFocusToken',
  'Dialog should cancel stale focus restoration callbacks',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  '@pointerup="handleOverlayPointerUp"',
  'Dialog overlay dismissal should confirm pointer up on the overlay',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  '@pointercancel="clearOverlayPointerDown"',
  'Dialog overlay dismissal should clear stale pointer state on cancel',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'isOverlayPointerDown && event.target === event.currentTarget',
  'Dialog overlay dismissal should require pointer down and up on the overlay',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'syncFocusinListener',
  'Dialog focus trap should guard focus leaving the panel',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'parentDialogLayer',
  'Dialog should wait for parent modal layer registration before nested initial-open children register',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'registerTeleportedElement',
  'Dialog should let teleported child layers register as part of the focus trap',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'wrapFocus(event, panelRef.value, getTeleportedElementList())',
  'Dialog tab trapping should include registered teleported child layers in the focus cycle',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'isControlledLayerElement',
  'Dialog focus trap should also allow aria-controls linked teleported child layers',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'closeChildLayerOnEscape',
  'Dialog Escape handling should let registered child layers close before the parent modal',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'for (let i = layers.length - 1; i >= 0; i -= 1)',
  'Dialog Escape should offer dismissal to the most recently registered child layer first',
)
expectIncludes('src/components/Dialog/Dialog.vue', 'aria-modal="true"')
expectIncludes('src/components/Dialog/Dialog.vue', ':aria-labelledby="titleAttributeId"')
expectIncludes('src/components/Dialog/Dialog.vue', ':aria-describedby="descriptionAttributeId"')
expectIncludes('src/components/Dialog/Dialog.vue', 'showClose')
expectIncludes('src/components/Dialog/Dialog.vue', 'Icon name="close"')
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'bg-transparent',
  'Dialog close control should be a plain icon button without button chrome',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'hover:bg-[var(--bg-color-container-hover)]',
  'Dialog close control should still expose a hover state',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'active:bg-[var(--bg-color-container-active)]',
  'Dialog close control should still expose an active state',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'focus-visible:ring-2',
  'Dialog close control should expose keyboard focus',
)
expectIncludes('src/components/Dialog/Dialog.vue', 'footerSlotProps')
expectIncludes('src/components/Dialog/Dialog.vue', 'close')
expectMatches(
  'src/components/Dialog/Dialog.vue',
  /<slot\s+name="footer"\s+v-bind="footerSlotProps"\s*\/>/,
  'Dialog footer slot should receive the close() slot props object',
)
expectMatches(
  'src/components/Dialog/Dialog.vue',
  /const footerSlotProps = computed<DialogFooterSlotProps>\(\(\) => \(\{\s*close,\s*\}\)\)/s,
  'Dialog footer slot props should include close()',
)
expectNotIncludes(
  'src/components/Dialog/Dialog.vue',
  'border-t',
  'Dialog footer must not render a divider line',
)
expectNotIncludes(
  'src/components/Dialog/Dialog.vue',
  'DialogTrigger',
  'Dialog must not include trigger primitive behavior',
)

expectIncludes('src/components/Dialog/modalLayer.ts', 'modalLayerStack')
expectIncludes('src/components/Dialog/modalLayer.ts', 'modalLayerOrder')
expectIncludes('src/components/Dialog/modalLayer.ts', 'modalZIndexBase')
expectIncludes('src/components/Dialog/modalLayer.ts', '10000')
expectIncludes('src/components/Dialog/modalLayer.ts', 'modalLayerOrder * 10')
expectIncludes('src/components/Dialog/modalLayer.ts', 'order:')
expectIncludes('src/components/Dialog/modalLayer.ts', 'zIndex:')
expectIncludes(
  'src/components/Dialog/modalLayer.ts',
  'modalLayerOrder = 0',
  'Dialog modal layer order should reset when the stack is empty',
)
expectIncludes('src/components/Dialog/modalLayer.ts', 'isTopLayer')
expectIncludes('src/components/Dialog/modalLayer.ts', 'lockBodyScroll')
expectIncludes('src/components/Dialog/modalLayer.ts', 'releaseBodyScroll')
expectIncludes('src/components/Dialog/modalLayer.ts', 'getFocusableElements')
expectIncludes('src/components/Dialog/modalLayer.ts', 'focusFirstElement')
expectIncludes('src/components/Dialog/modalLayer.ts', 'wrapFocus')
expectIncludes(
  'src/components/Dialog/modalLayer.ts',
  'element.tabIndex < 0',
  'Dialog focusables should exclude negative tabindex values',
)
expectIncludes(
  'src/components/Dialog/modalLayer.ts',
  '!container.contains(activeElement)',
  'Dialog focus trap should recover when focus has escaped the panel',
)
expectNotIncludes('src/components/Dialog/modalLayer.ts', 'export const modalLayerStack')

expectIncludes('src/components/_internal/dialogLayerContext.ts', 'dialogLayerContextKey')
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'dialogTeleportedLayerBehaviorKey')
expectNotIncludes(
  'src/components/_internal/dialogLayerContext.ts',
  'Symbol.for',
  'Dialog internal layer keys should not be globally addressable extension points',
)
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'registerTeleportedElement')
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'onEscape')
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'getChildLayerZIndex')
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'whenLayerReady')
expectIncludes('src/components/_internal/dialogLayerContext.ts', 'containsElement')

expectIncludes('src/components/Popper/PopperContent.vue', 'dialogLayerContextKey')
expectIncludes('src/components/Popper/PopperContent.vue', 'dialogTeleportedLayerBehaviorKey')
expectIncludes('src/components/Popper/PopperContent.vue', 'dialogChildLayerZIndex')
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'isDialogTeleportedElementRegistered',
  'PopperContent should track Dialog child layer registration reactively',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'registeredDialogTeleportedElement',
  'PopperContent should remember the registered Dialog child element',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'if (registeredDialogTeleportedElement === contentEl.value) return',
  'PopperContent should preserve Dialog child layer order when only close policies change',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'isDialogTeleportedElementRegistered.value ? dialogLayer?.getChildLayerZIndex() : undefined',
  'PopperContent should derive Dialog child z-index from the current Dialog layer base',
)
expectNotIncludes(
  'src/components/Popper/PopperContent.vue',
  'dialogChildLayerZIndex.value = dialogLayer.getChildLayerZIndex()',
  'PopperContent must not snapshot Dialog child z-index only at registration time',
)
expectIncludes('src/components/Popper/PopperContent.vue', 'closeDialogTeleportedElementOnEscape')
expectIncludes('src/components/Popper/PopperContent.vue', 'syncDialogTeleportedElement')
expectIncludes('src/components/Popper/PopperContent.vue', 'clearDialogTeleportedElement')
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'if (e.defaultPrevented) return',
  'PopperContent Escape listener should respect already-handled Dialog child events',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'dialogTeleportedLayerBehavior.onEscape()',
  'PopperContent should allow semantic wrappers to own Dialog-layer Escape behavior',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'dialogLayer.registerTeleportedElement',
  'PopperContent should register teleported content with an owning Dialog layer',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'onEscape: closeDialogTeleportedElementOnEscape',
  'PopperContent inside Dialog should let Escape close the child layer first',
)
expectIncludes('src/components/Popover/PopoverContent.vue', 'dialogTeleportedLayerBehaviorKey')
expectMatches(
  'src/components/Popover/PopoverTrigger.ts',
  /'aria-controls': ctx\.open\.value \? \(popper\?\.contentId \?\? ctx\.contentId\) : undefined/,
  'PopoverTrigger aria-controls should point at the actual PopperContent id',
)
expectIncludes(
  'src/components/Popover/PopoverContent.vue',
  'if (event.defaultPrevented) return',
  'PopoverContent Escape listener should not double-handle Dialog child Escape',
)
expectIncludes(
  'src/components/Popover/PopoverContent.vue',
  'provide(dialogTeleportedLayerBehaviorKey',
  'PopoverContent should register semantic Dialog-layer Escape behavior',
)
expectIncludes(
  'src/components/Popover/PopoverContent.vue',
  'if (ctx.hasOpenChildLayer()) return false',
  'PopoverContent should let nested child layers own Dialog Escape handling',
)

expectIncludes('src/components/Dialog/types.ts', "DialogSize = 'sm' | 'md' | 'lg'")
expectIncludes('src/components/Dialog/types.ts', "DialogRole = 'dialog' | 'alertdialog'")
expectIncludes('src/components/Dialog/index.ts', 'Dialog')
expectNotIncludes('src/components/Dialog/index.ts', 'dialogLayerContextKey')
expectNotIncludes('src/components/Dialog/index.ts', 'dialogTeleportedLayerBehaviorKey')
expectNotIncludes('src/components/Dialog/index.ts', 'DialogTrigger')
expectNotIncludes('src/components/Dialog/index.ts', 'DialogContent')
expectNotIncludes('src/components/Dialog/index.ts', 'DialogClose')

expectIncludes('src/components/index.ts', 'Dialog')
expectNotIncludes('src/components/index.ts', 'dialogLayerContextKey')
expectNotIncludes('src/components/index.ts', 'dialogTeleportedLayerBehaviorKey')
expectNotIncludes('src/components/index.ts', 'DialogTrigger')
expectNotIncludes('src/components/index.ts', 'DialogContent')
expectNotIncludes('src/components/index.ts', 'DialogClose')
expectIncludes('docs/.vitepress/theme/index.ts', 'Dialog')
expectNotIncludes('docs/.vitepress/theme/index.ts', 'DialogTrigger')
expectNotIncludes('docs/.vitepress/theme/index.ts', 'DialogContent')
expectNotIncludes('docs/.vitepress/theme/index.ts', 'DialogClose')
expectIncludes('docs/.vitepress/config.ts', '/components/dialog')
expectIncludes(
  'docs/.vitepress/config.ts',
  '[data-horizon-teleport-layer], [data-horizon-teleport-layer] *',
  'VitePress reset should not strip button styles inside teleported Horizon layers',
)
expectIncludes(
  'src/components/Dialog/Dialog.vue',
  'data-horizon-teleport-layer',
  'Dialog overlay should use the shared teleported layer reset isolation marker',
)

expectIncludes('docs/components/dialog.md', 'v-model:open')
expectIncludes('docs/components/dialog.md', 'aria-label')
expectIncludes('docs/components/dialog.md', 'close-on-overlay-click')
expectIncludes('docs/components/dialog.md', 'trap-focus')
expectIncludes('docs/components/dialog.md', 'lock-scroll')
expectIncludes('docs/components/dialog.md', 'footer')
expectIncludes('docs/components/dialog.md', 'Button theme="default"')
expectIncludes('docs/components/dialog.md', 'Button theme="brand"')
expectIncludes('docs/components/dialog.md', 'Button theme="error"')
expectIncludes('docs/components/dialog.md', 'Dialog 不提供 trigger primitive')
expectIncludes('docs/components/dialog.md', 'Popover 是锚点非模态浮层')
expectNotIncludes('docs/components/dialog.md', 'DialogTrigger')
expectNotIncludes('docs/components/dialog.md', 'DialogContent')
expectNotIncludes('docs/components/dialog.md', 'DialogClose')

expectIncludes('docs/examples/dialog/example-01.vue', '<Dialog')
expectIncludes('docs/examples/dialog/example-01.vue', 'v-model:open')
expectIncludes('docs/examples/dialog/example-01.vue', 'Button theme="default"')
expectIncludes('docs/examples/dialog/example-01.vue', 'Button theme="brand"')
expectIncludes('docs/examples/dialog/example-02.vue', '<Form')
expectIncludes('docs/examples/dialog/example-02.vue', '<Select')
expectIncludes('docs/examples/dialog/example-03.vue', 'v-model:open')
expectIncludes('docs/examples/dialog/example-03.vue', 'Text theme="secondary"')
expectNotIncludes('docs/examples/dialog/example-03.vue', 'Text type="secondary"')
expectIncludes('docs/examples/dialog/example-04.vue', '<ScrollArea')
expectIncludes('docs/examples/dialog/example-05.vue', 'role="alertdialog"')
expectIncludes('docs/examples/dialog/example-05.vue', 'Button theme="error"')
expectIncludes('docs/examples/dialog/example-06.vue', '<Popover')
expectIncludes('docs/examples/dialog/example-06.vue', '<PopoverContent')
expectIncludes('docs/examples/dialog/example-06.vue', '<DropdownMenu')
expectIncludes('docs/examples/dialog/example-06.vue', '<DropdownMenuContent')
expectIncludes('docs/examples/dialog/example-06.vue', '<MenuItem')
expectIncludes('docs/examples/dialog/example-06.vue', 'Nested actions')
expectMatches(
  'docs/examples/dialog/example-06.vue',
  /<PopoverContent[\s\S]*<DropdownMenu[\s\S]*<\/DropdownMenu>[\s\S]*<\/PopoverContent>/,
  'Dialog layered example should cover a DropdownMenu nested inside PopoverContent',
)
expectNotIncludes('docs/examples/dialog/example-01.vue', '<DialogTrigger')
expectNotIncludes('docs/examples/dialog/example-01.vue', '<DialogContent')
expectNotIncludes('docs/examples/dialog/example-01.vue', '<DialogClose')
expectIncludes('package.json', 'check:dialog')

for (const example of [
  'docs/examples/dialog/example-01.vue',
  'docs/examples/dialog/example-02.vue',
  'docs/examples/dialog/example-03.vue',
  'docs/examples/dialog/example-04.vue',
  'docs/examples/dialog/example-05.vue',
  'docs/examples/dialog/example-06.vue',
]) {
  expectNotIncludes(example, '<DialogTrigger', `${example} must not use DialogTrigger`)
  expectNotIncludes(example, '<DialogContent', `${example} must not use DialogContent`)
  expectNotIncludes(example, '<DialogClose', `${example} must not use DialogClose`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
}

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Dialog contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Dialog contract check passed: ${checks.length} checks`)
