<template>
  <div>
    <div class="search-bar">
      <input v-model="search" class="search-input" placeholder="搜索图标..." autocomplete="off" />
      <span class="search-count">{{ filteredIcons.length }}/{{ iconNames.length }} 个</span>
    </div>

    <div class="category-filter" aria-label="图标分类">
      <button
        v-for="category in categoryOptions"
        :key="category.value"
        type="button"
        class="category-button"
        :class="{ active: activeCategory === category.value }"
        :aria-pressed="activeCategory === category.value"
        @click="activeCategory = category.value"
      >
        <span class="category-label">{{ category.label }}</span>
        <span class="category-count">{{ iconCountByCategory[category.value] }}</span>
      </button>
    </div>

    <div class="icon-scale-strip" aria-label="图标尺寸预览">
      <span
        v-for="size in previewSizes"
        :key="size"
        class="scale-sample"
        :style="{ fontSize: `${size}px` }"
      >
        <Icon name="star" />
        <span>{{ size }}</span>
      </span>
    </div>

    <div class="icon-container-strip" aria-label="真实容器预览">
      <button class="sample-button" type="button">
        <Icon name="search" />
      </button>
      <button class="sample-button rounded" type="button">
        <Icon name="plus" />
      </button>
      <span class="sample-field">
        <span>Field</span>
        <Icon name="calendar" />
      </span>
      <span class="sample-tag">
        Tag
        <Icon name="close" />
      </span>
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
        <span class="icon-category">{{ getCategoryLabel(name) }}</span>
      </div>
    </div>

    <div v-if="copiedName" class="copy-toast">{{ copiedName }} 已复制</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type IconCategory =
  | 'basic'
  | 'direction'
  | 'layout'
  | 'data'
  | 'form'
  | 'feedback'
  | 'auth'
  | 'file'
  | 'content'
  | 'system'
  | 'other'
type CategoryFilter = IconCategory | 'all'

const search = ref('')
const copiedName = ref('')
const activeCategory = ref<CategoryFilter>('all')
const previewSizes = [12, 16, 20, 24, 32]

const categoryLabelMap: Record<CategoryFilter, string> = {
  all: '全部',
  basic: '基础操作',
  direction: '方向导航',
  layout: '导航布局',
  data: '数据图表',
  form: '表单输入',
  feedback: '反馈状态',
  auth: '权限组织',
  file: '文件链接',
  content: '内容媒体',
  system: '系统开发',
  other: '其他',
}

const categoryOptions = (Object.keys(categoryLabelMap) as CategoryFilter[]).map((value) => ({
  value,
  label: categoryLabelMap[value],
}))

const iconCategoryMap: Record<string, IconCategory> = {
  archive: 'file',
  'arrow-down': 'direction',
  'arrow-left': 'direction',
  'arrow-right': 'direction',
  'arrow-up': 'direction',
  'arrow-up-down': 'data',
  'at-sign': 'form',
  ban: 'feedback',
  bookmark: 'content',
  bug: 'system',
  'building-2': 'auth',
  calendar: 'form',
  'chart-line': 'data',
  'chart-pie': 'data',
  check: 'basic',
  'chevron-down': 'direction',
  'chevron-left': 'direction',
  'chevron-right': 'direction',
  'chevron-up': 'direction',
  'circle-alert': 'feedback',
  'circle-check': 'feedback',
  'circle-close': 'feedback',
  'circle-help': 'feedback',
  clock: 'form',
  close: 'basic',
  code: 'system',
  copy: 'basic',
  database: 'data',
  delete: 'basic',
  download: 'basic',
  edit: 'basic',
  'external-link': 'file',
  eye: 'content',
  'eye-off': 'content',
  file: 'file',
  filter: 'basic',
  folder: 'file',
  'folder-open': 'file',
  globe: 'content',
  'grid-2x2': 'layout',
  hash: 'form',
  heart: 'content',
  home: 'layout',
  image: 'content',
  inbox: 'file',
  info: 'feedback',
  layers: 'layout',
  'layout-dashboard': 'layout',
  link: 'file',
  list: 'layout',
  'list-filter': 'data',
  loading: 'feedback',
  location: 'content',
  lock: 'auth',
  mail: 'file',
  maximize: 'layout',
  menu: 'layout',
  message: 'file',
  minimize: 'layout',
  minus: 'basic',
  'more-horizontal': 'layout',
  'more-vertical': 'layout',
  notification: 'feedback',
  'panel-left': 'layout',
  'panel-right': 'layout',
  paperclip: 'file',
  plus: 'basic',
  power: 'basic',
  printer: 'basic',
  redo: 'basic',
  refresh: 'basic',
  'rotate-ccw': 'basic',
  save: 'basic',
  search: 'basic',
  server: 'data',
  settings: 'basic',
  shield: 'auth',
  'shield-check': 'auth',
  'sort-ascending': 'data',
  'sort-descending': 'data',
  'square-check': 'form',
  star: 'content',
  table: 'data',
  tag: 'form',
  terminal: 'system',
  'text-cursor-input': 'form',
  'triangle-alert': 'feedback',
  type: 'form',
  undo: 'basic',
  unlock: 'auth',
  upload: 'basic',
  user: 'auth',
  'user-plus': 'auth',
  users: 'auth',
  'zoom-in': 'basic',
  'zoom-out': 'basic',
}

const icons = import.meta.glob('../../../../src/components/Icon/icons/*.svg', {
  query: '?raw',
  eager: true,
})
const iconNames = Object.keys(icons)
  .map((k) => k.replace(/.*\/|\.svg/g, ''))
  .sort()

const filteredIcons = computed(() => {
  const q = search.value.trim().toLowerCase()

  return iconNames.filter((name) => {
    const category = getIconCategory(name)
    const matchesSearch = !q || name.includes(q)
    const matchesCategory = activeCategory.value === 'all' || category === activeCategory.value

    return matchesSearch && matchesCategory
  })
})

const iconCountByCategory = computed<Record<CategoryFilter, number>>(() => {
  const counts = Object.fromEntries(categoryOptions.map(({ value }) => [value, 0])) as Record<
    CategoryFilter,
    number
  >

  counts.all = iconNames.length

  iconNames.forEach((name) => {
    counts[getIconCategory(name)] += 1
  })

  return counts
})

function copy(name: string) {
  navigator.clipboard.writeText(name)
  copiedName.value = name
  setTimeout(() => (copiedName.value = ''), 1500)
}

function getIconCategory(name: string): IconCategory {
  return iconCategoryMap[name] ?? 'other'
}

function getCategoryLabel(name: string) {
  return categoryLabelMap[getIconCategory(name)]
}
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.category-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--border-color-component);
  border-radius: var(--round-default);
  background: var(--bg-color-container);
  color: var(--text-color-secondary);
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
}

.category-button:hover,
.category-button.active {
  color: var(--color-brand);
  border-color: var(--color-brand-disabled);
  background: var(--color-brand-light);
}

.category-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-focus);
}

.category-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-count {
  color: var(--text-color-placeholder);
  font-size: 11px;
}

.category-button.active .category-count {
  color: var(--color-brand);
}

.icon-scale-strip,
.icon-container-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.scale-sample {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid var(--border-color-component);
  border-radius: 8px;
  background: var(--bg-color-container);
  color: var(--text-color-secondary);
}

.scale-sample span {
  font-size: 12px;
}

.sample-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-color-component);
  border-radius: var(--round-default);
  background: var(--bg-color-container);
  color: var(--text-color-secondary);
}

.sample-button.rounded {
  border-radius: var(--round-full);
}

.sample-field,
.sample-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  border: 1px solid var(--border-color-component);
  background: var(--bg-color-container);
  color: var(--text-color-secondary);
}

.sample-field {
  padding: 0 10px 0 12px;
  border-radius: var(--round-default);
}

.sample-field span,
.sample-tag {
  font-size: 13px;
}

.sample-tag {
  padding: 0 8px;
  border-radius: var(--round-default);
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
  min-height: 94px;
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

.icon-category {
  font-size: 10px;
  line-height: 1.2;
  color: var(--text-color-placeholder);
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
