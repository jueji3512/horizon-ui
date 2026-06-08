<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="errorValue" status="error">
      <SelectOption value="approved">已通过</SelectOption>
      <SelectOption value="pending">待审核</SelectOption>
      <SelectOption value="rejected">已拒绝</SelectOption>
    </Select>

    <Select v-model="warningValue" status="warning">
      <SelectOption value="approved">已通过</SelectOption>
      <SelectOption value="pending">待审核</SelectOption>
      <SelectOption value="rejected">已拒绝</SelectOption>
    </Select>

    <Select v-model="successValue" status="success">
      <SelectOption value="approved">已通过</SelectOption>
      <SelectOption value="pending">待审核</SelectOption>
      <SelectOption value="rejected">已拒绝</SelectOption>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, type SelectValue } from '@/components'

const errorValue = ref<SelectValue | null>('rejected')
const warningValue = ref<SelectValue | null>('pending')
const successValue = ref<SelectValue | null>('approved')
</script>
