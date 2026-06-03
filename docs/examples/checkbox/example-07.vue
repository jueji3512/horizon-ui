<template>
  <CheckboxGroup v-model="btnDemo" variant="button" class="mt-2">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>

  <div class="mt-4 flex flex-col items-start gap-3">
    <CheckboxGroup v-model="btnSizeSm" variant="button" size="sm">
      <Checkbox value="a" label="小" />
      <Checkbox value="b" label="小" />
    </CheckboxGroup>
    <CheckboxGroup v-model="btnSizeMd" variant="button" size="md">
      <Checkbox value="a" label="中" />
      <Checkbox value="b" label="中" />
    </CheckboxGroup>
    <CheckboxGroup v-model="btnSizeLg" variant="button" size="lg">
      <Checkbox value="a" label="大" />
      <Checkbox value="b" label="大" />
    </CheckboxGroup>
  </div>

  <CheckboxGroup v-model="btnDisabled" variant="button" class="mt-4">
    <Checkbox value="a" label="可用" />
    <Checkbox value="b" label="禁用" disabled />
    <Checkbox value="c" label="可用" />
  </CheckboxGroup>

  <div class="mt-4">
    <CheckboxGroup v-model="btnDisabledSelected" variant="button">
      <Checkbox value="x" disabled label="选中禁用" />
      <Checkbox value="y" disabled label="未选禁用" />
    </CheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const btnDemo = ref(['a', 'b'])

const btnSizeSm = ref(['a'])

const btnSizeMd = ref(['a'])

const btnSizeLg = ref(['a'])

const btnDisabled = ref(['a'])

const btnDisabledSelected = ref(['x'])
</script>
