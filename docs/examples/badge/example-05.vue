<template>
  <div class="flex items-center gap-8">
    <Badge :value="5"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="5" :offset="[6, -6]"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
    <Badge :value="5" :offset="[-6, 6]"
      ><div class="h-10 w-10 rounded-[var(--round-2)] bg-[var(--bg-color-secondarycontainer)]"
    /></Badge>
  </div>
</template>
