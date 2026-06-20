<template>
  <div class="grid max-w-2xl gap-4">
    <Progress theme="brand" :percent="45" :show-label="true" aria-label="信息进度" />
    <Progress theme="success" :percent="100" aria-label="完成进度" />
    <Progress theme="warning" :percent="76" aria-label="警告进度" />
    <Progress theme="error" :percent="22" aria-label="错误进度" />
  </div>
</template>
