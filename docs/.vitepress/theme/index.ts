import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import {
  Badge,
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
  Callout,
  Divider,
  Link,
  Popper,
  PopperArrow,
  PopperContent,
  PopperTrigger,
  Radio,
  RadioGroup,
  Space,
  Switch,
  Tag,
  Text,
  Title,
  Tooltip,
} from '@/components'
import '@/styles/horizon.css'
import './vitepress.css'
import IconGrid from './components/IconGrid.vue'
import DemoBox from './components/DemoBox.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Button', Button)
    app.component('Badge', Badge)
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
    app.component('Text', Text)
    app.component('Title', Title)
    app.component('Callout', Callout)
    app.component('Link', Link)
    app.component('Switch', Switch)
    app.component('Tag', Tag)
    app.component('Input', Input)
    app.component('InputNumber', InputNumber)
    app.component('Tooltip', Tooltip)
    app.component('Popper', Popper)
    app.component('PopperTrigger', PopperTrigger)
    app.component('PopperContent', PopperContent)
    app.component('PopperArrow', PopperArrow)
    app.component('Divider', Divider)
    app.component('Space', Space)
    app.component('IconGrid', IconGrid)
    app.component('DemoBox', DemoBox)
  },
} satisfies Theme
