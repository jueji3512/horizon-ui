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
expectFile('docs/examples/progress/example-07.vue')
expectFile('src/components/Icon/icons/circle-check-filled.svg')
expectFile('src/components/Icon/icons/circle-alert-filled.svg')
expectFile('src/components/Icon/icons/circle-close-filled.svg')

expectIncludes('src/components/Progress/types.ts', "ProgressVariant = 'line' | 'circle'")
expectIncludes(
  'src/components/Progress/types.ts',
  "ProgressStatus = 'success' | 'warning' | 'error'",
)
expectNotIncludes('src/components/Progress/types.ts', 'ProgressTheme')
expectNotIncludes('src/components/Progress/types.ts', "'brand' | 'success' | 'warning' | 'error'")
expectIncludes('src/components/Progress/types.ts', "ProgressPresetSize = 'sm' | 'md' | 'lg'")
expectIncludes('src/components/Progress/types.ts', 'ProgressSizeConfig')
expectIncludes('src/components/Progress/types.ts', 'thickness?: number')
expectIncludes('src/components/Progress/types.ts', 'labelSize?: number')
expectIncludes('src/components/Progress/types.ts', 'diameter?: number')
expectIncludes(
  'src/components/Progress/types.ts',
  'ProgressSize = ProgressPresetSize | ProgressSizeConfig',
)
expectNotIncludes('src/components/Progress/types.ts', '| number')

expectIncludes('src/components/Progress/Progress.vue', "variant: 'line'")
expectNotIncludes('src/components/Progress/Progress.vue', "theme: 'brand'")
expectIncludes('src/components/Progress/Progress.vue', 'ProgressStatus')
expectIncludes('src/components/Progress/Progress.vue', 'statusVisualClassMap')
expectIncludes('src/components/Progress/Progress.vue', 'resolvedStatus')
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
expectIncludes('src/components/Progress/Progress.vue', 'labelSizeMap')
expectIncludes('src/components/Progress/Progress.vue', 'resolveProgressSizeConfig')
expectIncludes('src/components/Progress/Progress.vue', 'normalizedSizeConfig')
expectIncludes('src/components/Progress/Progress.vue', 'props.size.thickness')
expectIncludes('src/components/Progress/Progress.vue', 'props.size.labelSize')
expectIncludes('src/components/Progress/Progress.vue', 'props.size.diameter')
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
expectIncludes('src/components/Progress/Progress.vue', '!resolvedStatus.value')
expectIncludes('src/components/Progress/Progress.vue', 'props.color')
expectIncludes('src/components/Progress/Progress.vue', 'bg-[var(--bg-color-component)]')
expectNotIncludes('src/components/Progress/Progress.vue', 'class="bg-component')
expectIncludes('src/components/Progress/Progress.vue', "trackColor: 'var(--bg-color-component)'")
expectIncludes('src/components/Progress/Progress.vue', 'shouldShowStatusIcon')
expectIncludes('src/components/Progress/Progress.vue', 'statusIconName')
expectIncludes('src/components/Progress/Progress.vue', 'statusIconClasses')
expectIncludes('src/components/Progress/Progress.vue', 'metaStyle')
expectIncludes('src/components/Progress/Progress.vue', 'fontSize: `${labelSize.value}px`')
expectIncludes(
  'src/components/Progress/Progress.vue',
  "resolvedVariant.value === 'circle' ? 'text-[2.4em]' : 'text-[1em]'",
)
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'info'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-check-filled'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-alert-filled'")
expectIncludes('src/components/Progress/Progress.vue', "lineIcon: 'circle-close-filled'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'info-plain'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'check'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'alert'")
expectIncludes('src/components/Progress/Progress.vue', "circleIcon: 'close'")
expectNotIncludes('src/components/Progress/Progress.vue', 'indeterminate')
expectNotIncludes('src/components/Progress/types.ts', 'indeterminate')
expectNotIncludes('src/components/Progress/Progress.vue', 'successPercent')
expectNotIncludes('src/components/Progress/Progress.vue', 'buffer')
expectNotIncludes('src/components/Progress/Progress.vue', 'steps')
expectNotIncludes('src/components/Progress/Progress.vue', 'typeof resolvedSize.value ===')
expectNotIncludes('src/components/Progress/Progress.vue', 'font-body-lg')

expectIncludes('src/components/Progress/index.ts', 'Progress')
expectIncludes('src/components/Progress/index.ts', 'ProgressVariant')
expectIncludes('src/components/Progress/index.ts', 'ProgressStatus')
expectNotIncludes('src/components/Progress/index.ts', 'ProgressTheme')
expectIncludes('src/components/index.ts', "from './Progress'")
expectIncludes('src/components/index.ts', 'Progress,')
expectIncludes('src/components/index.ts', 'ProgressStatus')
expectNotIncludes('src/components/index.ts', 'ProgressTheme')
expectIncludes('docs/.vitepress/theme/index.ts', 'Progress')
expectIncludes('docs/.vitepress/config.ts', '/components/progress')
expectIncludes('package.json', 'check:progress')

expectIncludes('docs/components/progress.md', 'Progress')
expectIncludes('docs/components/progress.md', '## 结果状态')
expectIncludes('docs/components/progress.md', 'variant="circle"')
expectIncludes('docs/components/progress.md', 'status="success"')
expectIncludes('docs/components/progress.md', "'success' \\| 'warning' \\| 'error'")
expectNotIncludes('docs/components/progress.md', 'theme')
expectNotIncludes('docs/components/progress.md', 'brand"')
expectIncludes('docs/components/progress.md', ':size="{ diameter: 120 }"')
expectIncludes('docs/components/progress.md', 'thickness')
expectIncludes('docs/components/progress.md', 'labelSize')
expectIncludes('docs/components/progress.md', 'diameter')
expectIncludes('docs/components/progress.md', '## 动态更新')
expectIncludes('docs/components/progress.md', 'progress/example-07')
expectNotIncludes('docs/components/progress.md', '## 环形状态')
expectIncludes('docs/components/progress.md', 'active')
expectIncludes('docs/components/progress.md', '线性和环形')
expectIncludes('docs/components/progress.md', '从起点')
expectIncludes('docs/components/progress.md', 'color')
expectIncludes('docs/components/progress.md', '#label')
expectIncludes('docs/components/progress.md', '状态图标基于同一字号缩放')
expectNotIncludes('docs/components/progress.md', ':size="120"')
expectNotIncludes('docs/components/progress.md', "'sm' \\| 'md' \\| 'lg' \\| number")
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
  'docs/examples/progress/example-07.vue',
]) {
  expectIncludes(example, 'Progress', `${example} should use Progress`)
  expectNotIncludes(example, 'indeterminate', `${example} must not use indeterminate`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
  expectNotIncludes(example, '<Progress theme=', `${example} must not use Progress theme API`)
  expectNotIncludes(example, '<Progress :theme=', `${example} must not use Progress theme API`)
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
  /<Progress[\s\S]*:size="\{ diameter: 120 \}"/,
  'Progress docs should cover object circle diameter size',
)
expectMatches(
  'docs/examples/progress/example-05.vue',
  /<Progress[\s\S]*:size="\{ thickness: 10, labelSize: 16 \}"/,
  'Progress docs should cover object line thickness and label size',
)
expectMatches(
  'docs/examples/progress/example-05.vue',
  /<Progress[\s\S]*:size="\{ diameter: 144, thickness: 8, labelSize: 18 \}"/,
  'Progress docs should cover object circle diameter, thickness and label size',
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
  /variant="circle"[\s\S]*status="success"[\s\S]*variant="circle"[\s\S]*status="warning"[\s\S]*variant="circle"[\s\S]*status="error"/,
  'Progress docs should cover circle status states',
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
expectIncludes(
  'docs/examples/progress/example-07.vue',
  'setInterval',
  'Progress dynamic demo should update percent over time',
)
expectIncludes(
  'docs/examples/progress/example-07.vue',
  'onUnmounted',
  'Progress dynamic demo should clear its timer on unmount',
)
expectIncludes(
  'docs/examples/progress/example-07.vue',
  'toggleRunning',
  'Progress dynamic demo should support pausing and resuming',
)
expectIncludes(
  'docs/examples/progress/example-07.vue',
  'resetProgress',
  'Progress dynamic demo should support reset',
)
expectMatches(
  'docs/examples/progress/example-07.vue',
  /<Progress[\s\S]*:percent="percent"[\s\S]*<Progress[\s\S]*variant="circle"[\s\S]*:percent="percent"/,
  'Progress dynamic demo should show line and circle with the same percent',
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
