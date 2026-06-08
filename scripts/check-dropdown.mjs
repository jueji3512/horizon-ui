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

expectFile('src/components/Dropdown/Dropdown.vue')
expectFile('src/components/Dropdown/DropdownItem.vue')
expectFile('src/components/Dropdown/DropdownGroup.vue')
expectFile('src/components/Dropdown/DropdownDivider.vue')
expectFile('src/components/Dropdown/context.ts')
expectFile('src/components/Dropdown/index.ts')
expectFile('src/components/Dropdown/types.ts')
expectFile('docs/components/dropdown.md')
expectFile('docs/examples/dropdown/example-01.vue')
expectFile('docs/examples/dropdown/example-02.vue')
expectFile('docs/examples/dropdown/example-03.vue')
expectFile('docs/examples/dropdown/example-04.vue')
expectFile('docs/examples/dropdown/example-05.vue')
expectFile('docs/examples/dropdown/example-06.vue')

expectIncludes('src/components/Dropdown/Dropdown.vue', 'Popper')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'PopperTrigger')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'PopperContent')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'ScrollArea')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'trigger="manual"')
expectIncludes('src/components/Dropdown/Dropdown.vue', ':visible="computedVisible"')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'slot name="trigger"')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'role="menu"')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'aria-activedescendant')
expectIncludes('src/components/Dropdown/Dropdown.vue', '@keydown="handleKeydown"')
expectIncludes('src/components/Dropdown/Dropdown.vue', ':disabled="disabled"')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'panelClass')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'maxHeight')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'maxWidth')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'closeOnOutsideClick')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'closeOnEsc')
expectIncludes(
  'src/components/Dropdown/Dropdown.vue',
  'if (!props.closeOnEsc) return',
  'Dropdown keydown Esc respects close-on-esc',
)
expectIncludes(
  'src/components/Dropdown/Dropdown.vue',
  ':close-on-outside-click="closeOnOutsideClick"',
)
expectIncludes('src/components/Dropdown/Dropdown.vue', ':close-on-esc="closeOnEsc"')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'shadow-popper')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'rounded-[var(--round-default)]')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'bg-[var(--bg-color-container)]')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'visible-change')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'select:')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'ArrowDown')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'Home')
expectIncludes('src/components/Dropdown/Dropdown.vue', 'End')
expectIncludes('src/components/Dropdown/DropdownItem.vue', 'role="menuitem"')
expectIncludes('src/components/Dropdown/DropdownItem.vue', 'registerItem')
expectIncludes('src/components/Dropdown/DropdownItem.vue', 'selectItem')
expectIncludes('src/components/Dropdown/DropdownGroup.vue', 'role="group"')
expectIncludes('src/components/Dropdown/DropdownDivider.vue', 'role="separator"')
expectIncludes('src/components/Dropdown/types.ts', 'DropdownTrigger')
expectIncludes('src/components/Dropdown/types.ts', 'DropdownPlacement')
expectIncludes('src/components/Dropdown/types.ts', 'DropdownValue')
expectIncludes('src/components/Dropdown/types.ts', 'DropdownItemTheme')
expectIncludes('src/components/Dropdown/index.ts', 'DropdownItem')
expectIncludes('src/components/Dropdown/index.ts', 'DropdownGroup')
expectIncludes('src/components/Dropdown/index.ts', 'DropdownDivider')
expectIncludes('src/components/Popper/Popper.vue', 'closeOnOutsideClick')
expectIncludes('src/components/Popper/Popper.vue', 'closeOnEsc')
expectIncludes('src/components/Popper/PopperContent.vue', 'closeOnOutsideClick')
expectIncludes('src/components/Popper/PopperContent.vue', 'closeOnEsc')
expectIncludes('src/components/Popper/index.ts', 'closeOnOutsideClick')
expectIncludes('src/components/Popper/index.ts', 'closeOnEsc')

expectNotIncludes('src/components/Dropdown/Dropdown.vue', 'items?:')
expectNotIncludes('src/components/Dropdown/Dropdown.vue', 'closeOnClick')
expectNotIncludes('src/components/Dropdown/Dropdown.vue', 'default` | arbitrary')

expectIncludes('src/components/index.ts', 'Dropdown')
expectIncludes('src/components/index.ts', 'DropdownItem')
expectIncludes('src/components/index.ts', 'DropdownGroup')
expectIncludes('src/components/index.ts', 'DropdownDivider')
expectIncludes('docs/.vitepress/theme/index.ts', 'Dropdown')
expectIncludes('docs/.vitepress/theme/index.ts', 'DropdownItem')
expectIncludes('docs/.vitepress/theme/index.ts', 'DropdownGroup')
expectIncludes('docs/.vitepress/theme/index.ts', 'DropdownDivider')
expectIncludes('docs/.vitepress/config.ts', '/components/dropdown')
expectIncludes('docs/components/dropdown.md', 'dropdown/example-01')
expectIncludes('docs/components/dropdown.md', 'dropdown/example-06')
expectIncludes('docs/components/dropdown.md', 'DropdownItem')
expectIncludes('docs/components/dropdown.md', 'DropdownGroup')
expectIncludes('docs/components/dropdown.md', 'DropdownDivider')
expectIncludes('docs/examples/dropdown/example-01.vue', '<DropdownItem value=')
expectIncludes('docs/examples/dropdown/example-02.vue', '<DropdownItem value=')
expectIncludes('docs/examples/dropdown/example-03.vue', '<DropdownGroup')
expectIncludes('docs/examples/dropdown/example-03.vue', '<DropdownDivider')
expectIncludes('docs/examples/dropdown/example-04.vue', 'trigger="hover"')
expectIncludes('docs/examples/dropdown/example-04.vue', 'trigger="manual"')
{
  const manualExample = read('docs/examples/dropdown/example-04.vue')
  checks.push({
    name: 'manual dropdown example uses explicit external open and close controls',
    pass:
      manualExample.includes('@click="visible = true"') &&
      manualExample.includes('@click="visible = false"'),
  })
  checks.push({
    name: 'manual dropdown example uses v-model with independent dismiss controls',
    pass:
      manualExample.includes('v-model:visible="visible"') &&
      manualExample.includes(':close-on-outside-click="false"') &&
      manualExample.includes(':close-on-esc="false"'),
  })
  checks.push({
    name: 'manual dropdown example does not use a visible toggle',
    pass: !/@click="(?:toggleManual|visible = !visible)"/.test(manualExample),
  })
  checks.push({
    name: 'manual dropdown trigger is a controlled anchor',
    pass: /<Dropdown[\s\S]*?v-model:visible="visible"[\s\S]*?trigger="manual"[\s\S]*?>[\s\S]*?<template #trigger>[\s\S]*手动菜单[\s\S]*?<\/template>/.test(
      manualExample,
    ),
  })
}
expectIncludes('docs/examples/dropdown/example-05.vue', 'match-width')
expectIncludes('docs/examples/dropdown/example-06.vue', 'max-height')
expectIncludes('docs/components/dropdown.md', 'close-on-outside-click')
expectIncludes('docs/components/dropdown.md', 'close-on-esc')
expectIncludes('package.json', 'check:dropdown')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Dropdown contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Dropdown contract check passed: ${checks.length} checks`)
