<template>
  <div class="flex flex-wrap items-center gap-3">
    <Tooltip content="悬停触发" trigger="hover">
      <Button theme="default">Hover</Button>
    </Tooltip>
    <Tooltip content="点击触发" trigger="click">
      <Button theme="default">Click</Button>
    </Tooltip>
    <Tooltip content="聚焦触发" trigger="focus">
      <Button theme="default">Focus</Button>
    </Tooltip>
  </div>
</template>
