<template>
  <div class="flex items-center gap-8">
    <Badge :value="5" theme="error"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="5" color="#8b5cf6"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge dot color="#ec4899"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
  </div>
</template>
