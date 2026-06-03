<template>
  <div class="flex items-start gap-8">
    <Popper v-model:visible="v06FlipOn" trigger="manual" placement="top">
      <PopperTrigger>
        <Button size="sm" @click.stop="v06FlipOn = !v06FlipOn">flip="true"</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="flex h-36 w-40 flex-col justify-center rounded bg-[var(--text-color-primary)] px-3 py-3 text-xs text-white shadow-lg"
        >
          <span class="font-medium">自动翻转</span>
          <span class="mt-1 opacity-65">高浮层用于验证边界</span>
          <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v06FlipOff" trigger="manual" placement="top" :flip="false">
      <PopperTrigger>
        <Button size="sm" @click.stop="v06FlipOff = !v06FlipOff">flip="false"</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="flex h-36 w-40 flex-col justify-center rounded bg-[var(--text-color-primary)] px-3 py-3 text-xs text-white shadow-lg"
        >
          <span class="font-medium">保持 top</span>
          <span class="mt-1 opacity-65">高浮层用于验证边界</span>
          <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
  </div>
  <p class="mt-2 text-xs text-[var(--text-color-secondary)]">
    将此区域滚至视口顶端后点击，高浮层会让 flip 差异更明显；flip="false" 的弹层会溢出上方。
  </p>
</template>

<script setup>
import { ref } from 'vue'

const v06FlipOn = ref(false)

const v06FlipOff = ref(false)
</script>
