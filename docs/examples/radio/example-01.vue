<template>
  <RadioGroup v-model="basicDemo" class="mt-2">
    <Radio value="a" label="选项 A" />
    <Radio value="b" label="选项 B" />
    <Radio value="c" label="选项 C" />
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const basicDemo = ref('a')
</script>
