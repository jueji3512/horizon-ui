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

expectFile('src/components/Popover/Popover.vue')
expectFile('src/components/Popover/PopoverTrigger.ts')
expectFile('src/components/Popover/PopoverContent.vue')
expectFile('src/components/Popover/context.ts')
expectFile('src/components/Popover/types.ts')
expectFile('src/components/Popover/index.ts')
expectFile('docs/components/popover.md')
expectFile('docs/examples/popover/example-01.vue')
expectFile('docs/examples/popover/example-05.vue')

expectIncludes('src/components/Popover/Popover.vue', '<Popper')
expectIncludes('src/components/Popover/Popover.vue', ':visible="computedOpen"')
expectIncludes('src/components/Popover/Popover.vue', 'const rawOpen = computed')
expectIncludes('src/components/Popover/Popover.vue', "trigger: 'click'")
expectIncludes('src/components/Popover/Popover.vue', "'update:open'")
expectIncludes('src/components/Popover/Popover.vue', "'open-change'")
expectIncludes('src/components/Popover/Popover.vue', 'closeOnOutsideClick')
expectIncludes('src/components/Popover/Popover.vue', 'closeOnEsc')
expectIncludes('src/components/Popover/Popover.vue', 'registerChildLayer')
expectIncludes('src/components/Popover/Popover.vue', 'hasOpenChildLayer')
expectIncludes('src/components/Popover/Popover.vue', 'layer.open() && layer.contains(target)')
expectIncludes('src/components/Popover/Popover.vue', 'if (rawOpen.value)')
expectIncludes('src/components/Popover/Popover.vue', 'returnFocusOnClose')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'asChild')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'cloneVNode')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'aria-expanded')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'setTriggerElement')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'onMouseenter')
expectIncludes('src/components/Popover/PopoverTrigger.ts', 'onFocusin')
expectIncludes('src/components/Popover/PopoverContent.vue', 'PopperContent')
expectIncludes('src/components/Popover/PopoverContent.vue', 'syncDocumentListeners')
expectIncludes('src/components/Popover/PopoverContent.vue', 'ctx.isEventInsideLayer')
expectIncludes('src/components/Popover/PopoverContent.vue', 'ctx.hasOpenChildLayer')
expectIncludes('src/components/Popover/PopoverContent.vue', 'ctx.close({ restoreFocus: true })')
expectIncludes(
  'src/components/Popover/types.ts',
  "PopoverTriggerType = 'click' | 'hover' | 'focus' | 'manual'",
)
expectIncludes('src/components/Popover/index.ts', 'PopoverTrigger')
expectIncludes('src/components/Popover/index.ts', 'PopoverContent')
expectIncludes('src/components/index.ts', 'Popover')
expectIncludes('src/components/index.ts', 'PopoverTrigger')
expectIncludes('src/components/index.ts', 'PopoverContent')
expectIncludes('docs/.vitepress/theme/index.ts', 'PopoverTrigger')
expectIncludes('docs/.vitepress/theme/index.ts', 'PopoverContent')
expectIncludes('docs/.vitepress/config.ts', '/components/popover')
expectIncludes('docs/components/popover.md', 'v-model:open')
expectIncludes('docs/components/popover.md', 'PopoverTrigger')
expectIncludes('docs/components/popover.md', 'PopoverContent')
expectIncludes('docs/examples/popover/example-01.vue', '<PopoverTrigger')
expectIncludes('docs/examples/popover/example-01.vue', '<PopoverContent')
expectIncludes('docs/examples/popover/example-05.vue', 'trigger="manual"')
expectNotIncludes('docs/components/popover.md', 'v-model:visible')
expectIncludes('package.json', 'check:popover')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Popover contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Popover contract check passed: ${checks.length} checks`)
