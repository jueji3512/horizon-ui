<template>
  <div class="grid gap-6">
    <div class="grid max-w-xl gap-3">
      <Progress :percent="percent" :status="status" show-label aria-label="同步任务线性进度" />
      <div class="flex items-center justify-between gap-3">
        <span class="font-body-sm text-[var(--text-color-secondary)]">{{ statusText }}</span>
        <div class="flex items-center gap-2">
          <Button size="sm" variant="outline" @click="toggleRunning">
            {{ running ? 'Pause' : 'Resume' }}
          </Button>
          <Button size="sm" theme="default" variant="outline" @click="stepProgress">Step</Button>
          <Button size="sm" theme="default" variant="outline" @click="resetProgress">
            Reset
          </Button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-6">
      <Progress
        variant="circle"
        :percent="percent"
        :status="status"
        :size="{ diameter: 128, thickness: 7, labelSize: 15 }"
        aria-label="同步任务环形进度"
      />
      <Progress
        variant="circle"
        :percent="uploadPercent"
        :status="uploadStatus"
        :size="{ diameter: 96, thickness: 6, labelSize: 13 }"
        aria-label="上传任务环形进度"
      />
      <Progress
        class="max-w-xs"
        :percent="uploadPercent"
        :status="uploadStatus"
        :size="{ thickness: 8, labelSize: 14 }"
        show-label
        aria-label="上传任务线性进度"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const percent = ref(42)
const uploadPercent = ref(18)
const running = ref(true)
let timer: ReturnType<typeof setInterval> | undefined

const status = computed(() => (percent.value >= 100 ? 'success' : undefined))
const uploadStatus = computed(() => (uploadPercent.value >= 88 ? 'warning' : undefined))
const statusText = computed(() => {
  if (percent.value >= 100) return 'Deployment finished'
  return running.value ? 'Deployment is running' : 'Deployment paused'
})

function advance() {
  if (!running.value) return

  percent.value = Math.min(100, percent.value + 7)
  uploadPercent.value = uploadPercent.value >= 96 ? 12 : uploadPercent.value + 11

  if (percent.value >= 100) {
    running.value = false
  }
}

function toggleRunning() {
  running.value = !running.value
}

function stepProgress() {
  advance()
}

function resetProgress() {
  percent.value = 0
  uploadPercent.value = 18
  running.value = true
}

onMounted(() => {
  timer = setInterval(advance, 900)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
