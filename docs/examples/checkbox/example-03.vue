<template>
  <CheckboxGroup v-model="dirVert" direction="vertical">
    <Checkbox value="a" label="垂直 A" />
    <Checkbox value="b" label="垂直 B" />
    <Checkbox value="c" label="垂直 C" />
  </CheckboxGroup>

  <CheckboxGroup v-model="dirHoriz" direction="horizontal" class="mt-3">
    <Checkbox value="a" label="水平 A" />
    <Checkbox value="b" label="水平 B" />
    <Checkbox value="c" label="水平 C" />
  </CheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const dirVert = ref(['a'])

const dirHoriz = ref(['a'])
</script>
