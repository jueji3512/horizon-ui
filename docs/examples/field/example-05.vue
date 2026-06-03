<template>
  <FieldRoot>
    <FieldSegment>
      <FieldNativeInput v-model="rangeStart" class="px-0 text-center" />
    </FieldSegment>
    <span class="shrink-0 text-[var(--text-color-secondary)]">至</span>
    <FieldSegment>
      <FieldNativeInput v-model="rangeEnd" class="px-0 text-center" />
    </FieldSegment>
  </FieldRoot>
</template>

<script setup>
import { ref } from 'vue'

const rangeStart = ref('2026-06-02')

const rangeEnd = ref('2026-06-30')
</script>
