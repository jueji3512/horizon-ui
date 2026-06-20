<template>
  <div class="grid max-w-2xl gap-4">
    <Progress :percent="45" :show-label="true" aria-label="默认进度" />
    <Progress status="success" :percent="100" aria-label="完成进度" />
    <Progress status="warning" :percent="76" aria-label="警告进度" />
    <Progress status="error" :percent="22" aria-label="错误进度" />
  </div>
</template>
