import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import type { App, Component } from 'vue'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FieldAction,
  FieldContent,
  FieldGroup,
  FieldNativeInput,
  FieldPrefix,
  FieldRoot,
  FieldSegment,
  FieldSuffix,
  Icon,
  Input,
  InputNumber,
  Select,
  Callout,
  Divider,
  Link,
  Popper,
  PopperArrow,
  PopperContent,
  PopperTrigger,
  Radio,
  RadioGroup,
  ScrollArea,
  Space,
  Switch,
  Tag,
  Text,
  Title,
  Tooltip,
} from '@/components'
import '@/styles/horizon.css'
import IconGrid from './components/IconGrid.vue'
import ComponentDemo from './components/ComponentDemo.vue'

const demoModules = import.meta.glob('../../examples/**/*.vue', {
  eager: true,
}) as Record<string, { default: Component }>
const demoSourceModules = import.meta.glob('../../examples/**/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function getDemoPath(filePath: string) {
  return filePath.replace(/^\.\.\/\.\.\/examples\//, '').replace(/\.vue$/, '')
}

function toPascalCase(value: string) {
  return value
    .split(/[-/]/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('')
}

function registerDemoExamples(app: App) {
  const demoSources: Record<string, string> = {}

  for (const [filePath, module] of Object.entries(demoModules)) {
    const demoPath = getDemoPath(filePath)
    app.component(`Demo${toPascalCase(demoPath)}`, module.default)
  }

  for (const [filePath, source] of Object.entries(demoSourceModules)) {
    demoSources[getDemoPath(filePath)] = source
  }

  app.provide('demoSources', demoSources)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    registerDemoExamples(app)
    app.component('Button', Button)
    app.component('Icon', Icon)
    app.component('Checkbox', Checkbox)
    app.component('CheckboxGroup', CheckboxGroup)
    app.component('FieldRoot', FieldRoot)
    app.component('FieldContent', FieldContent)
    app.component('FieldNativeInput', FieldNativeInput)
    app.component('FieldPrefix', FieldPrefix)
    app.component('FieldSuffix', FieldSuffix)
    app.component('FieldAction', FieldAction)
    app.component('FieldGroup', FieldGroup)
    app.component('FieldSegment', FieldSegment)
    app.component('Radio', Radio)
    app.component('RadioGroup', RadioGroup)
    app.component('ScrollArea', ScrollArea)
    app.component('Text', Text)
    app.component('Title', Title)
    app.component('Callout', Callout)
    app.component('Link', Link)
    app.component('Switch', Switch)
    app.component('Tag', Tag)
    app.component('Input', Input)
    app.component('InputNumber', InputNumber)
    app.component('Select', Select)
    app.component('Tooltip', Tooltip)
    app.component('Popper', Popper)
    app.component('PopperTrigger', PopperTrigger)
    app.component('PopperContent', PopperContent)
    app.component('PopperArrow', PopperArrow)
    app.component('Divider', Divider)
    app.component('Space', Space)
    app.component('IconGrid', IconGrid)
    app.component('ComponentDemo', ComponentDemo)
  },
} satisfies Theme
