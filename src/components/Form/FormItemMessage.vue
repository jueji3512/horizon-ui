<template>
  <div
    :id="id"
    class="form-item-message font-body-sm absolute top-full right-0 left-0 h-5 truncate pt-0 leading-5"
    :class="messageClasses"
    aria-live="polite"
  >
    <slot :status="status" :message="message" :help="help" :validate-message="validateMessage">
      {{ message }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils'
import type { FormStatus } from './types'

const props = withDefaults(
  defineProps<{
    id: string
    status?: FormStatus
    message?: string
    help?: string
    validateMessage?: string
  }>(),
  {
    status: undefined,
    message: '',
    help: '',
    validateMessage: '',
  },
)

const messageClasses = computed(() =>
  cn(
    !props.message && 'text-transparent',
    props.status === 'success' && 'text-success',
    props.status === 'warning' && 'text-warning',
    props.status === 'error' && 'text-error',
    !props.status && props.message && 'text-[var(--text-color-secondary)]',
  ),
)
</script>
