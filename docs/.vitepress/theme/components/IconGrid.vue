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
        <Icon :name="name" size="lg" />
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
const iconNames = Object.keys(icons)
  .map(k => k.replace(/.*\/|\.svg/g, ''))
  .sort()

const filteredIcons = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return iconNames
  return iconNames.filter(n => n.includes(q))
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
  border: 1px solid var(--color-slate-200);
  border-radius: 8px;
  background: #fff;
  color: var(--color-slate-600);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--color-blue-400);
  box-shadow: 0 0 0 2px var(--color-blue-100);
}

.search-input::placeholder {
  color: var(--color-slate-400);
}

.search-count {
  font-size: 13px;
  color: var(--color-slate-400);
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
  color: var(--color-slate-600);
  transition:
    color 0.15s,
    background 0.15s,
    border-color 0.15s;
  border: 1px solid transparent;
}

.icon-card:hover {
  color: var(--color-blue-600);
  background: var(--color-blue-50);
  border-color: var(--color-blue-200);
}

.icon-card.copied {
  color: var(--color-emerald-500);
  background: var(--color-emerald-50);
  border-color: var(--color-emerald-200);
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
  background: var(--color-slate-800);
  color: #fff;
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
