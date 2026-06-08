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

expectFile('src/components/Select/Select.vue')
expectFile('src/components/Select/SelectOption.vue')
expectFile('src/components/Select/SelectOptionGroup.vue')
expectFile('src/components/Select/context.ts')
expectFile('src/components/Select/index.ts')
expectFile('src/components/Select/types.ts')
expectFile('docs/components/select.md')
expectFile('docs/examples/select/example-01.vue')
expectFile('docs/examples/select/example-08.vue')

expectIncludes('src/components/Select/Select.vue', 'provide(selectContextKey')
expectIncludes('src/components/Select/Select.vue', '<slot />')
expectIncludes('src/components/Select/Select.vue', 'role="listbox"')
expectIncludes('src/components/Select/Select.vue', 'aria-activedescendant')
expectIncludes('src/components/Select/Select.vue', 'ScrollArea')
expectIncludes('src/components/Select/SelectOption.vue', 'role="option"')
expectIncludes('src/components/Select/SelectOption.vue', 'registerOption')
expectIncludes('src/components/Select/SelectOption.vue', 'selectOption')
expectIncludes('src/components/Select/SelectOptionGroup.vue', 'role="group"')
expectIncludes('src/components/Select/SelectOptionGroup.vue', 'selectOptionGroupContextKey')
expectIncludes('src/components/Select/index.ts', 'SelectOption')
expectIncludes('src/components/Select/index.ts', 'SelectOptionGroup')
expectIncludes('src/components/index.ts', 'SelectOption')
expectIncludes('src/components/index.ts', 'SelectOptionGroup')
expectIncludes('docs/.vitepress/theme/index.ts', 'SelectOption')
expectIncludes('docs/.vitepress/theme/index.ts', 'SelectOptionGroup')
expectIncludes('docs/examples/select/example-01.vue', '<SelectOption value=')
expectIncludes('docs/examples/select/example-08.vue', '<SelectOptionGroup')
expectIncludes('docs/components/select.md', 'SelectOption')
expectIncludes('docs/components/select.md', 'SelectOptionGroup')

expectNotIncludes('src/components/Select/Select.vue', 'options?:')
expectNotIncludes('src/components/Select/Select.vue', 'props.options')
expectNotIncludes('src/components/Select/Select.vue', 'SelectOptionList')
expectNotIncludes('src/components/Select/types.ts', 'children: SelectOptionItem[]')
expectNotIncludes('src/components/Select/index.ts', 'SelectOptionItem')
expectNotIncludes('src/components/index.ts', 'SelectOptionItem')
expectNotIncludes('docs/components/select.md', '`options`')
expectNotIncludes('docs/examples/select/example-01.vue', ':options=')
expectNotIncludes('docs/examples/select/example-02.vue', ':options=')
expectNotIncludes('docs/examples/select/example-03.vue', ':options=')
expectNotIncludes('docs/examples/select/example-04.vue', ':options=')
expectNotIncludes('docs/examples/select/example-05.vue', ':options=')
expectNotIncludes('docs/examples/select/example-06.vue', ':options=')
expectNotIncludes('docs/examples/select/example-07.vue', ':options=')
expectNotIncludes('docs/examples/select/example-08.vue', ':options=')
expectIncludes('package.json', 'check:select')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Select contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Select contract check passed: ${checks.length} checks`)
