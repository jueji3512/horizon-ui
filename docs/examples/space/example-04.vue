<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <span class="w-16 text-xs text-[var(--text-color-secondary)]">start</span>
      <div class="rounded bg-[var(--bg-color-secondarycontainer)] p-2">
        <Space align="start">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-16 text-xs text-[var(--text-color-secondary)]">center</span>
      <div class="rounded bg-[var(--bg-color-secondarycontainer)] p-2">
        <Space align="center">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-16 text-xs text-[var(--text-color-secondary)]">end</span>
      <div class="rounded bg-[var(--bg-color-secondarycontainer)] p-2">
        <Space align="end">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-16 text-xs text-[var(--text-color-secondary)]">baseline</span>
      <div class="rounded bg-[var(--bg-color-secondarycontainer)] p-2">
        <Space align="baseline">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
  </div>
</template>
