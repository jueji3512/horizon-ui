<template>
  <div class="grid max-w-xl gap-5">
    <Progress :percent="58" color="#0f766e" :show-label="true" aria-label="自定义颜色线性进度">
      <template #label="{ roundedPercent }">{{ roundedPercent }}% custom</template>
    </Progress>
    <Progress
      variant="circle"
      :percent="64"
      color="#0891b2"
      status="success"
      aria-label="自定义颜色环形进度"
    />
  </div>
</template>
