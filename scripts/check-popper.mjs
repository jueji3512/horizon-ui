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

expectFile('src/components/Popper/Popper.vue')
expectFile('src/components/Popper/PopperTrigger.vue')
expectFile('src/components/Popper/PopperContent.vue')
expectFile('src/components/Popper/PopperArrow.vue')
expectFile('src/components/Popper/context.ts')
expectFile('src/components/Popper/index.ts')
expectFile('src/components/Popper/types.ts')
expectFile('src/components/Popper/usePopper.ts')

expectIncludes(
  'src/components/Popper/context.ts',
  'visible: ComputedRef<boolean>',
  'PopperContext visible is readonly',
)
expectIncludes(
  'src/components/Popper/context.ts',
  'middlewareData: Readonly<Ref<MiddlewareData>>',
  'PopperContext middlewareData is readonly',
)
expectIncludes(
  'src/components/Popper/context.ts',
  'currentPlacement: Readonly<Ref<Placement>>',
  'PopperContext currentPlacement is readonly',
)
expectIncludes(
  'src/components/Popper/index.ts',
  "export { popperContextKey } from './context'",
  'Popper index re-exports context key without defining it in the barrel',
)
expectNotIncludes(
  'src/components/Popper/PopperContent.vue',
  "from './index'",
  'PopperContent imports context directly to avoid barrel cycles',
)
expectNotIncludes(
  'src/components/Popper/PopperTrigger.vue',
  "from './index'",
  'PopperTrigger imports context directly to avoid barrel cycles',
)
expectNotIncludes(
  'src/components/Popper/PopperArrow.vue',
  "from './index'",
  'PopperArrow imports context directly to avoid barrel cycles',
)
expectIncludes(
  'src/components/Popover/PopoverTrigger.ts',
  "from '../Popper/context'",
  'PopoverTrigger imports Popper context directly to avoid barrel cycles',
)
expectNotIncludes(
  'src/components/Popover/PopoverTrigger.ts',
  "from '../Popper'",
  'PopoverTrigger does not import Popper context through the barrel',
)
expectIncludes(
  'src/components/Popper/types.ts',
  'middlewareData: Readonly<Ref<MiddlewareData>>',
  'UsePopperReturn middlewareData is readonly',
)
expectIncludes(
  'src/components/Popper/types.ts',
  'placement: Readonly<Ref<Placement>>',
  'UsePopperReturn placement is readonly',
)
expectIncludes(
  'src/components/Popper/types.ts',
  'placement: MaybeRefOrGetter<Placement>',
  'UsePopperOptions placement is readonly-compatible',
)
expectNotIncludes(
  'src/components/Popper/usePopper.ts',
  'placement as Ref<Placement>',
  'usePopper avoids mutability casts for placement',
)
expectNotIncludes(
  'src/components/Popper/usePopper.ts',
  'as unknown as',
  'usePopper avoids broad unknown casts',
)
expectIncludes(
  'src/components/Popper/PopperTrigger.vue',
  'ctx.hide({ immediate: true })',
  'Popper closes immediately when trigger unmounts',
)
expectIncludes(
  'src/components/Popper/Popper.vue',
  'visible !== undefined && visible !== oldVisible',
  'Popper clears pending timers when controlled visible changes',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'resolvedTeleportTarget',
  'PopperContent resolves Teleport target',
)
expectNotIncludes(
  'src/components/Popper/PopperContent.vue',
  'h-popper-content',
  'PopperContent does not add docs-only isolation classes',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'data-horizon-teleport-layer',
  'PopperContent marks teleported layers for docs shell reset isolation',
)
expectIncludes(
  'docs/.vitepress/config.ts',
  '[data-horizon-teleport-layer], [data-horizon-teleport-layer] *',
  'VitePress reset excludes Horizon teleported layers through a shared marker',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'function resolveTeleportTarget',
  'PopperContent uses a safe Teleport target resolver',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'catch {',
  'PopperContent falls back when target selector is invalid',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  "if (typeof document === 'undefined') return",
  'PopperContent document listeners are SSR guarded',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'visible && ctx.closeOnOutsideClick.value',
  'outside-click listener is only registered when enabled',
)
expectIncludes(
  'src/components/Popper/PopperContent.vue',
  'visible && ctx.closeOnEsc.value',
  'Esc listener is only registered when enabled',
)
expectIncludes('package.json', 'check:popper')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Popper contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Popper contract check passed: ${checks.length} checks`)
