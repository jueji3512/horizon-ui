# Space 间距

设置元素之间的间距。

## 水平排列 Horizontal

<DemoBox>
  <Space>
    <Button>按钮 1</Button>
    <Button theme="brand">按钮 2</Button>
    <Button theme="success">按钮 3</Button>
  </Space>
</DemoBox>

::: details 查看代码
```html
<Space>
  <Button>按钮 1</Button>
  <Button theme="brand">按钮 2</Button>
  <Button theme="success">按钮 3</Button>
</Space>
```
:::

## 垂直排列 Vertical

<DemoBox>
  <Space direction="vertical">
    <Input placeholder="请输入" />
    <Input placeholder="请输入" />
  </Space>
</DemoBox>

::: details 查看代码
```html
<Space direction="vertical">
  <Input placeholder="请输入" />
  <Input placeholder="请输入" />
</Space>
```
:::

## 尺寸 Sizes

<DemoBox>
  <div class="flex flex-col gap-4">
    <Space size="sm">
      <Button>Small</Button>
      <Button>Small</Button>
      <Button>Small</Button>
    </Space>
    <Space size="md">
      <Button>Medium</Button>
      <Button>Medium</Button>
      <Button>Medium</Button>
    </Space>
    <Space size="lg">
      <Button>Large</Button>
      <Button>Large</Button>
      <Button>Large</Button>
    </Space>
  </div>
</DemoBox>

::: details 查看代码
```html
<Space size="sm">
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
</Space>
<Space size="md">
  <Button>Medium</Button>
  <Button>Medium</Button>
  <Button>Medium</Button>
</Space>
<Space size="lg">
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
</Space>
```
:::

## 对齐 Align

<DemoBox>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <span class="text-xs text-[var(--text-color-secondary)] w-16">start</span>
      <div class="bg-[var(--bg-color-secondarycontainer)] p-2 rounded">
        <Space align="start">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-[var(--text-color-secondary)] w-16">center</span>
      <div class="bg-[var(--bg-color-secondarycontainer)] p-2 rounded">
        <Space align="center">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-[var(--text-color-secondary)] w-16">end</span>
      <div class="bg-[var(--bg-color-secondarycontainer)] p-2 rounded">
        <Space align="end">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs text-[var(--text-color-secondary)] w-16">baseline</span>
      <div class="bg-[var(--bg-color-secondarycontainer)] p-2 rounded">
        <Space align="baseline">
          <Button size="sm">短</Button>
          <Button size="lg">高按钮</Button>
          <Button size="sm">短</Button>
        </Space>
      </div>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```html
<Space align="start">
  <Button size="sm">短</Button>
  <Button size="lg">高按钮</Button>
  <Button size="sm">短</Button>
</Space>
<Space align="center">
  <Button size="sm">短</Button>
  <Button size="lg">高按钮</Button>
  <Button size="sm">短</Button>
</Space>
<Space align="end">
  <Button size="sm">短</Button>
  <Button size="lg">高按钮</Button>
  <Button size="sm">短</Button>
</Space>
<Space align="baseline">
  <Button size="sm">短</Button>
  <Button size="lg">高按钮</Button>
  <Button size="sm">短</Button>
</Space>
```
:::

## 换行 Wrap

<DemoBox>
  <div class="w-64">
    <Space :wrap="true">
      <Button v-for="i in 8" :key="i">标签{{ i }}</Button>
    </Space>
  </div>
</DemoBox>

::: details 查看代码
```html
<Space :wrap="true">
  <Button v-for="i in 8" :key="i">标签{{ i }}</Button>
</Space>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 间距（8/16/24px） |
| `align` | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` | 交叉轴对齐 |
| `wrap` | `boolean` | `false` | 是否自动换行 |
