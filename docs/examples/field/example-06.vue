<template>
  <FieldGroup class="w-full gap-1">
    <FieldRoot class="flex-1">
      <FieldNativeInput v-model="grouped" placeholder="搜索关键词" />
    </FieldRoot>
    <Button class="shrink-0" theme="brand">搜索</Button>
  </FieldGroup>
</template>

<script setup>
import { ref } from 'vue'

const grouped = ref('')
</script>
