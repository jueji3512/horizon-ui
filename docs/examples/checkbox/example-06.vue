<template>
  <Checkbox :checked="true" disabled label="禁用勾选" class="mr-4" />
  <Checkbox :checked="false" disabled label="禁用未勾选" />

  <CheckboxGroup v-model="disabledDemo" class="mt-3">
    <Checkbox value="a" label="可用" />
    <Checkbox value="b" label="禁用" disabled />
  </CheckboxGroup>

  <CheckboxGroup v-model="disabledGroup" disabled class="mt-3">
    <Checkbox value="a" label="整组禁用 A" />
    <Checkbox value="b" label="整组禁用 B" />
  </CheckboxGroup>
</template>

<script setup>
import { ref } from 'vue'

const disabledDemo = ref(['a'])

const disabledGroup = ref(['a'])
</script>
