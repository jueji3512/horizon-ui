<template>
  <div class="grid gap-6">
    <div class="grid max-w-xl gap-3">
      <Progress size="sm" :percent="30" aria-label="小尺寸线性进度" />
      <Progress size="md" :percent="54" aria-label="中尺寸线性进度" />
      <Progress size="lg" :percent="82" aria-label="大尺寸线性进度" />
      <Progress
        :size="{ thickness: 10, labelSize: 16 }"
        :percent="68"
        show-label
        aria-label="自定义线性进度尺寸"
      />
    </div>

    <div class="flex flex-wrap items-center gap-6">
      <Progress variant="circle" size="sm" :percent="30" aria-label="小尺寸环形进度" />
      <Progress variant="circle" size="md" :percent="54" aria-label="中尺寸环形进度" />
      <Progress variant="circle" size="lg" :percent="82" aria-label="大尺寸环形进度" />
      <Progress
        variant="circle"
        :size="{ diameter: 120 }"
        :percent="66"
        aria-label="自定义直径环形进度"
      />
      <Progress
        variant="circle"
        :size="{ diameter: 144, thickness: 8, labelSize: 18 }"
        :percent="76"
        aria-label="自定义完整尺寸环形进度"
      />
    </div>
  </div>
</template>
