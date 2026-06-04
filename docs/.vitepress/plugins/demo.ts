import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const demoPathRE = /^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/i

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function toPascalCase(value: string) {
  return value
    .split(/[-/]/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('')
}

function getExampleFilePath(sourcePath: string) {
  return fileURLToPath(new URL(`../../examples/${sourcePath}.vue`, import.meta.url))
}

function readDemoSource(sourcePath: string) {
  return readFileSync(getExampleFilePath(sourcePath), 'utf-8').trim()
}

function renderHighlightedSource(md: MarkdownIt, source: string) {
  return (
    md.options.highlight?.(source, 'vue', '') ||
    `<pre class="vp-code" v-pre><code>${escapeAttr(source)}</code></pre>`
  )
}

export function createDemoContainer(md: MarkdownIt) {
  const render: RenderRule = (tokens, idx) => {
    const token = tokens[idx]

    if (token.nesting !== 1) {
      return ''
    }

    const title = token.info
      .trim()
      .replace(/^demo\s*/, '')
      .trim()
    const paragraphOpen = tokens[idx + 1]
    const sourceToken = tokens[idx + 2]
    const paragraphClose = tokens[idx + 3]
    const sourcePath = sourceToken?.type === 'inline' ? sourceToken.content.trim() : ''

    if (!demoPathRE.test(sourcePath)) {
      throw new Error(`Invalid demo source path: ${sourcePath || '(empty)'}`)
    }

    if (paragraphOpen) paragraphOpen.hidden = true
    if (sourceToken) {
      sourceToken.hidden = true
      sourceToken.children = []
    }
    if (paragraphClose) paragraphClose.hidden = true

    const componentName = `Demo${toPascalCase(sourcePath)}`
    const highlightedSource = renderHighlightedSource(md, readDemoSource(sourcePath))

    return `<ComponentDemo title="${escapeAttr(title)}" path="${escapeAttr(sourcePath)}">
  <${componentName} />
  <template #source>
${highlightedSource}
  </template>
</ComponentDemo>
`
  }

  md.use(container, 'demo', {
    validate(params: string) {
      return /^demo\s*(.*)$/.test(params.trim())
    },
    render,
  })
}
