<template>
  <article class="component-demo vp-raw">
    <header class="component-demo-header">
      <h3 v-if="title" class="component-demo-title">{{ title }}</h3>
      <code class="component-demo-path">{{ path }}.vue</code>
    </header>

    <div class="component-demo-preview">
      <slot />
    </div>

    <section v-if="source" class="component-demo-source">
      <div
        class="component-demo-source-bar"
        role="button"
        tabindex="0"
        :aria-expanded="sourceVisible"
        @click="sourceVisible = !sourceVisible"
        @keydown.enter.prevent="sourceVisible = !sourceVisible"
        @keydown.space.prevent="sourceVisible = !sourceVisible"
      >
        <span class="component-demo-toggle" :data-open="sourceVisible">
          <Icon
            name="chevron-right"
            class="component-demo-toggle-icon"
            :data-open="sourceVisible"
            aria-hidden="true"
          />
          <span>源码</span>
        </span>
        <span class="component-demo-source-meta">{{ lineCount }} lines</span>
        <span class="component-demo-source-spacer" />
        <button class="component-demo-copy" type="button" @click.stop="copySource">
          <Icon :name="copied ? 'check' : 'copy'" aria-hidden="true" />
          <span class="component-demo-sr-only">{{ copied ? '已复制源码' : '复制源码' }}</span>
        </button>
      </div>
      <div v-if="sourceVisible" class="component-demo-code-wrap">
        <ol class="component-demo-lines" aria-hidden="true">
          <li v-for="line in lineNumbers" :key="line">{{ line }}</li>
        </ol>
        <div class="component-demo-code-scroll">
          <slot name="source">
            <pre class="component-demo-code"><code>{{ source }}</code></pre>
          </slot>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import Icon from '../../../../src/components/Icon/Icon.vue'

const props = defineProps<{
  title?: string
  path: string
}>()

const demoSources = inject<Record<string, string>>('demoSources', {})
const copied = ref(false)
const sourceVisible = ref(false)
let copyTimer: number | undefined

const source = computed(() => demoSources[props.path]?.trim() ?? '')
const lineCount = computed(() => (source.value ? source.value.split(/\r?\n/).length : 0))
const lineNumbers = computed(() => Array.from({ length: lineCount.value }, (_, index) => index + 1))

async function copySource() {
  if (!source.value || typeof navigator === 'undefined') return

  const copiedSuccessfully = await writeClipboardText(source.value)

  if (!copiedSuccessfully) {
    return
  }

  copied.value = true

  if (copyTimer) window.clearTimeout(copyTimer)
  copyTimer = window.setTimeout(() => {
    copied.value = false
  }, 1600)
}

onBeforeUnmount(() => {
  if (copyTimer) window.clearTimeout(copyTimer)
})

async function writeClipboardText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return fallbackCopyText(text)
  }
}

function fallbackCopyText(text: string) {
  if (typeof document === 'undefined') return false

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.inset = '0 auto auto 0'
  textarea.style.opacity = '0'
  document.body.append(textarea)
  textarea.select()

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}
</script>

<style scoped>
:global(:root) {
  --demo-shell-bg: var(--bg-color-container);
  --demo-shell-border: var(--border-color-container);
  --demo-shell-shadow: var(--shadow-sm);
  --demo-preview-bg: var(--bg-color-container);
  --demo-toolbar-bg: oklch(97.8% 0.004 255deg);
  --demo-code-bg: oklch(98.6% 0.004 255deg);
  --demo-line-bg: oklch(96.4% 0.006 255deg);
  --demo-text: var(--text-color-primary);
  --demo-muted: var(--text-color-secondary);
  --demo-subtle: var(--text-color-placeholder);
  --demo-divider: oklch(90.8% 0.008 255deg);
  --demo-control-bg: var(--bg-color-container);
  --demo-control-border: var(--border-color-component);
}

:global(.dark) {
  --demo-shell-bg: oklch(22% 0.03 264deg);
  --demo-shell-border: oklch(34% 0.03 264deg);
  --demo-shell-shadow: 0 18px 38px rgb(0 0 0 / 28%), inset 0 0 0 1px rgb(255 255 255 / 5%);
  --demo-preview-bg: oklch(24% 0.03 264deg);
  --demo-toolbar-bg: oklch(18% 0.03 264deg);
  --demo-code-bg: oklch(22% 0.03 264deg);
  --demo-line-bg: oklch(18% 0.03 264deg);
  --demo-text: oklch(91% 0.02 255deg);
  --demo-muted: oklch(74% 0.03 255deg);
  --demo-subtle: oklch(63% 0.03 255deg);
  --demo-divider: oklch(34% 0.03 264deg);
  --demo-control-bg: oklch(24% 0.03 264deg);
  --demo-control-border: oklch(39% 0.03 264deg);
}

.component-demo {
  margin: 16px 0 24px;
  overflow: hidden;
  border: 1px solid var(--demo-shell-border);
  border-radius: 8px;
  background: var(--demo-shell-bg);
  box-shadow: var(--demo-shell-shadow);
}

.component-demo-header {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--demo-divider);
  padding: 0 16px;
}

.component-demo-title {
  margin: 0;
  color: var(--demo-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.component-demo-path {
  min-width: 0;
  overflow: hidden;
  color: var(--demo-subtle);
  font: var(--font-body-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-demo-preview {
  padding: 24px;
  background:
    linear-gradient(var(--demo-preview-bg), var(--demo-preview-bg)) padding-box,
    repeating-linear-gradient(
        90deg,
        color-mix(in oklch, var(--demo-divider) 70%, transparent) 0 1px,
        transparent 1px 32px
      )
      border-box;
}

.component-demo-source {
  border-top: 1px solid var(--demo-divider);
}

.component-demo-source-bar {
  display: flex;
  min-height: 42px;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  color: var(--demo-muted);
  cursor: pointer;
  background: var(--demo-toolbar-bg);
  transition:
    color var(--duration-fast),
    background-color var(--duration-fast);
}

.component-demo-source-bar:hover {
  color: var(--demo-text);
}

.component-demo-source-bar:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: -2px;
}

.component-demo-toggle {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.component-demo-toggle-icon {
  width: 14px;
  height: 14px;
  transition: transform var(--duration-fast);
}

.component-demo-toggle-icon[data-open='true'] {
  transform: rotate(90deg);
}

.component-demo-source-meta {
  color: var(--demo-subtle);
  font: var(--font-body-sm);
}

.component-demo-source-spacer {
  flex: 1;
}

.component-demo-copy {
  display: inline-flex;
  flex: none;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--demo-control-border);
  border-radius: var(--round-default);
  padding: 0;
  color: var(--demo-muted);
  cursor: pointer;
  background: var(--demo-control-bg);
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast),
    background-color var(--duration-fast);
}

.component-demo-copy:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}

.component-demo-copy svg {
  width: 14px;
  height: 14px;
}

.component-demo-code-wrap {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  max-height: 420px;
  overflow: auto;
  border-top: 1px solid var(--demo-divider);
  background: var(--demo-code-bg);
}

.component-demo-lines {
  margin: 0;
  padding: 14px 8px;
  list-style: none;
  color: var(--demo-subtle);
  text-align: right;
  background: var(--demo-line-bg);
  border-right: 1px solid var(--demo-divider);
  font: var(--font-body-sm);
}

.component-demo-code-scroll {
  min-width: 0;
  overflow: auto;
}

.component-demo-code {
  margin: 0;
  padding: 14px 16px;
  color: var(--demo-text);
  background: var(--demo-code-bg);
  font: var(--font-body-sm);
  tab-size: 2;
}

.component-demo-code-scroll :deep(.vp-code) {
  margin: 0;
  padding: 14px 16px;
  overflow: visible;
  color: var(--demo-text);
  background: var(--demo-code-bg);
  font: var(--font-body-sm);
  tab-size: 2;
}

.component-demo-code-scroll :deep(.vp-code code) {
  display: block;
}

.component-demo-code-scroll :deep(.line) {
  display: block;
  min-height: 20px;
}

.component-demo-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (width <= 640px) {
  .component-demo-header,
  .component-demo-source-bar {
    align-items: flex-start;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .component-demo-preview {
    padding: 20px 16px;
  }

  .component-demo-source-spacer {
    display: none;
  }
}
</style>
