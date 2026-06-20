<template>
  <div class="grid gap-6">
    <div class="grid max-w-xl gap-3">
      <Progress size="sm" :percent="30" aria-label="小尺寸线性进度" />
      <Progress size="md" :percent="54" aria-label="中尺寸线性进度" />
      <Progress size="lg" :percent="82" aria-label="大尺寸线性进度" />
    </div>

    <div class="flex flex-wrap items-center gap-6">
      <Progress variant="circle" size="sm" :percent="30" aria-label="小尺寸环形进度" />
      <Progress variant="circle" size="md" :percent="54" aria-label="中尺寸环形进度" />
      <Progress variant="circle" size="lg" :percent="82" aria-label="大尺寸环形进度" />
      <Progress variant="circle" :size="120" :percent="66" aria-label="自定义直径环形进度" />
    </div>
  </div>
</template>
