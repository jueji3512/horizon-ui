<template>
  <FieldRoot>
    <FieldPrefix>
      <Icon name="search" />
    </FieldPrefix>
    <FieldNativeInput v-model="search" placeholder="搜索" />
    <FieldSuffix class="gap-1">
      <FieldAction :class="search ? '' : 'invisible'" aria-label="清空" @click="search = ''">
        <Icon name="close" />
      </FieldAction>
      <Icon name="search" />
    </FieldSuffix>
  </FieldRoot>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('Horizon')
</script>
