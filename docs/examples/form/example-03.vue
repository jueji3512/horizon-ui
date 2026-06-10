<template>
  <Form ref="formRef" :model="model" :rules="rules" class="max-w-[720px]" @submit.prevent>
    <FormItem name="user.email" label="Email" required help="Used for account notifications.">
      <Input v-model="model.user.email" placeholder="name@example.com" />
    </FormItem>

    <FormItem
      :name="['user', 'quota']"
      label="Quota"
      help="Async validator rejects values below 10."
    >
      <InputNumber v-model="model.user.quota" :min="0" :max="100" />
    </FormItem>

    <FormItem name="user.role" label="Role">
      <Select v-model="model.user.role">
        <SelectOption value="viewer">Viewer</SelectOption>
        <SelectOption value="editor">Editor</SelectOption>
        <SelectOption value="admin">Admin</SelectOption>
      </Select>
    </FormItem>

    <FormItem>
      <div class="flex flex-wrap gap-2">
        <Button theme="brand" @click="validate">Validate</Button>
        <Button variant="outline" @click="validateEmail">Validate email</Button>
        <Button variant="outline" @click="reset">Reset</Button>
        <Button variant="outline" @click="clear">Clear message</Button>
      </div>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  SelectOption,
  type FormRules,
} from '@/components'

const formRef = ref<InstanceType<typeof Form> | null>(null)

const model = reactive({
  user: {
    email: '',
    quota: 5,
    role: 'viewer',
  },
})

const rules: FormRules = {
  'user.email': [
    {
      required: true,
      message: 'Email is required.',
      trigger: 'blur',
    },
    {
      message: 'Enter a valid email address.',
      trigger: 'change',
      validator(value) {
        return typeof value === 'string' && value.includes('@')
      },
    },
  ],
  'user.quota': {
    trigger: 'change',
    async validator(value) {
      await Promise.resolve()
      return Number(value) >= 10 || 'Quota must be at least 10.'
    },
  },
}

function validate() {
  void formRef.value?.validate()
}

function validateEmail() {
  void formRef.value?.validateField('user.email')
}

function reset() {
  formRef.value?.resetFields()
}

function clear() {
  formRef.value?.clearValidate()
}
</script>
