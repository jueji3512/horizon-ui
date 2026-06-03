<template>
  <div class="flex flex-wrap gap-3">
    <Tooltip>
      <Button theme="default">富文本</Button>
      <template #content>
        <div>标题：操作说明</div>
        <div class="text-[var(--text-color-secondary)]">第二步：确认提交</div>
      </template>
    </Tooltip>
  </div>
</template>
