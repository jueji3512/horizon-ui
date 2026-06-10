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

expectFile('src/components/InputNumber/InputNumber.vue')
expectFile('src/components/InputNumber/index.ts')
expectFile('docs/components/inputnumber.md')
expectFile('docs/examples/inputnumber/example-09.vue')

expectIncludes(
  'src/components/InputNumber/InputNumber.vue',
  'if (effectiveDisabled.value || effectiveReadonly.value) return',
)
expectIncludes('src/components/InputNumber/InputNumber.vue', ':readonly="effectiveReadonly"')
expectIncludes('src/components/InputNumber/InputNumber.vue', ':disabled="effectiveDisabled"')
expectIncludes(
  'src/components/InputNumber/InputNumber.vue',
  ':disabled="effectiveDisabled || (!effectiveReadonly && isMinReached) || undefined"',
)
expectIncludes(
  'src/components/InputNumber/InputNumber.vue',
  ':disabled="effectiveDisabled || (!effectiveReadonly && isMaxReached) || undefined"',
)
expectNotIncludes(
  'src/components/InputNumber/InputNumber.vue',
  'isMinReached || disabled || readonly',
  'InputNumber readonly must not force decrement button disabled visual',
)
expectNotIncludes(
  'src/components/InputNumber/InputNumber.vue',
  'isMaxReached || disabled || readonly',
  'InputNumber readonly must not force increment button disabled visual',
)
expectIncludes('package.json', 'check:input-number')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`InputNumber contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`InputNumber contract check passed: ${checks.length} checks`)
