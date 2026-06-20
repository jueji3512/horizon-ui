<template>
  <div class="grid gap-4">
    <div class="grid max-w-xl gap-4">
      <Progress :percent="-20" :show-label="true" aria-label="低于零的进度" />
      <Progress :percent="132" theme="success" :show-label="true" aria-label="超过一百的进度" />
      <Progress :percent="64" :active="false" :show-label="true" aria-label="关闭流动动画的进度" />
      <Progress :percent="64" theme="warning" aria-label="状态进度不流动" />
    </div>

    <div class="flex flex-wrap items-center gap-6">
      <Progress variant="circle" :percent="64" aria-label="环形流动进度" />
      <Progress
        variant="circle"
        :percent="64"
        :active="false"
        aria-label="关闭流动动画的环形进度"
      />
    </div>
  </div>
</template>
