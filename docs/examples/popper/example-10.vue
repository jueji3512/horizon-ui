<template>
  <div class="flex flex-col items-start gap-3">
    <Button size="sm" @click="v10All = !v10All">{{ v10All ? '全部关闭' : '全部打开' }}</Button>
    <div class="flex items-start gap-4">
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div
            class="flex h-8 w-12 items-center justify-center rounded bg-red-500 text-xs font-medium text-white"
          >
            红
          </div>
        </PopperTrigger>
        <PopperContent>
          <div
            class="rounded bg-red-500 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
          >
            红色浮层
          </div>
        </PopperContent>
      </Popper>
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div
            class="flex h-8 w-12 items-center justify-center rounded bg-blue-500 text-xs font-medium text-white"
          >
            蓝
          </div>
        </PopperTrigger>
        <PopperContent>
          <div
            class="rounded bg-blue-500 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
          >
            蓝色浮层
          </div>
        </PopperContent>
      </Popper>
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div
            class="flex h-8 w-12 items-center justify-center rounded bg-emerald-500 text-xs font-medium text-white"
          >
            绿
          </div>
        </PopperTrigger>
        <PopperContent>
          <div
            class="rounded bg-emerald-500 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
          >
            绿色浮层
          </div>
        </PopperContent>
      </Popper>
    </div>
  </div>
  <p class="mt-2 text-xs text-[var(--text-color-secondary)]">
    三个弹层同时出现，绿色覆盖蓝色、蓝色覆盖红色；具体 z-index 数值由当前页面已创建的 Popper
    实例顺序决定。
  </p>
</template>

<script setup>
import { ref } from 'vue'

const v10All = ref(false)
</script>
