<template>
  <FieldRoot multiline>
    <FieldContent multiline class="px-2">
      <Tag v-for="(tag, index) in tags" :key="tag" closable @close="removeTag(index)">
        {{ tag }}
      </Tag>
      <FieldNativeInput
        v-model="tagInput"
        class="h-6 min-w-24 flex-1 px-0"
        placeholder="添加标签"
        @enter="addTag"
      />
    </FieldContent>
    <FieldSuffix>
      <FieldAction
        :class="tags.length ? '' : 'invisible'"
        :disabled="tags.length === 0"
        aria-label="清空标签"
        @click="tags = []"
      >
        <Icon name="close" />
      </FieldAction>
    </FieldSuffix>
  </FieldRoot>
</template>

<script setup>
import { ref } from 'vue'

const tagInput = ref('')

const tags = ref(['Vue', 'Token', 'Form'])

function addTag() {
  const value = tagInput.value.trim()
  if (!value) return
  tags.value.push(value)
  tagInput.value = ''
}

function removeTag(index) {
  tags.value.splice(index, 1)
}
</script>
