import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Button, Checkbox, CheckboxGroup, Icon, Radio, RadioGroup, Text, Title, Tooltip } from '@/components'
import '@/styles/horizon.css'
import './vitepress.css'
import IconGrid from './components/IconGrid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Button', Button)
    app.component('Icon', Icon)
    app.component('Checkbox', Checkbox)
    app.component('CheckboxGroup', CheckboxGroup)
    app.component('Radio', Radio)
    app.component('RadioGroup', RadioGroup)
    app.component('Text', Text)
    app.component('Title', Title)
    app.component('Tooltip', Tooltip)
    app.component('IconGrid', IconGrid)
  },
} satisfies Theme
