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
    name: `${relativePath} must not exist`,
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

function expectMatches(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} matches ${pattern}`,
    pass: existsSync(filePath) && pattern.test(read(relativePath)),
  })
}

function expectNotMatches(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} does not match ${pattern}`,
    pass: existsSync(filePath) && !pattern.test(read(relativePath)),
  })
}

expectFile('src/components/Notification/notification.ts')
expectFile('src/components/Notification/NotificationHost.vue')
expectFile('src/components/Notification/NotificationItem.vue')
expectFile('src/components/Notification/types.ts')
expectFile('src/components/Notification/index.ts')
expectFile('docs/components/notification.md')
expectFile('docs/examples/notification/example-01.vue')
expectFile('docs/examples/notification/example-02.vue')
expectFile('docs/examples/notification/example-03.vue')
expectFile('docs/examples/notification/example-04.vue')
expectFile('docs/examples/notification/example-05.vue')

expectNoFile('src/components/Notification/Notification.vue')

expectIncludes(
  'src/components/Notification/types.ts',
  "NotificationType = 'info' | 'success' | 'warning' | 'error' | 'loading'",
)
expectIncludes(
  'src/components/Notification/types.ts',
  "NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
)
expectIncludes('src/components/Notification/types.ts', 'NotificationProgressConfig')
expectIncludes('src/components/Notification/types.ts', 'percent: number')
expectIncludes('src/components/Notification/types.ts', 'status?: ProgressStatus')
expectIncludes('src/components/Notification/types.ts', 'NotificationAction')
expectIncludes('src/components/Notification/types.ts', 'title: string')
expectIncludes('src/components/Notification/types.ts', 'content?: string')
expectIncludes('src/components/Notification/types.ts', 'placement?: NotificationPlacement')
expectIncludes('src/components/Notification/types.ts', 'progress?: NotificationProgressConfig')
expectIncludes('src/components/Notification/types.ts', 'NotificationConfig')
expectIncludes('src/components/Notification/types.ts', 'NotificationHandle')
expectIncludes('src/components/Notification/types.ts', 'NotificationApi')

expectIncludes('src/components/Notification/notification.ts', 'createApp')
expectIncludes('src/components/Notification/notification.ts', 'data-horizon-teleport-layer')
expectIncludes('src/components/Notification/notification.ts', "typeof document !== 'undefined'")
expectIncludes('src/components/Notification/notification.ts', 'duration: 4500')
expectIncludes('src/components/Notification/notification.ts', "placement: 'top-right'")
expectIncludes('src/components/Notification/notification.ts', 'closable: true')
expectIncludes('src/components/Notification/notification.ts', 'max: 4')
expectIncludes('src/components/Notification/notification.ts', 'top: 24')
expectIncludes('src/components/Notification/notification.ts', 'bottom: 24')
expectIncludes('src/components/Notification/notification.ts', 'zIndex: 3000')
expectIncludes('src/components/Notification/notification.ts', 'function closeNotification')
expectIncludes('src/components/Notification/notification.ts', 'resetNotificationTimer')
expectIncludes('src/components/Notification/notification.ts', 'findNotificationIndexByKey')
expectIncludes('src/components/Notification/notification.ts', "type === 'loading'")
expectIncludes('src/components/Notification/notification.ts', 'options.duration ?? 0')
expectIncludes('src/components/Notification/notification.ts', 'trimOverflow')
expectIncludes('src/components/Notification/notification.ts', 'state.notifications')
expectMatches(
  'src/components/Notification/notification.ts',
  /info\(input\)[\s\S]*createNotification\('info', input\)/,
  'Notification API should expose info()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /success\(input\)[\s\S]*createNotification\('success', input\)/,
  'Notification API should expose success()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /warning\(input\)[\s\S]*createNotification\('warning', input\)/,
  'Notification API should expose warning()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /error\(input\)[\s\S]*createNotification\('error', input\)/,
  'Notification API should expose error()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /loading\(input\)[\s\S]*createNotification\('loading', input\)/,
  'Notification API should expose loading()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /close\(key\)[\s\S]*findNotificationIndexByKey\(key\)/,
  'Notification API should expose close(key)',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /closeAll\(\)[\s\S]*state\.notifications/,
  'Notification API should expose closeAll()',
)
expectMatches(
  'src/components/Notification/notification.ts',
  /config\(options\)[\s\S]*applyConfig\(options\)/,
  'Notification API should expose config(options)',
)
expectNotIncludes('src/components/Notification/notification.ts', 'notification.open')
expectNotIncludes('src/components/Notification/notification.ts', 'notification.custom')

expectIncludes('src/components/Notification/NotificationHost.vue', 'placementGroups')
expectIncludes('src/components/Notification/NotificationHost.vue', 'top-left')
expectIncludes('src/components/Notification/NotificationHost.vue', 'top-right')
expectIncludes('src/components/Notification/NotificationHost.vue', 'bottom-left')
expectIncludes('src/components/Notification/NotificationHost.vue', 'bottom-right')
expectIncludes('src/components/Notification/NotificationHost.vue', 'TransitionGroup')
expectIncludes('src/components/Notification/NotificationHost.vue', 'aria-live="polite"')
expectIncludes('src/components/Notification/NotificationHost.vue', 'pointer-events-none fixed')
expectIncludes(
  'src/components/Notification/NotificationHost.vue',
  ':style="getPlacementStyle(placement)"',
)
expectIncludes(
  'src/components/Notification/NotificationHost.vue',
  'w-[min(360px,calc(100vw-32px))]',
  'Notification stack should use a stable 360px desktop width',
)
expectIncludes(
  'src/components/Notification/NotificationHost.vue',
  'relative flex w-full gap-3',
  'Notification TransitionGroup should keep full width during leave transitions',
)
expectIncludes(
  'src/components/Notification/NotificationHost.vue',
  'position: absolute',
  'Notification leave transition should keep removed items out of flow without changing stack width',
)

expectIncludes('src/components/Notification/NotificationItem.vue', 'w-full')
expectNotIncludes('src/components/Notification/NotificationItem.vue', 'min-w-80')
expectIncludes('src/components/Notification/NotificationItem.vue', 'shadow-popper')
expectIncludes('src/components/Notification/NotificationItem.vue', "'status'")
expectIncludes('src/components/Notification/NotificationItem.vue', "'alert'")
expectIncludes('src/components/Notification/NotificationItem.vue', 'Progress')
expectIncludes('src/components/Notification/NotificationItem.vue', 'notification.progress')
expectIncludes('src/components/Notification/NotificationItem.vue', 'visualType')
expectIncludes('src/components/Notification/NotificationItem.vue', 'notification.progress?.status')
expectIncludes(
  'src/components/Notification/NotificationItem.vue',
  ':percent="notification.progress.percent"',
)
expectIncludes(
  'src/components/Notification/NotificationItem.vue',
  ':status="notification.progress.status"',
)
expectIncludes(
  'src/components/Notification/NotificationItem.vue',
  ':size="{ thickness: 4, labelSize: 12 }"',
)
expectIncludes('src/components/Notification/NotificationItem.vue', 'show-label')
expectIncludes('src/components/Notification/NotificationItem.vue', 'notification.action')
expectIncludes('src/components/Notification/NotificationItem.vue', 'aria-label="关闭通知"')
expectIncludes('src/components/Notification/NotificationItem.vue', 'h-notification-icon-loading')

expectIncludes('src/components/Notification/index.ts', 'notification')
expectIncludes('src/components/Notification/index.ts', 'NotificationOptions')
expectIncludes('src/components/index.ts', 'notification')
expectIncludes('src/components/index.ts', 'NotificationOptions')
expectNotIncludes('src/components/index.ts', 'Notification,')
expectIncludes('docs/.vitepress/config.ts', '/components/notification')
expectIncludes('docs/.vitepress/theme/index.ts', 'notification')
expectIncludes('package.json', 'check:notification')
expectMatches(
  'package.json',
  /check:progress && npm run check:notification && npm run check:dropdown-menu/,
  'npm run check should include check:notification in the contract chain',
)

expectIncludes('docs/components/notification.md', 'notification.info')
expectIncludes('docs/components/notification.md', 'notification.success')
expectIncludes('docs/components/notification.md', 'notification.warning')
expectIncludes('docs/components/notification.md', 'notification.error')
expectIncludes('docs/components/notification.md', 'notification.loading')
expectIncludes('docs/components/notification.md', 'notification.close')
expectIncludes('docs/components/notification.md', 'notification.closeAll')
expectIncludes('docs/components/notification.md', 'notification.config')
expectIncludes('docs/components/notification.md', '`duration: 0`')
expectIncludes('docs/components/notification.md', '`progress`')
expectIncludes('docs/components/notification.md', '固定宽度')
expectIncludes(
  'docs/components/notification.md',
  "'top-left' \\| 'top-right' \\| 'bottom-left' \\| 'bottom-right'",
)
expectNotIncludes('docs/components/notification.md', 'notification.open')
expectNotIncludes('docs/components/notification.md', 'notification.custom')
expectNotIncludes('docs/components/notification.md', 'circle')

for (const example of [
  'docs/examples/notification/example-01.vue',
  'docs/examples/notification/example-02.vue',
  'docs/examples/notification/example-03.vue',
  'docs/examples/notification/example-04.vue',
  'docs/examples/notification/example-05.vue',
]) {
  expectIncludes(example, 'notification.', `${example} should use the command API`)
  expectNotIncludes(example, 'notification.open', `${example} must not use notification.open`)
  expectNotIncludes(example, 'notification.custom', `${example} must not use notification.custom`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
}

expectMatches(
  'docs/examples/notification/example-02.vue',
  /notification\.loading\(\{[\s\S]*key[\s\S]*progress[\s\S]*percent[\s\S]*status: 'success'/,
  'Notification loading example should keep progress visible for success state',
)
expectIncludes(
  'docs/examples/notification/example-02.vue',
  "status: 'warning'",
  'Notification loading example should show warning progress status',
)
expectIncludes(
  'docs/examples/notification/example-02.vue',
  "status: 'error'",
  'Notification loading example should show error progress status',
)
expectNotMatches(
  'docs/examples/notification/example-02.vue',
  /notification\.success\(\{[\s\S]*key/,
  'Notification loading example should not replace progress with a success notification',
)
expectIncludes(
  'docs/examples/notification/example-03.vue',
  "'top-left'",
  'Notification docs should cover top-left placement',
)
expectIncludes(
  'docs/examples/notification/example-03.vue',
  "'bottom-right'",
  'Notification docs should cover bottom-right placement',
)
expectIncludes(
  'docs/examples/notification/example-04.vue',
  'notification.close(notificationKey)',
  'Notification docs should cover keyed close',
)
expectIncludes(
  'docs/examples/notification/example-04.vue',
  'notification.closeAll()',
  'Notification docs should cover closeAll',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Notification contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Notification contract check passed: ${checks.length} checks`)
