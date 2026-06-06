<template>
  <div class="flex items-start gap-8">
    <Popper
      v-model:visible="v07ShiftOn"
      trigger="manual"
      placement="top"
      :flip="false"
      :shift="true"
    >
      <PopperTrigger>
        <Button size="sm" @click.stop="v07ShiftOn = !v07ShiftOn">shift="true"</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="flex h-36 w-40 flex-col justify-center rounded bg-[var(--text-color-primary)] px-3 py-3 text-xs text-white shadow-lg"
        >
          <span class="font-medium">被推入视野</span>
          <span class="mt-1 opacity-65">高浮层用于验证边界</span>
          <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v07ShiftOff" trigger="manual" placement="top" :flip="false">
      <PopperTrigger>
        <Button size="sm" @click.stop="v07ShiftOff = !v07ShiftOff">default shift=false</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="flex h-36 w-40 flex-col justify-center rounded bg-[var(--text-color-primary)] px-3 py-3 text-xs text-white shadow-lg"
        >
          <span class="font-medium">可能不可见</span>
          <span class="mt-1 opacity-65">高浮层用于验证边界</span>
          <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
  </div>
  <p class="mt-2 text-xs text-[var(--text-color-secondary)]">
    将此区域滚至视口顶端后点击按钮。高浮层会让 shift 差异更明显；shift="true" 弹层被推回可见；默认
    shift=false，弹层溢出视口外不可见。
  </p>
</template>

<script setup>
import { ref } from 'vue'

const v07ShiftOn = ref(false)

const v07ShiftOff = ref(false)
</script>
