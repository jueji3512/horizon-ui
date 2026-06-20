<template>
  <div class="grid gap-6">
    <div class="flex flex-wrap items-center gap-6">
      <Progress variant="circle" :percent="28" aria-label="生成进度" />
      <Progress variant="circle" :percent="72" status="success" aria-label="部署进度" />
      <Progress variant="circle" :percent="91" status="warning" aria-label="审核进度" />
      <Progress variant="circle" :percent="18" status="error" aria-label="失败进度" />
    </div>

    <div class="flex flex-wrap items-center gap-6">
      <Progress variant="circle" status="warning" :percent="66" aria-label="自定义标签环形进度">
        <template #label="{ roundedPercent }">
          <span class="font-body-md font-semibold">{{ roundedPercent }}%</span>
          <span class="font-body-xs">Review</span>
        </template>
      </Progress>
      <Progress
        variant="circle"
        status="success"
        :percent="58"
        :size="{ diameter: 120 }"
        color="#0f766e"
        aria-label="自定义颜色环形进度"
      />
    </div>
  </div>
</template>
