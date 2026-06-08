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

expectFile('src/components/Menu/Menu.vue')
expectFile('src/components/Menu/MenuItemBase.vue')
expectFile('src/components/Menu/MenuItem.vue')
expectFile('src/components/Menu/MenuCheckboxItem.vue')
expectFile('src/components/Menu/MenuRadioGroup.vue')
expectFile('src/components/Menu/MenuRadioItem.vue')
expectFile('src/components/Menu/MenuSub.vue')
expectFile('src/components/Menu/MenuSubTrigger.vue')
expectFile('src/components/Menu/MenuSubContent.vue')
expectFile('src/components/Menu/MenuGroup.vue')
expectFile('src/components/Menu/MenuLabel.vue')
expectFile('src/components/Menu/MenuSeparator.vue')
expectFile('src/components/Menu/context.ts')
expectFile('src/components/Menu/types.ts')
expectFile('src/components/Menu/index.ts')
expectFile('docs/components/menu.md')
expectFile('docs/examples/menu/example-01.vue')
expectFile('docs/examples/menu/example-05.vue')

expectIncludes('src/components/Menu/Menu.vue', 'role="menu"')
expectIncludes('src/components/Menu/Menu.vue', 'aria-activedescendant')
expectIncludes('src/components/Menu/Menu.vue', 'provide(menuContextKey')
expectIncludes('src/components/Menu/Menu.vue', 'ArrowDown')
expectIncludes('src/components/Menu/Menu.vue', 'ArrowUp')
expectIncludes('src/components/Menu/Menu.vue', 'Home')
expectIncludes('src/components/Menu/Menu.vue', 'End')
expectIncludes('src/components/Menu/Menu.vue', 'typeaheadBuffer')
expectIncludes('src/components/Menu/Menu.vue', 'requestClose')
expectIncludes('src/components/Menu/Menu.vue', 'const orderedItems = computed')
expectIncludes('src/components/Menu/Menu.vue', 'next.set(item.key, item)')
expectIncludes('src/components/Menu/Menu.vue', 'scrollArea.scrollToElement')
expectNotIncludes('src/components/Menu/Menu.vue', 'scrollIntoView')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'roleValue')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'menuitemcheckbox')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'menuitemradio')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'indicator')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'closeOnSelect')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'openSubmenu')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'setSubmenuTriggerElement')
expectIncludes('src/components/Menu/MenuItemBase.vue', 'registerItem')
expectIncludes('src/components/Menu/MenuItem.vue', 'kind="item"')
expectIncludes('src/components/Menu/MenuCheckboxItem.vue', 'kind="checkbox"')
expectIncludes('src/components/Menu/MenuCheckboxItem.vue', "'update:checked'")
expectIncludes('src/components/Menu/MenuRadioGroup.vue', 'provide(menuRadioGroupContextKey')
expectIncludes('src/components/Menu/MenuRadioItem.vue', 'kind="radio"')
expectIncludes('src/components/Menu/MenuSub.vue', 'Popover')
expectIncludes('src/components/Menu/MenuSub.vue', ':offset="-2"')
expectIncludes('src/components/Menu/MenuSub.vue', 'clearTimers')
expectIncludes('src/components/Menu/MenuSub.vue', 'setTriggerElement')
expectIncludes('src/components/Menu/MenuSubTrigger.vue', 'MenuItemBase')
expectIncludes('src/components/Menu/MenuSubTrigger.vue', 'chevron-right')
expectIncludes('src/components/Menu/MenuSubTrigger.vue', ':open-submenu')
expectIncludes('src/components/Menu/MenuSubTrigger.vue', '@mouseleave')
expectIncludes('src/components/Menu/MenuSubContent.vue', 'PopoverContent')
expectIncludes('src/components/Menu/MenuSubContent.vue', '@mouseleave')
expectIncludes('src/components/Menu/MenuGroup.vue', 'role="group"')
expectIncludes('src/components/Menu/MenuLabel.vue', 'role="presentation"')
expectIncludes('src/components/Menu/MenuSeparator.vue', 'role="separator"')
expectIncludes(
  'src/components/Menu/types.ts',
  "MenuItemKind = 'item' | 'checkbox' | 'radio' | 'subtrigger'",
)
expectIncludes('src/components/Menu/index.ts', 'MenuCheckboxItem')
expectIncludes('src/components/Menu/index.ts', 'MenuRadioGroup')
expectIncludes('src/components/Menu/index.ts', 'MenuSubContent')
expectIncludes('src/components/index.ts', 'MenuCheckboxItem')
expectIncludes('src/components/index.ts', 'MenuRadioItem')
expectIncludes('docs/.vitepress/theme/index.ts', 'MenuSubContent')
expectIncludes('docs/.vitepress/config.ts', '/components/menu')
expectIncludes('docs/components/menu.md', 'MenuCheckboxItem')
expectIncludes('docs/components/menu.md', 'MenuRadioGroup')
expectIncludes('docs/components/menu.md', 'MenuSub')
expectIncludes('docs/examples/menu/example-01.vue', '<MenuItem value=')
expectIncludes('docs/examples/menu/example-02.vue', '<MenuCheckboxItem')
expectIncludes('docs/examples/menu/example-03.vue', '<MenuRadioGroup')
expectIncludes('docs/examples/menu/example-04.vue', '<MenuSub')
expectIncludes('docs/examples/menu/example-05.vue', 'close-on-select')
expectNotIncludes('src/components/Menu/Menu.vue', 'selectedKeys')
expectNotIncludes('src/components/Menu/MenuCheckboxItem.vue', '../Checkbox')
expectNotIncludes('src/components/Menu/MenuRadioItem.vue', '../Radio')
expectIncludes('package.json', 'check:menu')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Menu contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Menu contract check passed: ${checks.length} checks`)
