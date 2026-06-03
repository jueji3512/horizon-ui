<template>
  <article class="component-demo vp-raw">
    <header v-if="title" class="component-demo-header">
      <h3 class="component-demo-title">{{ title }}</h3>
    </header>

    <div class="component-demo-preview">
      <slot />
    </div>

    <section v-if="source" class="component-demo-source">
      <div class="component-demo-source-bar">
        <button
          class="component-demo-toggle"
          type="button"
          :aria-expanded="sourceVisible"
          @click="sourceVisible = !sourceVisible"
        >
          <span class="component-demo-caret" :data-open="sourceVisible" aria-hidden="true" />
          <span>源码</span>
        </button>
        <button class="component-demo-copy" type="button" @click="copySource">
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
      <pre v-if="sourceVisible" class="component-demo-code"><code>{{ source }}</code></pre>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  title?: string
  path: string
}>()

const demoSources = inject<Record<string, string>>('demoSources', {})
const copied = ref(false)
const sourceVisible = ref(false)
let copyTimer: number | undefined

const source = computed(() => demoSources[props.path]?.trim() ?? '')

async function copySource() {
  if (!source.value || typeof navigator === 'undefined') return

  try {
    await navigator.clipboard.writeText(source.value)
  } catch {
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
</script>

<style scoped>
.component-demo {
  margin: 16px 0 24px;
  overflow: hidden;
  border: 1px solid var(--border-color-container);
  border-radius: 8px;
  background: var(--bg-color-container);
}

.component-demo-header {
  padding: 14px 16px 0;
}

.component-demo-title {
  margin: 0;
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.component-demo-preview {
  padding: 24px;
}

.component-demo-source {
  border-top: 1px solid var(--border-color-divider);
}

.component-demo-source-bar {
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px 0 16px;
  background: var(--bg-color-secondarycontainer);
}

.component-demo-toggle {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  border: 0;
  padding: 0;
  color: var(--text-color-secondary);
  cursor: pointer;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.component-demo-toggle:hover {
  color: var(--text-color-primary);
}

.component-demo-caret {
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid currentColor;
  transition: transform var(--duration-fast);
}

.component-demo-caret[data-open='true'] {
  transform: rotate(90deg);
}

.component-demo-copy {
  flex: none;
  height: 28px;
  border: 1px solid var(--border-color-component);
  border-radius: var(--round-default);
  padding: 0 10px;
  color: var(--text-color-secondary);
  cursor: pointer;
  background: var(--bg-color-container);
  font-size: 12px;
  line-height: 26px;
  transition:
    color var(--duration-fast),
    border-color var(--duration-fast),
    background-color var(--duration-fast);
}

.component-demo-copy:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
}

.component-demo-code {
  max-height: 420px;
  margin: 0;
  overflow: auto;
  padding: 16px;
  color: var(--text-color-primary);
  background: var(--bg-color-container);
  font-size: 13px;
  line-height: 1.65;
  tab-size: 2;
}
</style>
