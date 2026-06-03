<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c1" closable @close="c1 = false">默认</Tag>
      <Tag v-if="c2" closable @close="c2 = false" theme="brand">品牌</Tag>
      <Tag v-if="c13" closable @close="c13 = false" theme="success">成功</Tag>
      <Tag v-if="c10" closable @close="c10 = false" theme="warning">警告</Tag>
      <Tag v-if="c3" closable @close="c3 = false" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c14" closable @close="c14 = false" variant="dark">默认</Tag>
      <Tag v-if="c4" closable @close="c4 = false" variant="dark" theme="brand">品牌</Tag>
      <Tag v-if="c5" closable @close="c5 = false" variant="dark" theme="success">成功</Tag>
      <Tag v-if="c11" closable @close="c11 = false" variant="dark" theme="warning">警告</Tag>
      <Tag v-if="c6" closable @close="c6 = false" variant="dark" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c15" closable @close="c15 = false" variant="outline">默认</Tag>
      <Tag v-if="c7" closable @close="c7 = false" variant="outline" theme="brand">品牌</Tag>
      <Tag v-if="c8" closable @close="c8 = false" variant="outline" theme="success">成功</Tag>
      <Tag v-if="c12" closable @close="c12 = false" variant="outline" theme="warning">警告</Tag>
      <Tag v-if="c9" closable @close="c9 = false" variant="outline" theme="error">错误</Tag>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const c1 = ref(true)

const c2 = ref(true)

const c3 = ref(true)

const c4 = ref(true)

const c5 = ref(true)

const c6 = ref(true)

const c7 = ref(true)

const c8 = ref(true)

const c9 = ref(true)

const c10 = ref(true)

const c11 = ref(true)

const c12 = ref(true)

const c13 = ref(true)

const c14 = ref(true)

const c15 = ref(true)
</script>
