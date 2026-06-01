<script setup>
import { ref } from 'vue'
import DemoBox from '../.vitepress/theme/components/DemoBox.vue'

const placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']

// V-01
const v01Click = ref(false)
// V-02
const v02Hover = ref(false)
// V-03
const v03Focus = ref(false)
// V-04
const v04Manual = ref(false)
const v04Selected = ref('bottom')
const v04Wide = ref(false)
// V-05
const v05Placement = ref('bottom')
const v05Visible = ref(false)
// V-06
const v06FlipOn = ref(false)
const v06FlipOff = ref(false)
// V-07
const v07ShiftOn = ref(false)
const v07ShiftOff = ref(false)
// V-08
const v08AutoOn = ref(false)
const v08AutoOff = ref(false)
// V-09
const v09Open = ref(false)
const v09Disabled = ref(false)
// V-10
const v10All = ref(false)
// V-11
const v11Sm = ref(false)
const v11Lg = ref(false)
</script>

# Popper 弹出定位引擎

> **底层组件** — 为 Select、Dropdown、Menu、Popconfirm 等上层组件提供定位与交互基础设施，通常不直接使用。

本页是开发者行为验证页面，覆盖全部 props 和边界场景。

---

### V-01 点击触发 (`trigger="click"`)

**验证**：点击弹出 / 再次点击关闭 / 点外部关闭 / Esc 关闭。

<DemoBox>
  <Popper v-model:visible="v01Click" trigger="click" placement="bottom">
    <PopperTrigger>
      <Button>点击弹出</Button>
    </PopperTrigger>
    <PopperContent>
      <div class="bg-white rounded-lg shadow-xl p-4 min-w-40">
        <p class="text-sm text-[var(--text-color-primary)] font-medium">弹出内容</p>
        <p class="text-xs text-[var(--text-color-secondary)] mt-1">点击外部或 Esc 关闭</p>
      </div>
    </PopperContent>
  </Popper>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="click" placement="bottom">
  <PopperTrigger><Button>点击弹出</Button></PopperTrigger>
  <PopperContent>...</PopperContent>
</Popper>
```
:::

---

### V-02 Hover 触发 + 延时 + 箭头 (`trigger="hover"`, `showDelay`, `hideDelay`)

**验证**：悬停 200ms 弹出 / 离开 100ms 关闭 / 箭头跟随浮层内容背景显示。

<DemoBox>
  <Popper v-model:visible="v02Hover" trigger="hover" placement="top" :show-delay="200" :hide-delay="100">
    <PopperTrigger>
      <span class="text-sm text-brand cursor-pointer border-b border-dotted border-brand">悬停提示</span>
    </PopperTrigger>
    <PopperContent>
      <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
        提示信息 <PopperArrow />
      </div>
    </PopperContent>
  </Popper>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="hover" placement="top" :show-delay="200" :hide-delay="100">
  <PopperTrigger><span class="text-brand cursor-pointer">悬停提示</span></PopperTrigger>
  <PopperContent>
    <div class="bg-[var(--text-color-primary)] text-white ...">提示信息 <PopperArrow /></div>
  </PopperContent>
</Popper>
```
:::

---

### V-03 Focus 触发 (`trigger="focus"`)

**验证**：聚焦输入框弹出 / 失焦关闭。`focusin`/`focusout` 确保 Input 组件的内部 `<input>` 冒泡到达。

<DemoBox>
  <Popper v-model:visible="v03Focus" trigger="focus" placement="bottom-start">
    <PopperTrigger>
      <Input model-value="" placeholder="聚焦输入框" class="w-48" />
    </PopperTrigger>
    <PopperContent>
      <div class="bg-white rounded-lg shadow-xl p-3 min-w-48">
        <p class="text-xs text-[var(--text-color-secondary)]">聚焦时显示，失焦关闭</p>
      </div>
    </PopperContent>
  </Popper>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="focus" placement="bottom-start">
  <PopperTrigger><Input model-value="" placeholder="聚焦输入框" class="w-48" /></PopperTrigger>
  <PopperContent>...</PopperContent>
</Popper>
```
:::

---

### V-04 手动控制 + 匹配宽度 (`trigger="manual"`, `matchWidth`)

**验证**：外部逻辑控制显隐 / 弹层宽度精确等于 trigger 渲染宽度 / 打开后 trigger 宽度变化时弹层同步更新。

<DemoBox>
  <Popper v-model:visible="v04Manual" trigger="manual" placement="bottom-start" match-width>
    <PopperTrigger>
      <Input
        :model-value="v04Selected"
        readonly
        class="cursor-pointer"
        :style="{ width: v04Wide ? '18rem' : '12rem' }"
        @click="v04Manual = !v04Manual"
      />
    </PopperTrigger>
    <PopperContent>
      <div class="bg-white rounded-lg shadow-xl py-1 max-h-48 overflow-auto">
        <Button size="sm" class="mx-2 my-1" @click="v04Wide = !v04Wide">{{ v04Wide ? '缩小 trigger' : '放大 trigger' }}</Button>
        <div
          v-for="p in placements" :key="p"
          class="px-3 py-1.5 text-sm cursor-pointer hover:bg-[var(--bg-color-secondarycontainer)] transition-colors"
          :class="{ 'text-brand font-medium': p === v04Selected }"
          @click="v04Selected = p; v04Manual = false"
        >{{ p }}</div>
      </div>
    </PopperContent>
  </Popper>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="manual" placement="bottom-start" match-width>
  <PopperTrigger>
    <Input
      :model-value="selected"
      readonly
      :style="{ width: wide ? '18rem' : '12rem' }"
      @click="visible = !visible"
    />
  </PopperTrigger>
  <PopperContent>
    <Button size="sm" @click="wide = !wide">切换 trigger 宽度</Button>
    <div v-for="item in options" @click="selected = item; visible = false">{{ item }}</div>
  </PopperContent>
</Popper>
```
:::

---

### V-05 placement 全量覆盖

**验证**：12 种 placement 均定位正确、箭头指向正确。

<DemoBox>
  <div class="flex flex-wrap gap-1.5 mb-4">
    <span
      v-for="p in placements" :key="p"
      class="inline-flex items-center justify-center w-20 h-7 text-xs border border-[var(--border-color-component)] rounded cursor-pointer hover:bg-[var(--bg-color-secondarycontainer)] hover:border-brand"
      :class="{ 'text-brand border-brand bg-brand-light': v05Placement === p && v05Visible }"
      @click.stop="if (v05Placement === p) v05Visible = !v05Visible; else { v05Placement = p; v05Visible = true }"
    >{{ p }}</span>
  </div>
  <Popper v-model:visible="v05Visible" trigger="manual" :placement="v05Placement" :offset="6">
    <PopperTrigger>
      <span class="inline-flex items-center justify-center w-20 h-7 text-xs border border-brand rounded bg-brand-light text-brand">{{ v05Placement }}</span>
    </PopperTrigger>
    <PopperContent>
      <div class="bg-[var(--text-color-primary)] text-white px-3 py-2 rounded text-xs shadow-lg w-36">
        <p class="font-medium">{{ v05Placement }}</p>
        <p class="mt-0.5 opacity-65">placement preview</p>
        <PopperArrow />
      </div>
    </PopperContent>
  </Popper>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="manual" :placement="placement" :offset="6">
  <PopperTrigger>
    <span class="...">{{ placement }}</span>
  </PopperTrigger>
  <PopperContent>
    <div class="...">{{ placement }} <PopperArrow /></div>
  </PopperContent>
</Popper>
```
:::

---

### V-06 flip — 空间不足时翻转方向 (`:flip="false"`)

**验证**：两组 `placement="top"`。flip 开启时空间不足翻到底部；关闭时维持 top。

<DemoBox>
  <div class="flex gap-8 items-start">
    <Popper v-model:visible="v06FlipOn" trigger="manual" placement="top">
      <PopperTrigger>
        <Button size="sm" @click.stop="v06FlipOn = !v06FlipOn">flip="true"</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
          自动翻转 <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v06FlipOff" trigger="manual" placement="top" :flip="false">
      <PopperTrigger>
        <Button size="sm" @click.stop="v06FlipOff = !v06FlipOff">flip="false"</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
          保持 top <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
  </div>
  <p class="text-xs text-[var(--text-color-secondary)] mt-2">将此区域滚至视口顶端后点击，flip="false" 的弹层会溢出上方。</p>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="v1" trigger="manual" placement="top">
  <PopperTrigger><Button @click.stop="v1=!v1">flip="true"</Button></PopperTrigger>
  <PopperContent>自动翻转 <PopperArrow /></PopperContent>
</Popper>
<Popper v-model:visible="v2" trigger="manual" placement="top" :flip="false">
  <PopperTrigger><Button @click.stop="v2=!v2">flip="false"</Button></PopperTrigger>
  <PopperContent>保持 top <PopperArrow /></PopperContent>
</Popper>
```
:::

---

### V-07 shift — 溢出视口时推入视野 (`:shift="false"`)

**验证**：两组 `placement="top"` + `:flip="false"`。shift 开启时弹层被推入可见区域；关闭时可能溢出视口不可见。

<DemoBox>
  <div class="flex gap-8 items-start">
    <Popper v-model:visible="v07ShiftOn" trigger="manual" placement="top" :flip="false" :shift="true">
      <PopperTrigger>
        <Button size="sm" @click.stop="v07ShiftOn = !v07ShiftOn">shift="true"</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
          被推入视野 <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v07ShiftOff" trigger="manual" placement="top" :flip="false" :shift="false">
      <PopperTrigger>
        <Button size="sm" @click.stop="v07ShiftOff = !v07ShiftOff">shift="false"</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
          可能不可见 <PopperArrow />
        </div>
      </PopperContent>
    </Popper>
  </div>
  <p class="text-xs text-[var(--text-color-secondary)] mt-2">将此区域滚至视口顶端后点击按钮。shift="true" 弹层被推回可见；shift="false" 弹层溢出视口外不可见。</p>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="v1" trigger="manual" placement="top" :flip="false" :shift="true">
  <PopperTrigger><Button @click.stop="v1=!v1">shift="true"</Button></PopperTrigger>
  <PopperContent>被推入视野 <PopperArrow /></PopperContent>
</Popper>
<Popper v-model:visible="v2" trigger="manual" placement="top" :flip="false" :shift="false">
  <PopperTrigger><Button @click.stop="v2=!v2">shift="false"</Button></PopperTrigger>
  <PopperContent>可能不可见 <PopperArrow /></PopperContent>
</Popper>
```
:::

---

### V-08 autoUpdate — 容器滚动时跟随 (`:autoUpdate="false"`)

**验证**：可滚动容器内。弹出气泡后滚动容器，`autoUpdate="true"` 跟随 trigger，`autoUpdate="false"` 留在原地。

<DemoBox>
  <div class="overflow-auto h-48 border border-[var(--border-color-component)] rounded-lg">
    <div class="flex justify-center gap-8 items-start pt-40 pb-4" style="min-height: 460px">
      <Popper v-model:visible="v08AutoOn" trigger="manual" placement="bottom" :auto-update="true" :offset="6">
        <PopperTrigger>
          <Button size="sm" @click.stop="v08AutoOn = !v08AutoOn">autoUpdate="true"</Button>
        </PopperTrigger>
        <PopperContent>
          <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
            跟随滚动 <PopperArrow />
          </div>
        </PopperContent>
      </Popper>
      <Popper v-model:visible="v08AutoOff" trigger="manual" placement="bottom" :auto-update="false" :offset="6">
        <PopperTrigger>
          <Button size="sm" @click.stop="v08AutoOff = !v08AutoOff">autoUpdate="false"</Button>
        </PopperTrigger>
        <PopperContent>
          <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
            留在原地 <PopperArrow />
          </div>
        </PopperContent>
      </Popper>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```vue
<div class="overflow-auto h-48">
  <div class="...pt-40..." style="min-height: 460px">
    <Popper v-model:visible="v1" trigger="manual" :auto-update="true">
      <PopperTrigger><Button @click.stop="v1=!v1">autoUpdate="true"</Button></PopperTrigger>
      <PopperContent>跟随滚动 <PopperArrow /></PopperContent>
    </Popper>
    <Popper v-model:visible="v2" trigger="manual" :auto-update="false">
      <PopperTrigger><Button @click.stop="v2=!v2">autoUpdate="false"</Button></PopperTrigger>
      <PopperContent>留在原地 <PopperArrow /></PopperContent>
    </Popper>
  </div>
</div>
```
:::

---

### V-09 禁用弹出 (`disabled`)

**验证**：`disabled="true"` 按钮无法触发弹出；浮层打开后切到 disabled 会立即关闭。

<DemoBox>
  <div class="flex items-center gap-3">
    <Button size="sm" @click="v09Disabled = false">启用</Button>
    <span class="text-xs text-[var(--text-color-secondary)]">当前：{{ v09Disabled ? 'disabled' : 'enabled' }} / {{ v09Open ? 'open' : 'closed' }}</span>
  </div>
  <div class="mt-3">
    <Popper v-model:visible="v09Open" trigger="click" placement="bottom" :disabled="v09Disabled">
      <PopperTrigger>
        <Button :disabled="v09Disabled">点击弹出</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-white rounded-lg shadow-xl p-3 min-w-40">
          <p class="text-sm text-[var(--text-color-primary)] mb-2">已打开浮层</p>
          <Button size="sm" @click="v09Disabled = true">切到 disabled 并关闭</Button>
        </div>
      </PopperContent>
    </Popper>
  </div>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="visible" trigger="click" placement="bottom" :disabled="disabled">
  <PopperTrigger><Button :disabled="disabled">点击弹出</Button></PopperTrigger>
  <PopperContent>
    <Button @click="disabled = true">切到 disabled 并关闭</Button>
  </PopperContent>
</Popper>
```
:::

---

### V-10 zIndex (`zIndex`)

**验证**：一个按钮同时触发三个弹层。z-index 自动递增（红 2001 < 蓝 2002 < 绿 2003），绿色在最上面。

<DemoBox>
  <div class="flex flex-col gap-3 items-start">
    <Button size="sm" @click="v10All = !v10All">{{ v10All ? '全部关闭' : '全部打开' }}</Button>
    <div class="flex gap-4 items-start">
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div class="w-12 h-8 rounded bg-red-500 flex items-center justify-center text-white text-xs font-medium">2001</div>
        </PopperTrigger>
        <PopperContent>
          <div class="bg-red-500 text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">z-index: 2001</div>
        </PopperContent>
      </Popper>
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div class="w-12 h-8 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-medium">2002</div>
        </PopperTrigger>
        <PopperContent>
          <div class="bg-blue-500 text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">z-index: 2002</div>
        </PopperContent>
      </Popper>
      <Popper v-model:visible="v10All" trigger="manual" placement="bottom" :offset="4">
        <PopperTrigger>
          <div class="w-12 h-8 rounded bg-emerald-500 flex items-center justify-center text-white text-xs font-medium">2003</div>
        </PopperTrigger>
        <PopperContent>
          <div class="bg-emerald-500 text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">z-index: 2003</div>
        </PopperContent>
      </Popper>
    </div>
  </div>
  <p class="text-xs text-[var(--text-color-secondary)] mt-2">三个弹层同时出现，绿色覆盖蓝色、蓝色覆盖红色。</p>
</DemoBox>

::: details 查看代码
```vue
<Button @click="open = !open">{{ open ? '全部关闭' : '全部打开' }}</Button>
<Popper v-model:visible="open" trigger="manual" placement="bottom">
  <PopperTrigger><div class="w-12 h-8 rounded bg-red-500">2001</div></PopperTrigger>
  <PopperContent><div class="bg-red-500 ...">z-index: 2001</div></PopperContent>
</Popper>
<Popper v-model:visible="open" trigger="manual" placement="bottom">
  <PopperTrigger><div class="w-12 h-8 rounded bg-blue-500">2002</div></PopperTrigger>
  <PopperContent><div class="bg-blue-500 ...">z-index: 2002</div></PopperContent>
</Popper>
<Popper v-model:visible="open" trigger="manual" placement="bottom">
  <PopperTrigger><div class="w-12 h-8 rounded bg-emerald-500">2003</div></PopperTrigger>
  <PopperContent><div class="bg-emerald-500 ...">z-index: 2003</div></PopperContent>
</Popper>
```
:::
:::

---

### V-11 offset 间距 (`offset`)

**验证**：不同 offset 值影响弹层与 trigger 的距离。

<DemoBox>
  <div class="flex gap-4 items-start">
    <Popper v-model:visible="v11Sm" trigger="manual" placement="bottom" :offset="4">
      <PopperTrigger>
        <Button size="sm" @click.stop="v11Sm = !v11Sm">offset=4</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">间距 4px <PopperArrow /></div>
      </PopperContent>
    </Popper>
    <Popper v-model:visible="v11Lg" trigger="manual" placement="bottom" :offset="20">
      <PopperTrigger>
        <Button size="sm" @click.stop="v11Lg = !v11Lg">offset=20</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="bg-[var(--text-color-primary)] text-white px-3 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">间距 20px <PopperArrow /></div>
      </PopperContent>
    </Popper>
  </div>
</DemoBox>

::: details 查看代码
```vue
<Popper v-model:visible="v1" trigger="manual" placement="bottom" :offset="4">
  <PopperTrigger><Button @click.stop="v1=!v1">offset=4</Button></PopperTrigger>
  <PopperContent>间距 4px <PopperArrow /></PopperContent>
</Popper>
<Popper v-model:visible="v2" trigger="manual" placement="bottom" :offset="20">
  <PopperTrigger><Button @click.stop="v2=!v2">offset=20</Button></PopperTrigger>
  <PopperContent>间距 20px <PopperArrow /></PopperContent>
</Popper>
```
:::

---

## API

### Popper Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `placement` | `Placement` | `'bottom'` | 弹出位置偏好，12 个可选值 |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | 定位策略。`fixed` 直接跟视口绑定，容器滚动零延迟 |
| `offset` | `number` | `8` | 距离 trigger 的间距 (px) |
| `trigger` | `TriggerType` | `'manual'` | hover / click / focus / manual |
| `showDelay` | `number` | `0` | 显示延时 (ms) |
| `hideDelay` | `number` | `0` | 隐藏延时 (ms) |
| `visible` | `boolean` | — | v-model:visible，受控显隐 |
| `disabled` | `boolean` | `false` | 禁用弹出 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `flip` | `boolean` | `true` | 弹出方向空间不足时自动翻转到对面 |
| `shift` | `boolean` | `true` | 弹层超出视口边界时沿轴向推回可见区域（留 4px 间距） |
| `matchWidth` | `boolean` | `false` | 浮层宽度匹配 trigger 宽度 |
| `autoUpdate` | `boolean` | `true` | 触发元素位置变化时弹层自动重新定位。`false` 仅定位一次 |
| `zIndex` | `number` | 自动递增 | 手动指定 z-index，不填则自动计算（基准 2000） |

### Popper Events

| Event | 参数 | 说明 |
|-------|------|------|
| `update:visible` | `boolean` | 显隐状态变化 |

### PopperTrigger

包裹层 `<div class="inline-flex">`，负责参考元素 ref 和事件委托。无 Props。

### PopperContent

无 Props。z-index 由 Popper 管理，样式通过 `floatingStyles` 自动应用。PopperContent 默认不提供背景、边框或圆角；需要视觉样式时由上层通过 `class` / `style` 设置。

### PopperArrow

无 Props。背景色通过 `bg-inherit` 从父级继承。

### Placement 可选值

`top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end`
