<template>
  <Checkbox v-model:checked="checkAll" :indeterminate="indeterminate1" label="全选" />

  <div class="mt-2 ml-6 flex flex-col gap-2">
    <CheckboxGroup v-model="allChecked" @change="onGroupChange">
      <Checkbox value="A" label="选项 A" />
      <Checkbox value="B" label="选项 B" />
      <Checkbox value="C" label="选项 C" />
    </CheckboxGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const allChecked = ref([])

const indeterminate1 = ref(false)

const checkAll = ref(false)

function onGroupChange(val) {
  if (val.length === 0) {
    indeterminate1.value = false
    checkAll.value = false
  } else if (val.length === 3) {
    indeterminate1.value = false
    checkAll.value = true
  } else {
    indeterminate1.value = true
    checkAll.value = false
  }
}
</script>
