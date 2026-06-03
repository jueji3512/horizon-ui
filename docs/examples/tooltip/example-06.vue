<template>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="延迟 500ms 显示" :show-delay="500">
      <Button theme="default">延迟显示</Button>
    </Tooltip>
    <Tooltip content="延迟 300ms 隐藏" :hide-delay="300">
      <Button theme="default">延迟隐藏</Button>
    </Tooltip>
  </div>
</template>
