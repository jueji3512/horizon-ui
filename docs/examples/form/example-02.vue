<template>
  <div class="flex max-w-[720px] flex-col gap-8">
    <Form :model="profile" label-align="left">
      <FormItem name="name" label="Name" help="This form overrides labelAlign to left.">
        <Input v-model="profile.name" />
      </FormItem>
      <FormItem name="role" label="Role">
        <Select v-model="profile.role">
          <SelectOption value="admin">Admin</SelectOption>
          <SelectOption value="editor">Editor</SelectOption>
        </Select>
      </FormItem>
    </Form>

    <Form :model="config">
      <FormItem
        name="endpoint"
        label="Endpoint"
        label-align="top"
        help="Top labels ignore labelWidth."
      >
        <Input v-model="config.endpoint" />
      </FormItem>
      <FormItem
        name="retry"
        label="Retry count"
        label-align="top"
        status="warning"
        message="Use 1-5 retries."
      >
        <InputNumber v-model="config.retry" :min="1" :max="5" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormItem, Input, InputNumber, Select, SelectOption } from '@/components'

const profile = reactive({
  name: 'Jane Cooper',
  role: 'admin',
})

const config = reactive({
  endpoint: 'https://api.example.com',
  retry: 3,
})
</script>
