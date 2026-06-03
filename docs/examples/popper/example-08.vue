<template>
  <div class="h-48 overflow-auto rounded-lg border border-[var(--border-color-component)]">
    <div class="flex items-start justify-center gap-8 pt-40 pb-4" style="min-height: 460px">
      <Popper
        v-model:visible="v08AutoOn"
        trigger="manual"
        placement="bottom"
        :auto-update="true"
        :offset="6"
      >
        <PopperTrigger>
          <Button size="sm" @click.stop="v08AutoOn = !v08AutoOn">autoUpdate="true"</Button>
        </PopperTrigger>
        <PopperContent>
          <div
            class="rounded bg-[var(--text-color-primary)] px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
          >
            跟随滚动 <PopperArrow />
          </div>
        </PopperContent>
      </Popper>
      <Popper
        v-model:visible="v08AutoOff"
        trigger="manual"
        placement="bottom"
        :auto-update="false"
        :offset="6"
      >
        <PopperTrigger>
          <Button size="sm" @click.stop="v08AutoOff = !v08AutoOff">autoUpdate="false"</Button>
        </PopperTrigger>
        <PopperContent>
          <div
            class="rounded bg-[var(--text-color-primary)] px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
          >
            留在原地 <PopperArrow />
          </div>
        </PopperContent>
      </Popper>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const v08AutoOn = ref(false)

const v08AutoOff = ref(false)
</script>
