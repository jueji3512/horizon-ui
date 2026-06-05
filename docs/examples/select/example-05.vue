<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="errorValue" status="error" :options="reviewOptions" />
    <Select v-model="warningValue" status="warning" :options="reviewOptions" />
    <Select v-model="successValue" status="success" :options="reviewOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectOption, type SelectValue } from '@/components'

const errorValue = ref<SelectValue | null>('rejected')
const warningValue = ref<SelectValue | null>('pending')
const successValue = ref<SelectValue | null>('approved')

const reviewOptions: SelectOption[] = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' },
]
</script>
