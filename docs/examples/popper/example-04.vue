<template>
  <Popper v-model:visible="v04Manual" trigger="manual" placement="bottom-start" match-width>
    <PopperTrigger>
      <Input
        :model-value="v04Selected"
        readonly
        class="cursor-pointer"
        :style="{ width: v04Wide ? '18rem' : '12rem' }"
        @click="v04Manual = !v04Manual"
      />
    </PopperTrigger>
    <PopperContent>
      <div class="max-h-48 overflow-auto rounded-lg bg-white py-1 shadow-xl">
        <Button size="sm" class="mx-2 my-1" @click="v04Wide = !v04Wide">{{
          v04Wide ? '缩小 trigger' : '放大 trigger'
        }}</Button>
        <div
          v-for="p in placements"
          :key="p"
          class="cursor-pointer px-3 py-1.5 text-sm transition-colors hover:bg-[var(--bg-color-secondarycontainer)]"
          :class="{ 'font-medium text-brand': p === v04Selected }"
          @click="selectPlacement(p)"
        >
          {{ p }}
        </div>
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup>
import { ref } from 'vue'

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

const v04Manual = ref(false)

const v04Selected = ref('bottom')

const v04Wide = ref(false)

function selectPlacement(placement) {
  v04Selected.value = placement
  v04Manual.value = false
}
</script>
