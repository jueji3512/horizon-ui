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

expectFile('src/components/Message/message.ts')
expectFile('src/components/Message/MessageHost.vue')
expectFile('src/components/Message/MessageItem.vue')
expectFile('src/components/Message/types.ts')
expectFile('src/components/Message/index.ts')
expectFile('docs/components/message.md')
expectFile('docs/examples/message/example-01.vue')
expectFile('docs/examples/message/example-02.vue')
expectFile('docs/examples/message/example-03.vue')
expectFile('docs/examples/message/example-04.vue')
expectFile('docs/examples/message/example-05.vue')

expectNoFile('src/components/Message/Message.vue')

expectIncludes('src/components/Message/message.ts', 'createApp')
expectIncludes('src/components/Message/message.ts', 'data-horizon-teleport-layer')
expectIncludes('src/components/Message/message.ts', "typeof document !== 'undefined'")
expectIncludes('src/components/Message/message.ts', 'duration: 3000')
expectIncludes('src/components/Message/message.ts', 'closable: true')
expectIncludes('src/components/Message/message.ts', 'max: 5')
expectIncludes('src/components/Message/message.ts', 'top: 24')
expectIncludes('src/components/Message/message.ts', 'function closeMessage')
expectIncludes('src/components/Message/message.ts', 'resetMessageTimer')
expectIncludes('src/components/Message/message.ts', 'findMessageIndexByKey')
expectIncludes('src/components/Message/message.ts', 'options.duration ?? 0')
expectIncludes('src/components/Message/message.ts', "createMessage('loading'")
expectMatches(
  'src/components/Message/message.ts',
  /info\(input\)[\s\S]*createMessage\('info', input\)/,
  'Message API should expose info()',
)
expectMatches(
  'src/components/Message/message.ts',
  /success\(input\)[\s\S]*createMessage\('success', input\)/,
  'Message API should expose success()',
)
expectMatches(
  'src/components/Message/message.ts',
  /warning\(input\)[\s\S]*createMessage\('warning', input\)/,
  'Message API should expose warning()',
)
expectMatches(
  'src/components/Message/message.ts',
  /error\(input\)[\s\S]*createMessage\('error', input\)/,
  'Message API should expose error()',
)
expectMatches(
  'src/components/Message/message.ts',
  /loading\(input\)[\s\S]*createMessage\('loading', input\)/,
  'Message API should expose loading()',
)
expectMatches(
  'src/components/Message/message.ts',
  /close\(key\)[\s\S]*findMessageIndexByKey\(key\)/,
  'Message API should expose close(key)',
)
expectMatches(
  'src/components/Message/message.ts',
  /closeAll\(\)[\s\S]*state\.messages/,
  'Message API should expose closeAll()',
)
expectMatches(
  'src/components/Message/message.ts',
  /config\(options\)[\s\S]*applyConfig\(options\)/,
  'Message API should expose config(options)',
)
expectNotIncludes('src/components/Message/message.ts', 'message.open')
expectNotIncludes('src/components/Message/message.ts', 'message.custom')

expectIncludes('src/components/Message/MessageHost.vue', 'fixed')
expectIncludes('src/components/Message/MessageHost.vue', 'left-1/2')
expectIncludes('src/components/Message/MessageHost.vue', '-translate-x-1/2')
expectIncludes('src/components/Message/MessageHost.vue', ':style="hostStyle"')
expectIncludes('src/components/Message/MessageHost.vue', 'TransitionGroup')
expectIncludes('src/components/Message/MessageHost.vue', 'aria-live="polite"')

expectIncludes('src/components/Message/MessageItem.vue', 'min-h-10')
expectIncludes(
  'src/components/Message/MessageItem.vue',
  'w-max',
  'Message item should keep content width stable while leaving',
)
expectIncludes('src/components/Message/MessageItem.vue', 'px-3 py-2')
expectIncludes('src/components/Message/MessageItem.vue', 'w-[3px]')
expectIncludes('src/components/Message/MessageItem.vue', 'shadow-popper')
expectIncludes('src/components/Message/MessageItem.vue', 'Icon')
expectIncludes('src/components/Message/MessageItem.vue', 'info')
expectIncludes('src/components/Message/MessageItem.vue', 'circle-check')
expectIncludes('src/components/Message/MessageItem.vue', 'triangle-alert')
expectIncludes('src/components/Message/MessageItem.vue', 'circle-close')
expectIncludes('src/components/Message/MessageItem.vue', 'loading')
expectIncludes('src/components/Message/MessageItem.vue', 'close')
expectIncludes('src/components/Message/MessageItem.vue', 'h-6 w-6')
expectIncludes(
  'src/components/Message/MessageItem.vue',
  'aria-label="关闭提示"',
  'Message close icon button should keep an accessible name',
)
expectIncludes('src/components/Message/MessageItem.vue', 'h-message-icon-loading')

expectIncludes('src/components/Message/types.ts', 'MessageOptions')
expectIncludes('src/components/Message/types.ts', 'MessageConfig')
expectIncludes('src/components/Message/types.ts', 'MessageHandle')
expectIncludes('src/components/Message/types.ts', 'MessageCloseReason')
expectIncludes('src/components/Message/index.ts', 'message')
expectNotIncludes('src/components/Message/index.ts', 'Message.vue')

expectIncludes('src/components/index.ts', 'message')
expectIncludes('src/components/index.ts', 'MessageOptions')
expectNotIncludes('src/components/index.ts', 'Message,')
expectIncludes('docs/.vitepress/config.ts', '/components/message')
expectIncludes('package.json', 'check:message')

expectIncludes('docs/components/message.md', 'message.info')
expectIncludes('docs/components/message.md', 'message.success')
expectIncludes('docs/components/message.md', 'message.warning')
expectIncludes('docs/components/message.md', 'message.error')
expectIncludes('docs/components/message.md', 'message.loading')
expectIncludes('docs/components/message.md', 'message.close')
expectIncludes('docs/components/message.md', 'message.closeAll')
expectIncludes('docs/components/message.md', 'message.config')
expectIncludes('docs/components/message.md', '`duration: 0`')
expectIncludes('docs/components/message.md', '`key`')
expectNotIncludes('docs/components/message.md', 'message.open')
expectNotIncludes('docs/components/message.md', 'message.custom')

for (const example of [
  'docs/examples/message/example-01.vue',
  'docs/examples/message/example-02.vue',
  'docs/examples/message/example-03.vue',
  'docs/examples/message/example-04.vue',
  'docs/examples/message/example-05.vue',
]) {
  expectIncludes(example, 'message.', `${example} should use the command API`)
  expectNotIncludes(example, 'message.open', `${example} must not use message.open`)
  expectNotIncludes(example, 'message.custom', `${example} must not use message.custom`)
  expectNotIncludes(example, 'type="primary"', `${example} must not use old primary type API`)
  expectNotIncludes(example, 'type="danger"', `${example} must not use old danger type API`)
  expectNotIncludes(example, 'theme="primary"', `${example} must not use old primary theme name`)
  expectNotIncludes(example, 'theme="danger"', `${example} must not use old danger theme name`)
}

expectMatches(
  'docs/examples/message/example-02.vue',
  /message\.loading\(\{[\s\S]*key[\s\S]*\}\)[\s\S]*message\.success\(\{[\s\S]*key/,
  'Message loading example should replace by key',
)
expectIncludes(
  'docs/examples/message/example-04.vue',
  'message.close(messageKey)',
  'Message docs should cover keyed close',
)
expectIncludes(
  'docs/examples/message/example-04.vue',
  'message.closeAll()',
  'Message docs should cover closeAll',
)

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Message contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Message contract check passed: ${checks.length} checks`)
