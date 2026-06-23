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

expectFile('src/components/TimePanel/TimePanel.vue')
expectFile('src/components/TimePanel/types.ts')
expectFile('src/components/TimePanel/index.ts')
expectFile('docs/components/time-panel.md')
expectFile('docs/examples/time-panel/example-01.vue')
expectFile('docs/examples/time-panel/example-02.vue')
expectFile('docs/examples/time-panel/example-03.vue')
expectFile('docs/examples/time-panel/example-04.vue')

expectIncludes(
  'src/components/TimePanel/types.ts',
  "TimePanelUnit = 'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem'",
)
expectIncludes('src/components/TimePanel/types.ts', "TimePanelMeridiem = 'AM' | 'PM'")
expectIncludes(
  'src/components/TimePanel/types.ts',
  'TimePanelSteps = [number, number, number, number]',
)
expectIncludes('src/components/TimePanel/types.ts', "'HH:mm:ss:SSS'")
expectIncludes('src/components/TimePanel/types.ts', "'hh:mm:ss:SSS A'")
expectIncludes('src/components/TimePanel/types.ts', 'TimePanelDisabledTime')
expectIncludes('src/components/TimePanel/types.ts', 'TimePanelDisabledTimeContext')
expectIncludes('src/components/TimePanel/types.ts', 'TimePanelProps')
expectIncludes('src/components/TimePanel/types.ts', 'TimePanelExpose')
expectIncludes(
  'src/components/TimePanel/types.ts',
  "TimePanelScrollBehavior = 'auto' | 'smooth' | 'instant'",
)
expectIncludes('src/components/TimePanel/types.ts', 'focus: () => void')
expectIncludes(
  'src/components/TimePanel/types.ts',
  'scrollToActive: (behavior?: TimePanelScrollBehavior) => void',
)
expectIncludes('src/components/TimePanel/types.ts', 'getValue: () => string | null')
expectIncludes('src/components/TimePanel/types.ts', 'getParts: () => TimePanelValueParts | null')
expectIncludes(
  'src/components/TimePanel/types.ts',
  'setValue: (value: string | null) => string | null',
)
expectIncludes('src/components/TimePanel/types.ts', 'setNow: () => string')
expectIncludes('src/components/TimePanel/types.ts', 'clear: () => null')
expectNotIncludes('src/components/TimePanel/types.ts', 'Date')
expectNotIncludes('src/components/TimePanel/types.ts', 'confirmable?: boolean')
expectNotIncludes('src/components/TimePanel/types.ts', 'showNow?: boolean')
expectNotIncludes('src/components/TimePanel/types.ts', 'clearable?: boolean')

expectIncludes('src/components/TimePanel/TimePanel.vue', 'modelValue?: string | null')
expectIncludes('src/components/TimePanel/TimePanel.vue', "format: 'HH:mm'")
expectIncludes('src/components/TimePanel/TimePanel.vue', 'steps: () => [1, 1, 1, 1]')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'disabledTime?: TimePanelDisabledTime')
expectIncludes('src/components/TimePanel/TimePanel.vue', "'update:modelValue'")
expectIncludes('src/components/TimePanel/TimePanel.vue', 'change:')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'timePanelFormatConfigs')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'parseTimeValue')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'formatTimeParts')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'normalizeSteps')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'disabledTime?.')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'commitValue')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'defineExpose<TimePanelExpose>')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'focusPanel')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'scrollToActive')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'getValue')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'getParts')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'setValue')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'setNow')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'clearValue')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'handleKeydown')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'ScrollArea')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'scrollbar-visibility="hidden"')
expectNotIncludes(
  'src/components/TimePanel/TimePanel.vue',
  'scrollbar-visibility="auto"',
  'TimePanel columns should keep scrolling visually quiet',
)
expectIncludes('src/components/TimePanel/TimePanel.vue', 'scrollToElement')
expectIncludes('src/components/TimePanel/TimePanel.vue', ':max-height="timePanelViewportHeight"')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'timePanelVisibleOptionCount = 7')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'timePanelOptionGap = 4')
expectIncludes(
  'src/components/TimePanel/TimePanel.vue',
  'timePanelOptionHeight * timePanelVisibleOptionCount',
)
expectIncludes(
  'src/components/TimePanel/TimePanel.vue',
  'timePanelOptionGap * (timePanelVisibleOptionCount - 1)',
)
expectIncludes('src/components/TimePanel/TimePanel.vue', 'timePanelOptionCenterPadding')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'optionListStyle')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'paddingBlock')
expectNotIncludes(
  'src/components/TimePanel/TimePanel.vue',
  'font-body-sm px-2 pb-1 text-center',
  'TimePanel should not render visual column headings',
)
expectNotIncludes(
  'src/components/TimePanel/TimePanel.vue',
  '{{ column.label }}',
  'TimePanel should keep column labels ARIA-only',
)
expectNotIncludes(
  'src/components/TimePanel/TimePanel.vue',
  'max-height="176px"',
  'TimePanel should show seven options instead of the previous compact viewport',
)
expectIncludes('src/components/TimePanel/TimePanel.vue', 'role="group"')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'role="listbox"')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'role="option"')
expectIncludes('src/components/TimePanel/TimePanel.vue', ':aria-selected=')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'shadow-popper')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'rounded-[var(--round-default)]')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'bg-brand')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'bg-brand-light')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'cursor-pointer')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'cursor-not-allowed')
expectIncludes('src/components/TimePanel/TimePanel.vue', 'text-[var(--text-color-disabled)]')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'new Date(')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'confirmable')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'showNow')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'clearable')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'handleConfirm')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'handleCancel')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'handleClear')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'handleNow')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'showFooter')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'OK')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'Cancel')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'dayjs')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'date-fns')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'wheel')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'TimePicker')
expectNotIncludes('src/components/TimePanel/TimePanel.vue', 'DatePicker')

expectIncludes('src/components/TimePanel/index.ts', 'TimePanel')
expectIncludes('src/components/TimePanel/index.ts', 'TimePanelFormat')
expectIncludes('src/components/TimePanel/index.ts', 'TimePanelSteps')
expectIncludes('src/components/TimePanel/index.ts', 'TimePanelDisabledTime')
expectIncludes('src/components/TimePanel/index.ts', 'TimePanelExpose')
expectIncludes('src/components/TimePanel/index.ts', 'TimePanelScrollBehavior')
expectIncludes('src/components/index.ts', "import TimePanel from './TimePanel/TimePanel.vue'")
expectIncludes('src/components/index.ts', 'TimePanel,')
expectIncludes('src/components/index.ts', 'TimePanelFormat')
expectIncludes('src/components/index.ts', 'TimePanelSteps')
expectIncludes('src/components/index.ts', 'TimePanelDisabledTime')
expectIncludes('src/components/index.ts', 'TimePanelExpose')
expectIncludes('src/components/index.ts', 'TimePanelScrollBehavior')

expectIncludes('docs/.vitepress/theme/index.ts', 'TimePanel')
expectIncludes('docs/.vitepress/theme/index.ts', "app.component('TimePanel', TimePanel)")
expectIncludes('docs/.vitepress/config.ts', '/components/time-panel')
expectIncludes('package.json', 'check:time-panel')
expectMatches(
  'package.json',
  /check:scroll-area && npm run check:time-panel && npm run check:popper/,
  'npm run check should include check:time-panel after check:scroll-area',
)

expectIncludes('docs/components/time-panel.md', 'TimePanel')
expectIncludes('docs/components/time-panel.md', '`format`')
expectIncludes('docs/components/time-panel.md', '`HH:mm:ss:SSS`')
expectIncludes('docs/components/time-panel.md', '`hh:mm:ss:SSS A`')
expectIncludes('docs/components/time-panel.md', '`steps`')
expectIncludes('docs/components/time-panel.md', '`[1, 1, 1, 1]`')
expectIncludes('docs/components/time-panel.md', '`disabledTime`')
expectIncludes('docs/components/time-panel.md', 'Expose')
expectIncludes('docs/components/time-panel.md', '`setNow()`')
expectIncludes('docs/components/time-panel.md', '`clear()`')
expectIncludes('docs/components/time-panel.md', '`getValue()`')
expectNotIncludes('docs/components/time-panel.md', '`confirmable`')
expectNotIncludes('docs/components/time-panel.md', '`showNow`')
expectNotIncludes('docs/components/time-panel.md', '`clearable`')
expectIncludes('docs/components/time-panel.md', '不处理日期')
expectIncludes('docs/components/time-panel.md', 'time-panel/example-04')
expectNotIncludes('docs/components/time-panel.md', 'DatePicker')
expectNotIncludes('docs/components/time-panel.md', 'TimePicker')

for (const example of [
  'docs/examples/time-panel/example-01.vue',
  'docs/examples/time-panel/example-02.vue',
  'docs/examples/time-panel/example-03.vue',
  'docs/examples/time-panel/example-04.vue',
]) {
  expectIncludes(example, 'TimePanel', `${example} should use TimePanel`)
  expectNotIncludes(example, '<TimePicker', `${example} must not use TimePicker`)
  expectNotIncludes(example, '<DatePicker', `${example} must not use DatePicker`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
  expectNotIncludes(example, 'confirmable', `${example} must not use TimePanel confirmable`)
  expectNotIncludes(example, 'show-now', `${example} must not use TimePanel showNow`)
  expectNotIncludes(example, 'clearable', `${example} must not use TimePanel clearable`)
}

expectIncludes(
  'docs/examples/time-panel/example-02.vue',
  'HH:mm:ss:SSS',
  'TimePanel docs should cover millisecond format',
)
expectIncludes(
  'docs/examples/time-panel/example-02.vue',
  ':steps="[1, 15, 5, 100]"',
  'TimePanel docs should cover four-item steps',
)
expectIncludes(
  'docs/examples/time-panel/example-03.vue',
  'hh:mm A',
  'TimePanel docs should cover 12-hour format',
)
expectIncludes(
  'docs/examples/time-panel/example-03.vue',
  'panelRef',
  'TimePanel docs should cover exposed methods',
)
expectIncludes(
  'docs/examples/time-panel/example-04.vue',
  'disabledTime',
  'TimePanel docs should cover disabledTime',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`TimePanel contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`TimePanel contract check passed: ${checks.length} checks`)
