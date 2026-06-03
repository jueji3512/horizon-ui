<template>
  <div class="flex items-center gap-4">
    <Switch v-model="disabledOn" disabled />
    <Switch v-model="disabledOff" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabledOn = ref(true)

const disabledOff = ref(false)
</script>
