<template>
  <RadioGroup v-model="btnDemo" variant="button" class="mt-2">
    <Radio value="daily" label="每日" />
    <Radio value="weekly" label="每周" />
    <Radio value="monthly" label="每月" />
  </RadioGroup>

  <div class="mt-4 flex flex-col items-start gap-3">
    <RadioGroup v-model="btnSizeSm" variant="button" size="sm">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
    <RadioGroup v-model="btnSizeMd" variant="button" size="md">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
    <RadioGroup v-model="btnSizeLg" variant="button" size="lg">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
  </div>

  <RadioGroup v-model="btnDisabled" variant="button" class="mt-4">
    <Radio value="daily" label="每日" />
    <Radio value="weekly" label="每周" disabled />
    <Radio value="monthly" label="每月" />
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const btnDemo = ref('weekly')

const btnSizeSm = ref('daily')

const btnSizeMd = ref('daily')

const btnSizeLg = ref('daily')

const btnDisabled = ref('daily')
</script>
