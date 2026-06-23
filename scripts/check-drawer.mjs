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

expectFile('src/components/Drawer/Drawer.vue')
expectFile('src/components/Drawer/index.ts')
expectFile('src/components/Drawer/types.ts')
expectFile('docs/components/drawer.md')
expectFile('docs/examples/drawer/example-01.vue')
expectFile('docs/examples/drawer/example-02.vue')
expectFile('docs/examples/drawer/example-03.vue')
expectFile('docs/examples/drawer/example-04.vue')

expectNoFile('src/components/Drawer/DrawerTrigger.vue')
expectNoFile('src/components/Drawer/DrawerContent.vue')
expectNoFile('src/components/Drawer/DrawerClose.vue')
expectNoFile('src/components/Drawer/context.ts')

expectIncludes('src/components/Drawer/Drawer.vue', '<Teleport')
expectIncludes('src/components/Drawer/Drawer.vue', ':to="resolvedTeleportTarget"')
expectIncludes('src/components/Drawer/Drawer.vue', 'data-horizon-teleport-layer')
expectIncludes('src/components/Drawer/Drawer.vue', 'open?: boolean')
expectIncludes('src/components/Drawer/Drawer.vue', "'update:open'")
expectIncludes('src/components/Drawer/Drawer.vue', "'open-change'")
expectIncludes('src/components/Drawer/Drawer.vue', "emit('open-change', true)")
expectIncludes('src/components/Drawer/Drawer.vue', "emit('open-change', false)")
expectIncludes('src/components/Drawer/Drawer.vue', 'placement?: DrawerPlacement')
expectIncludes('src/components/Drawer/Drawer.vue', "placement: 'right'")
expectIncludes('src/components/Drawer/Drawer.vue', 'closeOnEsc')
expectIncludes('src/components/Drawer/Drawer.vue', 'closeOnOverlayClick')
expectIncludes('src/components/Drawer/Drawer.vue', 'returnFocusOnClose')
expectIncludes('src/components/Drawer/Drawer.vue', 'trapFocus')
expectIncludes('src/components/Drawer/Drawer.vue', 'lockScroll')
expectIncludes('src/components/Drawer/Drawer.vue', 'ariaLabel?: string')
expectIncludes('src/components/Drawer/Drawer.vue', ':aria-label="ariaLabelAttribute"')
expectIncludes('src/components/Drawer/Drawer.vue', 'resolveTeleportTarget')
expectIncludes(
  'src/components/Drawer/Drawer.vue',
  "document.querySelector(target) ? target : 'body'",
  'Drawer should fall back to body when a string Teleport target is missing',
)
expectIncludes('src/components/Drawer/Drawer.vue', 'dialogLayerContextKey')
expectIncludes('src/components/Drawer/Drawer.vue', 'parentDialogLayer')
expectIncludes('src/components/Drawer/Drawer.vue', 'registerTeleportedElement')
expectIncludes('src/components/Drawer/Drawer.vue', 'closeChildLayerOnEscape')
expectIncludes(
  'src/components/Drawer/Drawer.vue',
  'wrapFocus(event, panelRef.value, getTeleportedElementList())',
)
expectIncludes('src/components/Drawer/Drawer.vue', 'isControlledLayerElement')
expectIncludes('src/components/Drawer/Drawer.vue', 'resolvedLayerZIndex')
expectIncludes(
  'src/components/Drawer/Drawer.vue',
  'const inheritedChildLayerZIndex = computed(() => parentDialogLayer?.getChildLayerZIndex())',
  'Nested Drawer should inherit parent Dialog/Drawer layer z-index base',
)
expectIncludes('src/components/Drawer/Drawer.vue', 'registerModalLayer')
expectIncludes('src/components/Drawer/Drawer.vue', 'isTopLayer')
expectIncludes('src/components/Drawer/Drawer.vue', 'lockBodyScroll')
expectIncludes('src/components/Drawer/Drawer.vue', 'releaseBodyScroll')
expectIncludes('src/components/Drawer/Drawer.vue', 'focusFirstElement')
expectIncludes('src/components/Drawer/Drawer.vue', 'wasTopLayer')
expectIncludes('src/components/Drawer/Drawer.vue', 'initialFocusToken')
expectIncludes('src/components/Drawer/Drawer.vue', 'restoreFocusToken')
expectIncludes('src/components/Drawer/Drawer.vue', '@pointerup="handleOverlayPointerUp"')
expectIncludes('src/components/Drawer/Drawer.vue', '@pointercancel="clearOverlayPointerDown"')
expectIncludes('src/components/Drawer/Drawer.vue', 'aria-modal="true"')
expectIncludes('src/components/Drawer/Drawer.vue', ':aria-labelledby="titleAttributeId"')
expectIncludes('src/components/Drawer/Drawer.vue', ':aria-describedby="descriptionAttributeId"')
expectIncludes('src/components/Drawer/Drawer.vue', 'showClose')
expectIncludes('src/components/Drawer/Drawer.vue', 'Icon name="close"')
expectIncludes('src/components/Drawer/Drawer.vue', 'bg-transparent')
expectIncludes('src/components/Drawer/Drawer.vue', 'focus-visible:ring-2')
expectIncludes('src/components/Drawer/Drawer.vue', 'footerSlotProps')
expectIncludes('src/components/Drawer/Drawer.vue', 'placementClassMap')
expectIncludes('src/components/Drawer/Drawer.vue', 'defineOptions({')
expectIncludes('src/components/Drawer/Drawer.vue', 'inheritAttrs: false')
expectIncludes('src/components/Drawer/Drawer.vue', 'useAttrs')
expectIncludes('src/components/Drawer/Drawer.vue', 'v-bind="panelAttrs"')
expectIncludes('src/components/Drawer/Drawer.vue', 'panelInlineStyle')
expectIncludes('src/components/Drawer/Drawer.vue', 'w-[400px]')
expectIncludes('src/components/Drawer/Drawer.vue', 'h-80')
expectNotIncludes('src/components/Drawer/Drawer.vue', 'size?: DrawerSize')
expectNotIncludes('src/components/Drawer/Drawer.vue', "size: 'md'")
expectNotIncludes('src/components/Drawer/Drawer.vue', 'sizeClassMap')
expectNotIncludes('src/components/Drawer/Drawer.vue', 'DrawerPresetSize')
expectNotIncludes('src/components/Drawer/Drawer.vue', 'DrawerSize')
expectIncludes('src/components/Drawer/Drawer.vue', 'placementTransitionName')
expectIncludes('src/components/Drawer/Drawer.vue', 'h-drawer-slide-right')
expectIncludes('src/components/Drawer/Drawer.vue', 'h-drawer-slide-left')
expectIncludes('src/components/Drawer/Drawer.vue', 'h-drawer-slide-top')
expectIncludes('src/components/Drawer/Drawer.vue', 'h-drawer-slide-bottom')
expectMatches(
  'src/components/Drawer/Drawer.vue',
  /<slot\s+name="footer"\s+v-bind="footerSlotProps"\s*\/>/,
  'Drawer footer slot should receive close() slot props',
)
expectNotIncludes(
  'src/components/Drawer/Drawer.vue',
  'border-t',
  'Drawer footer must not render a divider line',
)
expectNotIncludes('src/components/Drawer/Drawer.vue', 'DrawerTrigger')

expectIncludes(
  'src/components/Drawer/types.ts',
  "DrawerPlacement = 'right' | 'left' | 'top' | 'bottom'",
)
expectNotIncludes('src/components/Drawer/types.ts', 'DrawerPresetSize')
expectNotIncludes('src/components/Drawer/types.ts', 'DrawerSize')
expectIncludes('src/components/Drawer/types.ts', "DrawerRole = 'dialog' | 'alertdialog'")
expectIncludes('src/components/Drawer/types.ts', 'DrawerFooterSlotProps')

expectIncludes('src/components/Drawer/index.ts', 'Drawer')
expectNotIncludes('src/components/Drawer/index.ts', 'dialogLayerContextKey')
expectNotIncludes('src/components/Drawer/index.ts', 'DrawerTrigger')
expectNotIncludes('src/components/Drawer/index.ts', 'DrawerContent')
expectNotIncludes('src/components/Drawer/index.ts', 'DrawerClose')

expectIncludes('src/components/index.ts', "import Drawer from './Drawer/Drawer.vue'")
expectIncludes('src/components/index.ts', 'DrawerFooterSlotProps')
expectIncludes('src/components/index.ts', 'DrawerPlacement')
expectIncludes('src/components/index.ts', 'DrawerRole')
expectNotIncludes('src/components/index.ts', 'DrawerSize')
expectIncludes('src/components/index.ts', 'Drawer,')
expectNotIncludes('src/components/index.ts', 'DrawerTrigger')
expectNotIncludes('src/components/index.ts', 'DrawerContent')
expectNotIncludes('src/components/index.ts', 'DrawerClose')

expectIncludes('docs/.vitepress/theme/index.ts', 'Drawer')
expectIncludes('docs/.vitepress/theme/index.ts', "app.component('Drawer', Drawer)")
expectIncludes('docs/.vitepress/config.ts', '/components/drawer')
expectIncludes('package.json', 'check:drawer')
expectMatches(
  'package.json',
  /check:dialog && npm run check:drawer && npm run check:message/,
  'npm run check should include check:drawer after check:dialog',
)

expectIncludes('docs/components/drawer.md', 'v-model:open')
expectIncludes('docs/components/drawer.md', '`placement`')
expectIncludes('docs/components/drawer.md', '`right`')
expectIncludes('docs/components/drawer.md', '`left`')
expectIncludes('docs/components/drawer.md', '`top`')
expectIncludes('docs/components/drawer.md', '`bottom`')
expectIncludes('docs/components/drawer.md', '`style`')
expectIncludes('docs/components/drawer.md', '400px')
expectIncludes('docs/components/drawer.md', '320px')
expectIncludes('docs/components/drawer.md', 'Dialog modal layer')
expectIncludes('docs/components/drawer.md', 'Drawer 不提供 trigger primitive')
expectIncludes('docs/components/drawer.md', 'close-on-overlay-click')
expectIncludes('docs/components/drawer.md', 'trap-focus')
expectIncludes('docs/components/drawer.md', 'lock-scroll')
expectIncludes('docs/components/drawer.md', 'footer')
expectNotIncludes('docs/components/drawer.md', '`size`')
expectNotIncludes('docs/components/drawer.md', '| `size` |')
expectNotIncludes('docs/components/drawer.md', 'DrawerTrigger')
expectNotIncludes('docs/components/drawer.md', 'DrawerContent')
expectNotIncludes('docs/components/drawer.md', 'DrawerClose')

expectIncludes('docs/examples/drawer/example-01.vue', '<Drawer')
expectIncludes('docs/examples/drawer/example-01.vue', 'v-model:open')
expectIncludes('docs/examples/drawer/example-01.vue', 'Button theme="default"')
expectIncludes('docs/examples/drawer/example-01.vue', 'Button theme="brand"')
expectIncludes('docs/examples/drawer/example-02.vue', 'placement')
expectIncludes('docs/examples/drawer/example-02.vue', "'right'")
expectIncludes('docs/examples/drawer/example-02.vue', "'left'")
expectIncludes('docs/examples/drawer/example-02.vue', "'top'")
expectIncludes('docs/examples/drawer/example-02.vue', "'bottom'")
expectNotIncludes('docs/examples/drawer/example-02.vue', 'size=')
expectIncludes('docs/examples/drawer/example-03.vue', '<ScrollArea')
expectIncludes(
  'docs/examples/drawer/example-03.vue',
  'style="width: 520px"',
  'Drawer long content example should demonstrate style-controlled width',
)
expectNotIncludes('docs/examples/drawer/example-03.vue', 'size=')
expectIncludes(
  'docs/examples/drawer/example-03.vue',
  ':max-height="420"',
  'Drawer long content example should pass max-height as a number',
)
checks.push({
  name: 'Drawer long content example should not pass unitless max-height as a string',
  pass: !/(^|[^:])max-height="420"/.test(read('docs/examples/drawer/example-03.vue')),
})
expectNotIncludes(
  'docs/examples/drawer/example-03.vue',
  'scrollbar-visibility="always"',
  'Drawer long content example should use ScrollArea auto scrollbar visibility',
)
checks.push({
  name: 'Drawer long content example should include enough rows to overflow',
  pass: (read('docs/examples/drawer/example-03.vue').match(/title:/g) ?? []).length >= 12,
})
expectIncludes('docs/examples/drawer/example-04.vue', '<Popover')
expectIncludes('docs/examples/drawer/example-04.vue', '<DropdownMenu')
expectIncludes('docs/examples/drawer/example-04.vue', '<DropdownMenuContent')

for (const example of [
  'docs/examples/drawer/example-01.vue',
  'docs/examples/drawer/example-02.vue',
  'docs/examples/drawer/example-03.vue',
  'docs/examples/drawer/example-04.vue',
]) {
  expectNotIncludes(example, '<DrawerTrigger', `${example} must not use DrawerTrigger`)
  expectNotIncludes(example, '<DrawerContent', `${example} must not use DrawerContent`)
  expectNotIncludes(example, '<DrawerClose', `${example} must not use DrawerClose`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
}

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Drawer contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Drawer contract check passed: ${checks.length} checks`)
