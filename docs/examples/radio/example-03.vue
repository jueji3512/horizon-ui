<template>
  <RadioGroup v-model="disabledDemo">
    <Radio value="a" label="可用" />
    <Radio value="b" label="禁用" disabled />
  </RadioGroup>
  <RadioGroup v-model="disabledGroup" disabled class="mt-3">
    <Radio value="a" label="整组禁用" />
    <Radio value="b" label="全部不可用" />
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const disabledDemo = ref('a')

const disabledGroup = ref('a')
</script>
