<template>
  <div class="flex flex-wrap items-baseline gap-3">
    <Text strong>strong 加粗</Text>
    <Text italic>italic 斜体</Text>
    <Text underline>underline 下划线</Text>
    <Text delete>delete 删除线</Text>
    <Text code>code 代码</Text>
    <Text mark>mark 高亮</Text>
    <Text keyboard>Ctrl + S</Text>
  </div>

  <div class="flex flex-wrap items-baseline gap-3" style="margin-top: 12px">
    <Text strong italic underline>组合：粗+斜+下划线</Text>
    <Text theme="error" delete strong>⚠ 重要通知已失效</Text>
  </div>
</template>
