import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Button, Checkbox, CheckboxGroup, Icon, Callout, Divider, Link, Radio, RadioGroup, Text, Title, Tooltip } from '@/components'
import '@/styles/horizon.css'
import './vitepress.css'
import IconGrid from './components/IconGrid.vue'
import DemoBox from './components/DemoBox.vue'

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
    app.component('Callout', Callout)
    app.component('Link', Link)
    app.component('Tooltip', Tooltip)
    app.component('Divider', Divider)
    app.component('IconGrid', IconGrid)
    app.component('DemoBox', DemoBox)
  },
} satisfies Theme
