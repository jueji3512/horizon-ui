<template>
  <div>
    <div class="search-bar">
      <input v-model="search" class="search-input" placeholder="搜索图标..." autocomplete="off" />
      <span class="search-count">{{ filteredIcons.length }}/{{ iconNames.length }} 个</span>
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
      </div>
    </div>

    <div v-if="copiedName" class="copy-toast">{{ copiedName }} 已复制</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const copiedName = ref('')
const previewSizes = [12, 16, 20, 24, 32]

const icons = import.meta.glob('../../../../src/components/Icon/icons/*.svg', {
  query: '?raw',
  eager: true,
})
const iconNames = Object.keys(icons)
  .map((k) => k.replace(/.*\/|\.svg/g, ''))
  .sort()

const filteredIcons = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return iconNames
  return iconNames.filter((n) => n.includes(q))
})

function copy(name: string) {
  navigator.clipboard.writeText(name)
  copiedName.value = name
  setTimeout(() => (copiedName.value = ''), 1500)
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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 4px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
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
