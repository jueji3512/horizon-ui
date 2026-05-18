import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { Badge, Button, Checkbox, CheckboxGroup, Icon, Input, Callout, Divider, Link, Radio, RadioGroup, Switch, Tag, Text, Title, Tooltip } from '@/components'
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
    app.component('Radio', Radio)
    app.component('RadioGroup', RadioGroup)
    app.component('Text', Text)
    app.component('Title', Title)
    app.component('Callout', Callout)
    app.component('Link', Link)
    app.component('Switch', Switch)
    app.component('Tag', Tag)
    app.component('Input', Input)
    app.component('Tooltip', Tooltip)
    app.component('Divider', Divider)
    app.component('IconGrid', IconGrid)
    app.component('DemoBox', DemoBox)
  },
} satisfies Theme
