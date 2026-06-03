<template>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="默认深色" theme="default">
      <Button>Default</Button>
    </Tooltip>
    <Tooltip content="品牌信息" theme="brand">
      <Button theme="default">Brand</Button>
    </Tooltip>
    <Tooltip content="成功信息" theme="success">
      <Button theme="default">Success</Button>
    </Tooltip>
    <Tooltip content="警告信息" theme="warning">
      <Button theme="default">Warning</Button>
    </Tooltip>
    <Tooltip content="错误警告" theme="error">
      <Button theme="default">Error</Button>
    </Tooltip>
  </div>
</template>
