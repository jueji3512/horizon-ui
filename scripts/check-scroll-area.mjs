import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

const checks = []

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
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

expectFile('src/components/ScrollArea/ScrollArea.vue')
expectFile('src/components/ScrollArea/index.ts')
expectFile('src/components/ScrollArea/types.ts')
expectFile('docs/components/scrollarea.md')
expectFile('docs/examples/scrollarea/example-01.vue')
expectFile('docs/examples/scrollarea/example-02.vue')
expectFile('docs/examples/scrollarea/example-03.vue')
expectFile('docs/examples/scrollarea/example-04.vue')

expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'root > viewport > content')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'defineExpose')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'viewportRef')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'contentRef')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'scrollToElement')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'requestAnimationFrame')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'ResizeObserver')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'passive: true')
expectIncludes('src/components/ScrollArea/ScrollArea.vue', 'translate3d')
expectIncludes(
  'src/components/ScrollArea/ScrollArea.vue',
  'top-1 right-0.5 w-1',
  'vertical thumb has an explicit top inset',
)
expectIncludes(
  'src/components/ScrollArea/ScrollArea.vue',
  'bottom-0.5 left-1 h-1',
  'horizontal thumb has an explicit left inset',
)
expectNotIncludes(
  'src/components/ScrollArea/ScrollArea.vue',
  'thumbOffset + 4',
  'thumb transform must not double-apply track edge inset',
)
expectNotIncludes(
  'src/components/ScrollArea/ScrollArea.vue',
  'scrollIntoView(',
  'ScrollArea avoids browser scrollIntoView',
)

expectIncludes('src/components/ScrollArea/types.ts', 'ScrollAreaState')
expectIncludes('src/components/ScrollArea/types.ts', 'ScrollAreaExpose')
expectIncludes('src/components/index.ts', 'ScrollArea')
expectIncludes('docs/.vitepress/theme/index.ts', 'ScrollArea')
expectIncludes('docs/.vitepress/config.ts', '/components/scrollarea')
expectIncludes(
  'docs/components/scrollarea.md',
  'scrollarea/example-04',
  'ScrollArea docs include programmatic controls demo',
)
expectIncludes('docs/examples/scrollarea/example-04.vue', 'scrollTo(')
expectIncludes('docs/examples/scrollarea/example-04.vue', 'scrollBy(')
expectIncludes('docs/examples/scrollarea/example-04.vue', 'scrollToElement(')
expectIncludes('docs/examples/scrollarea/example-04.vue', 'getScrollState(')
expectIncludes('docs/examples/scrollarea/example-04.vue', 'update()')

expectIncludes('src/components/Select/Select.vue', 'ScrollArea')
expectIncludes('src/components/Select/Select.vue', ':max-height="240"')
expectIncludes(
  'src/components/Select/Select.vue',
  "scrollToElement(element, { block: 'nearest' })",
  'Select delegates active option visibility to ScrollArea',
)
expectNotIncludes('src/components/Select/Select.vue', 'max-h-60 overflow-auto')
expectNotIncludes(
  'src/components/Select/Select.vue',
  'scrollIntoView(',
  'Select avoids browser scrollIntoView',
)
expectIncludes('src/components/Dropdown/Dropdown.vue', 'ScrollArea')
expectIncludes(
  'src/components/Dropdown/Dropdown.vue',
  "scrollToElement(element, { block: 'nearest' })",
  'Dropdown delegates active item visibility to ScrollArea',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`ScrollArea contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`ScrollArea contract check passed: ${checks.length} checks`)
