<template>
  <div class="flex items-start gap-4">
    <Popper v-model:visible="v11Sm" trigger="manual" placement="bottom" :offset="4">
      <PopperTrigger>
        <Button size="sm" @click.stop="v11Sm = !v11Sm">offset=4</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="rounded bg-[var(--text-color-primary)] px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
        >
          间距 4px <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v11Lg" trigger="manual" placement="bottom" :offset="20">
      <PopperTrigger>
        <Button size="sm" @click.stop="v11Lg = !v11Lg">offset=20</Button>
      </PopperTrigger>
      <PopperContent>
        <div
          class="rounded bg-[var(--text-color-primary)] px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
        >
          间距 20px <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const v11Sm = ref(false)

const v11Lg = ref(false)
</script>
