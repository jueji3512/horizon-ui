<template>
  <Button theme="brand" @click="open = true">Invite member</Button>

  <Dialog
    v-model:open="open"
    title="Invite member"
    description="Choose a role before sending the invitation."
  >
    <Form :model="form" label-align="top">
      <FormItem name="email" label="Email address">
        <Input v-model="form.email" placeholder="name@company.com" />
      </FormItem>
      <FormItem name="role" label="Role" help="Developers can create and manage resources.">
        <Select v-model="form.role">
          <SelectOption value="owner">Owner</SelectOption>
          <SelectOption value="admin">Admin</SelectOption>
          <SelectOption value="developer">Developer</SelectOption>
          <SelectOption value="viewer">Viewer</SelectOption>
        </Select>
      </FormItem>
    </Form>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Send invite</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button, Dialog, Form, FormItem, Input, Select, SelectOption } from '@/components'

const open = ref(false)
const form = reactive({
  email: '',
  role: 'developer',
})
</script>
