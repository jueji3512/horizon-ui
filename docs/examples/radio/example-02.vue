<template>
  <RadioGroup v-model="dirV" direction="vertical">
    <Radio value="a" label="垂直 A" />
    <Radio value="b" label="垂直 B" />
    <Radio value="c" label="垂直 C" />
  </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'

const dirV = ref('a')
</script>
