<template>
  <div class="flex items-center gap-8">
    <Badge :value="1" theme="default"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="2" theme="brand"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="3" theme="success"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="4" theme="warning"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="5" theme="error"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components'
</script>
