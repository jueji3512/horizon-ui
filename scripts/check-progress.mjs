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

function expectMatches(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} matches ${pattern}`,
    pass: existsSync(filePath) && pattern.test(read(relativePath)),
  })
}

expectFile('src/components/Progress/Progress.vue')
expectFile('src/components/Progress/types.ts')
expectFile('src/components/Progress/index.ts')
expectFile('docs/components/progress.md')
expectFile('docs/examples/progress/example-01.vue')
expectFile('docs/examples/progress/example-02.vue')
expectFile('docs/examples/progress/example-03.vue')
expectFile('docs/examples/progress/example-04.vue')
expectFile('docs/examples/progress/example-05.vue')
expectFile('docs/examples/progress/example-06.vue')
expectFile('src/components/Icon/icons/circle-check-filled.svg')
expectFile('src/components/Icon/icons/circle-alert-filled.svg')
expectFile('src/components/Icon/icons/circle-close-filled.svg')

expectIncludes('src/components/Progress/types.ts', "ProgressVariant = 'line' | 'circle'")
expectIncludes(
  'src/components/Progress/types.ts',
  "ProgressTheme = 'brand' | 'success' | 'warning' | 'error'",
)
expectIncludes('src/components/Progress/types.ts', "ProgressSize = 'sm' | 'md' | 'lg' | number")

expectIncludes('src/components/Progress/Progress.vue', "variant: 'line'")
expectIncludes('src/components/Progress/Progress.vue', "theme: 'brand'")
expectIncludes('src/components/Progress/Progress.vue', 'percent: 0')
expectIncludes('src/components/Progress/Progress.vue', 'active: true')
expectIncludes('src/components/Progress/Progress.vue', 'withDefaults')
expectIncludes('src/components/Progress/Progress.vue', 'useSlots')
expectIncludes('src/components/Progress/Progress.vue', 'slots.label')
expectIncludes('src/components/Progress/Progress.vue', 'showLabel: undefined')
expectIncludes('src/components/Progress/Progress.vue', 'clampPercent')
expectIncludes('src/components/Progress/Progress.vue', 'roundedPercent')
expectIncludes('src/components/Progress/Progress.vue', 'showLabel')
expectIncludes('src/components/Progress/Progress.vue', 'ariaLabel')
expectIncludes('src/components/Progress/Progress.vue', 'role="progressbar"')
expectIncludes('src/components/Progress/Progress.vue', 'aria-valuemin="0"')
expectIncludes('src/components/Progress/Progress.vue', 'aria-valuemax="100"')
expectIncludes('src/components/Progress/Progress.vue', ':aria-valuenow="roundedPercent"')
expectIncludes('src/components/Progress/Progress.vue', 'progressGeometryMap')
expectIncludes('src/components/Progress/Progress.vue', 'circleSizeMap')
expectIncludes('src/components/Progress/Progress.vue', 'lineHeightMap')
expectIncludes('src/components/Progress/Progress.vue', 'circleStrokeMap')
expectIncludes('src/components/Progress/Progress.vue', 'isCustomCircleSize')
expectIncludes('src/components/Progress/Progress.vue', 'stroke-dashoffset')
expectIncludes('src/components/Progress/Progress.vue', 'h-progress-flow')
expectIncludes('src/components/Progress/Progress.vue', 'h-progress-flow-sweep')
expectIncludes('src/components/Progress/Progress.vue', 'isCircleFlowing')
expectIncludes('src/components/Progress/Progress.vue', 'h-progress-circle-flow')
expectIncludes('src/components/Progress/Progress.vue', 'h-progress-circle-flow-sweep')
expectIncludes('src/components/Progress/Progress.vue', '<linearGradient')
expectIncludes('src/components/Progress/Progress.vue', 'gradientUnits="userSpaceOnUse"')
expectIncludes('src/components/Progress/Progress.vue', '<animateTransform')
expectIncludes('src/components/Progress/Progress.vue', 'attributeName="gradientTransform"')
expectIncludes('src/components/Progress/Progress.vue', 'type="translate"')
expectIncludes('src/components/Progress/Progress.vue', 'repeatCount="indefinite"')
expectIncludes('src/components/Progress/Progress.vue', 'circleFlowGradientFrom')
expectIncludes('src/components/Progress/Progress.vue', 'circleFlowGradientTo')
expectMatches(
  'src/components/Progress/Progress.vue',
  /circleFlowGradientFrom = computed\(\(\) => `\$\{circleSize\.value\} 0`\)/,
  'Progress circle flow should start from the progress origin',
)
expectMatches(
  'src/components/Progress/Progress.vue',
  /circleFlowGradientTo = computed\(\(\) => `\$\{-circleSize\.value\} 0`\)/,
  'Progress circle flow should move toward the progress endpoint',
)
expectIncludes('src/components/Progress/Progress.vue', 'circleFlowGradientUrl')
expectIncludes('src/components/Progress/Progress.vue', ':stroke="circleFlowGradientUrl"')
expectNotIncludes('src/components/Progress/Progress.vue', '<mask')
expectNotIncludes('src/components/Progress/Progress.vue', '<rect')
expectNotIncludes('src/components/Progress/Progress.vue', 'circleFlowMaskUrl')
expectNotIncludes('src/components/Progress/Progress.vue', '--h-progress-circle-flow-distance')
expectNotIncludes('src/components/Progress/Progress.vue', 'transform: rotate(360deg)')
expectNotIncludes('src/components/Progress/Progress.vue', "stroke: 'rgb(255 255 255 / 62%)'")
expectIncludes('src/components/Progress/Progress.vue', 'props.percent >= 100')
expectIncludes('src/components/Progress/Progress.vue', "resolvedTheme.value === 'brand'")
expectIncludes('src/components/Progress/Progress.vue', 'props.color')
expectIncludes('src/components/Progress/Progress.vue', 'bg-[var(--bg-color-component)]')
expectNotIncludes('src/components/Progress/Progress.vue', 'class="bg-component')
expectIncludes('src/components/Progress/Progress.vue', "trackColor: 'var(--bg-color-component)'")
expectIncludes('src/components/Progress/Progress.vue', 'shouldShowStatusIcon')
expectIncludes('src/components/Progress/Progress.vue', 'statusIconName')
expectIncludes('src/components/Progress/Progress.vue', 'statusIconClasses')
expectIncludes('src/components/Progress/Progress.vue', 'circleLabelTypographyClass')
expectIncludes('src/components/Progress/Progress.vue', "sm: 'font-body-sm'")
expectIncludes('src/components/Progress/Progress.vue', "md: 'font-body-md'")
expectIncludes('src/components/Progress/Progress.vue', "lg: 'font-body-lg'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'info'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-check-filled'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-alert-filled'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-close-filled'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'info-plain'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'check'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'alert'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'close'")
expectIncludes(
  'src/components/Progress/Progress.vue',
  "resolvedVariant.value === 'circle' ? 'text-2xl' : 'text-sm'",
)
expectNotIncludes('src/components/Progress/Progress.vue', 'indeterminate')
expectNotIncludes('src/components/Progress/types.ts', 'indeterminate')
expectNotIncludes('src/components/Progress/Progress.vue', 'successPercent')
expectNotIncludes('src/components/Progress/Progress.vue', 'buffer')
expectNotIncludes('src/components/Progress/Progress.vue', 'steps')

expectIncludes('src/components/Progress/index.ts', 'Progress')
expectIncludes('src/components/Progress/index.ts', 'ProgressVariant')
expectIncludes('src/components/index.ts', "from './Progress'")
expectIncludes('src/components/index.ts', 'Progress,')
expectIncludes('docs/.vitepress/theme/index.ts', 'Progress')
expectIncludes('docs/.vitepress/config.ts', '/components/progress')
expectIncludes('package.json', 'check:progress')

expectIncludes('docs/components/progress.md', 'Progress')
expectIncludes('docs/components/progress.md', 'variant="circle"')
expectIncludes('docs/components/progress.md', ':size="120"')
expectNotIncludes('docs/components/progress.md', 'progress/example-07')
expectNotIncludes('docs/components/progress.md', '## 环形状态')
expectIncludes('docs/components/progress.md', 'active')
expectIncludes('docs/components/progress.md', '线性和环形')
expectIncludes('docs/components/progress.md', '从起点')
expectIncludes('docs/components/progress.md', 'color')
expectIncludes('docs/components/progress.md', '#label')
expectIncludes('docs/components/progress.md', '环形中心标签')
expectNotIncludes('docs/components/progress.md', 'indeterminate')
expectFile('src/components/Icon/icons/info-plain.svg')
expectFile('src/components/Icon/icons/alert.svg')

for (const example of [
  'docs/examples/progress/example-01.vue',
  'docs/examples/progress/example-02.vue',
  'docs/examples/progress/example-03.vue',
  'docs/examples/progress/example-04.vue',
  'docs/examples/progress/example-05.vue',
  'docs/examples/progress/example-06.vue',
]) {
  expectIncludes(example, 'Progress', `${example} should use Progress`)
  expectNotIncludes(example, 'indeterminate', `${example} must not use indeterminate`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
}

expectMatches(
  'docs/examples/progress/example-04.vue',
  /<Progress[\s\S]*color=/,
  'Progress docs should cover custom color',
)
expectMatches(
  'docs/examples/progress/example-04.vue',
  /<template #label/,
  'Progress docs should cover custom label slot',
)
expectMatches(
  'docs/examples/progress/example-05.vue',
  /<Progress[\s\S]*:size="120"/,
  'Progress docs should cover numeric circle size',
)
expectMatches(
  'docs/examples/progress/example-06.vue',
  /<Progress[\s\S]*:percent="-20"[\s\S]*<Progress[\s\S]*:percent="132"/,
  'Progress docs should cover percent boundaries',
)
expectMatches(
  'docs/examples/progress/example-06.vue',
  /variant="circle"[\s\S]*:active="false"/,
  'Progress docs should cover disabling circle active motion',
)
expectMatches(
  'docs/examples/progress/example-02.vue',
  /variant="circle"[\s\S]*theme="success"[\s\S]*variant="circle"[\s\S]*theme="warning"[\s\S]*variant="circle"[\s\S]*theme="error"/,
  'Progress docs should cover circle status themes',
)
expectMatches(
  'docs/examples/progress/example-02.vue',
  /variant="circle"[\s\S]*<template #label/,
  'Progress docs should cover circle custom label slot',
)
expectMatches(
  'docs/examples/progress/example-02.vue',
  /variant="circle"[\s\S]*color=/,
  'Progress docs should cover circle custom color',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Progress contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Progress contract check passed: ${checks.length} checks`)
