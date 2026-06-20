<template>
  <div class="flex max-w-xl flex-col gap-4">
    <Progress :percent="36" aria-label="导入进度" />
    <Progress :percent="68" status="success" aria-label="同步进度" />
  </div>
</template>
