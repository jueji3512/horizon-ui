<template>
  <Form :model="model" class="max-w-[720px]">
    <FormItem name="workspace" label="Workspace" required help="Shown to every member.">
      <Input v-model="model.workspace" placeholder="Workspace name" />
    </FormItem>

    <FormItem name="owner" label="Owner" status="success" message="Owner is available.">
      <Select v-model="model.owner">
        <SelectOption value="alex">Alex Johnson</SelectOption>
        <SelectOption value="jane">Jane Cooper</SelectOption>
      </Select>
    </FormItem>

    <FormItem name="quota" label="Quota" status="warning" message="80% of the quota is used.">
      <InputNumber v-model="model.quota" :min="1" :max="10000" />
    </FormItem>

    <FormItem name="region" label="Region" help="Choose the nearest region.">
      <RadioGroup v-model="model.region">
        <Radio value="us">US East</Radio>
        <Radio value="eu">EU West</Radio>
        <Radio value="apac">Asia Pacific</Radio>
      </RadioGroup>
    </FormItem>

    <FormItem name="alerts" label="Alerts">
      <Switch v-model="model.alerts" />
    </FormItem>

    <FormItem name="terms" label="Terms" message="You must accept the terms before submitting.">
      <Checkbox v-model:checked="model.terms" label="I agree to the workspace terms." />
    </FormItem>

    <FormItem
      name="apiKey"
      label="API key"
      help="Readonly fields keep the normal visual treatment."
    >
      <Input v-model="model.apiKey" readonly />
      <template #action>
        <Button variant="outline" size="sm">Regenerate</Button>
      </template>
    </FormItem>

    <FormItem name="project" label="Project" help="Archived projects cannot be edited.">
      <Select v-model="model.project" disabled placeholder="Select a project">
        <SelectOption value="archive">Archived project</SelectOption>
      </Select>
    </FormItem>

    <FormItem>
      <div class="flex gap-2">
        <Button theme="brand">Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  Button,
  Checkbox,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Select,
  SelectOption,
  Switch,
} from '@/components'

const model = reactive({
  workspace: 'Acme Corporation',
  owner: 'alex',
  quota: 5000,
  region: 'us',
  alerts: true,
  terms: false,
  apiKey: 'hzn_8f3a7c9d6b2e4a1f9d7c',
  project: null,
})
</script>
