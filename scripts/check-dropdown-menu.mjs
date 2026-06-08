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
    name: `${relativePath} is removed`,
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

expectFile('src/components/DropdownMenu/DropdownMenu.vue')
expectFile('src/components/DropdownMenu/DropdownMenuTrigger.vue')
expectFile('src/components/DropdownMenu/DropdownMenuContent.vue')
expectFile('src/components/DropdownMenu/index.ts')
expectFile('src/components/DropdownMenu/types.ts')
expectFile('docs/components/dropdown-menu.md')
expectFile('docs/examples/dropdown-menu/example-01.vue')
expectFile('docs/examples/dropdown-menu/example-05.vue')
expectNoFile('src/components/Dropdown/Dropdown.vue')
expectNoFile('src/components/Dropdown/DropdownItem.vue')
expectNoFile('docs/components/dropdown.md')

expectIncludes('src/components/DropdownMenu/DropdownMenu.vue', 'Popover')
expectIncludes('src/components/DropdownMenu/DropdownMenu.vue', "'update:open'")
expectIncludes('src/components/DropdownMenu/DropdownMenu.vue', "'open-change'")
expectIncludes('src/components/DropdownMenu/DropdownMenu.vue', 'returnFocusOnClose')
expectIncludes('src/components/DropdownMenu/DropdownMenuTrigger.vue', 'PopoverTrigger')
expectIncludes('src/components/DropdownMenu/DropdownMenuTrigger.vue', 'aria-haspopup="menu"')
expectIncludes('src/components/DropdownMenu/DropdownMenuTrigger.vue', 'asChild')
expectIncludes('src/components/DropdownMenu/DropdownMenuContent.vue', 'PopoverContent')
expectIncludes(
  'src/components/DropdownMenu/DropdownMenuContent.vue',
  'provide(menuDismissContextKey',
)
expectIncludes('src/components/DropdownMenu/DropdownMenuContent.vue', 'shadow-popper')
expectIncludes(
  'src/components/DropdownMenu/DropdownMenuContent.vue',
  'rounded-[var(--round-default)]',
)
expectIncludes('src/components/DropdownMenu/types.ts', 'DropdownMenuTriggerType')
expectIncludes('src/components/DropdownMenu/index.ts', 'DropdownMenuContent')
expectIncludes('src/components/index.ts', 'DropdownMenu')
expectIncludes('src/components/index.ts', 'DropdownMenuTrigger')
expectIncludes('src/components/index.ts', 'DropdownMenuContent')
expectNotIncludes('src/components/index.ts', 'DropdownItem')
expectNotIncludes('src/components/index.ts', 'DropdownDivider')
expectIncludes('docs/.vitepress/theme/index.ts', 'DropdownMenuTrigger')
expectIncludes('docs/.vitepress/theme/index.ts', 'DropdownMenuContent')
expectNotIncludes('docs/.vitepress/theme/index.ts', 'DropdownItem')
expectIncludes('docs/.vitepress/config.ts', '/components/dropdown-menu')
expectNotIncludes('docs/.vitepress/config.ts', "link: '/components/dropdown'")
expectIncludes('docs/components/dropdown-menu.md', 'Popover + Menu')
expectIncludes('docs/components/dropdown-menu.md', 'return-focus-on-close')
expectIncludes('docs/components/dropdown-menu.md', 'auto-update')
expectIncludes('docs/components/dropdown-menu.md', 'DropdownMenuTrigger')
expectIncludes('docs/components/dropdown-menu.md', 'DropdownMenuContent')
expectIncludes('docs/examples/dropdown-menu/example-01.vue', '<DropdownMenu')
expectIncludes('docs/examples/dropdown-menu/example-01.vue', '<Menu')
expectIncludes('docs/examples/dropdown-menu/example-01.vue', '<MenuItem')
expectIncludes('docs/examples/dropdown-menu/example-02.vue', '<MenuCheckboxItem')
expectIncludes('docs/examples/dropdown-menu/example-03.vue', '<MenuRadioGroup')
expectIncludes('docs/examples/dropdown-menu/example-04.vue', '<MenuSub')
expectIncludes('docs/examples/dropdown-menu/example-05.vue', 'v-model:open')
expectNotIncludes('docs/examples/dropdown-menu/example-01.vue', '<DropdownItem')
expectIncludes('package.json', 'check:dropdown-menu')
expectNotIncludes('package.json', 'check:dropdown"')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`DropdownMenu contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`DropdownMenu contract check passed: ${checks.length} checks`)
