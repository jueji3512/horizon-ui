import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const checks = []

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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

function expectDeclaration(relativePath, selector, declaration, label) {
  const filePath = join(root, relativePath)
  const source = existsSync(filePath) ? read(relativePath) : ''
  const block = new RegExp(`${escapeRegExp(selector)}\\s*\\{(?<body>[\\s\\S]*?)\\}`).exec(source)

  checks.push({
    name: label ?? `${selector} includes ${declaration}`,
    pass: Boolean(block?.groups?.body.includes(declaration)),
  })
}

expectFile('docs/.vitepress/theme/components/ComponentDemo.vue')
expectFile('docs/.vitepress/plugins/demo.ts')

expectIncludes(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.vp-code code)',
  'ComponentDemo scopes Shiki code element',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.vp-code code)',
  'white-space: normal;',
  'Shiki code ignores formatter newline text nodes',
)
expectIncludes(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.line)',
  'ComponentDemo styles Shiki line spans',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.line)',
  'display: block;',
  'Shiki line spans render as block rows',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.line)',
  'white-space: pre;',
  'Shiki line spans preserve source indentation',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-code-scroll :deep(.line)',
  'line-height: 20px;',
  'Shiki line spans use the source row height',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-lines li',
  'height: 20px;',
  'Line number rows use the source row height',
)
expectDeclaration(
  'docs/.vitepress/theme/components/ComponentDemo.vue',
  '.component-demo-lines li',
  'line-height: 20px;',
  'Line numbers align to source row height',
)
expectIncludes(
  'package.json',
  '"check:component-demo": "node scripts/check-component-demo.mjs"',
  'package.json exposes check:component-demo',
)
expectIncludes(
  'package.json',
  'npm run check:component-demo',
  'npm run check includes ComponentDemo contract check',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`ComponentDemo contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`ComponentDemo contract check passed: ${checks.length} checks`)
