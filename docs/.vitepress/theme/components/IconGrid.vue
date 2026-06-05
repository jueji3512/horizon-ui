<template>
  <div>
    <div class="search-bar">
      <input v-model="search" class="search-input" placeholder="搜索图标..." autocomplete="off" />
      <span class="search-count">{{ filteredIcons.length }}/{{ iconNames.length }} 个</span>
    </div>

    <div class="icon-grid">
      <div
        v-for="name in filteredIcons"
        :key="name"
        class="icon-card"
        :class="{ copied: copiedName === name }"
        @click="copy(name)"
      >
        <span class="icon-preview">
          <Icon :name="name" />
        </span>
        <span class="icon-name">{{ name }}</span>
      </div>
    </div>

    <div v-if="copiedName" class="copy-toast">{{ copiedName }} 已复制</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const copiedName = ref('')

const icons = import.meta.glob('../../../../src/components/Icon/icons/*.svg', {
  query: '?raw',
  eager: true,
})

const relatedIconSortHints: Record<string, [string, number]> = {
  'arrow-left': ['arrow', 1],
  'arrow-right': ['arrow', 2],
  'arrow-up': ['arrow', 3],
  'arrow-down': ['arrow', 4],
  'arrow-up-down': ['arrow', 5],
  'chevron-left': ['chevron', 1],
  'chevron-right': ['chevron', 2],
  'chevron-up': ['chevron', 3],
  'chevron-down': ['chevron', 4],
  'circle-alert': ['circle', 1],
  'circle-check': ['circle', 2],
  'circle-close': ['circle', 3],
  'circle-help': ['circle', 4],
  eye: ['eye', 1],
  'eye-off': ['eye', 2],
  folder: ['folder', 1],
  'folder-open': ['folder', 2],
  lock: ['lock', 1],
  unlock: ['lock', 2],
  'more-horizontal': ['more', 1],
  'more-vertical': ['more', 2],
  'panel-left': ['panel', 1],
  'panel-right': ['panel', 2],
  'sort-ascending': ['sort', 1],
  'sort-descending': ['sort', 2],
  user: ['user', 1],
  'user-plus': ['user', 2],
  users: ['user', 3],
  'zoom-in': ['zoom', 1],
  'zoom-out': ['zoom', 2],
}

const iconNames = Object.keys(icons)
  .map((k) => k.replace(/.*\/|\.svg/g, ''))
  .sort(compareIconNames)

const filteredIcons = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return iconNames
  return iconNames.filter((name) => name.includes(q))
})

function copy(name: string) {
  navigator.clipboard.writeText(name)
  copiedName.value = name
  setTimeout(() => (copiedName.value = ''), 1500)
}

function compareIconNames(a: string, b: string) {
  const [familyA, orderA] = relatedIconSortHints[a] ?? [a, 0]
  const [familyB, orderB] = relatedIconSortHints[b] ?? [b, 0]
  const familyCompare = familyA.localeCompare(familyB)

  if (familyCompare !== 0) return familyCompare
  if (orderA !== orderB) return orderA - orderB

  return a.localeCompare(b)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.search-input {
  width: 260px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid var(--border-color-component);
  border-radius: 8px;
  background: var(--bg-color-container);
  color: var(--text-color-primary);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--color-brand);
  box-shadow: 0 0 0 2px var(--color-brand-focus);
}

.search-input::placeholder {
  color: var(--text-color-placeholder);
}

.search-count {
  font-size: 13px;
  color: var(--text-color-secondary);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  gap: 4px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 76px;
  padding: 12px 8px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-color-secondary);
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s;
  border: 1px solid transparent;
}

.icon-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.icon-card:hover {
  color: var(--color-brand);
  background: var(--color-brand-light);
  border-color: var(--color-brand-disabled);
}

.icon-card.copied {
  color: var(--color-success);
  background: var(--color-success-light);
  border-color: var(--color-success-disabled);
}

.icon-name {
  font-size: 11px;
  text-align: center;
  word-break: break-all;
  line-height: 1.3;
}

.copy-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  background: var(--text-color-primary);
  color: var(--text-color-inverse);
  font-size: 13px;
  border-radius: 8px;
  z-index: 100;
  animation: toast-in 0.2s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
