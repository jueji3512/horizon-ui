<template>
  <div class="w-64">
    <Space :wrap="true">
      <Button v-for="i in 8" :key="i">标签{{ i }}</Button>
    </Space>
  </div>
</template>
