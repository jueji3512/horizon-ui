# 色彩系统

Horizon UI 色彩体系参考 Tailwind CSS v4 的 OKLCH 色彩模型和 TDesign 的状态节奏，最终以 `src/styles/tokens/color.css` 中的自定义 token 为准。

---

## Tailwind CSS 参考色表

下表保留早期选色时参考的 Tailwind 色板，色阶名称仅作为设计参考，不承诺与当前安装的 `tailwindcss` 包逐值一致。组件实现和文档规范应以 Horizon token 的 OKLCH 值为准。

<script setup>
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const families = [
  {
    name: 'slate',
    oklch: [
      'oklch(0.984 0.003 247.858)', 'oklch(0.968 0.007 247.896)', 'oklch(0.929 0.013 255.508)',
      'oklch(0.869 0.022 252.894)', 'oklch(0.704 0.04 256.788)', 'oklch(0.554 0.046 257.417)',
      'oklch(0.446 0.043 257.281)', 'oklch(0.372 0.044 257.287)', 'oklch(0.279 0.041 260.031)',
      'oklch(0.208 0.042 265.755)'
    ]
  },
  {
    name: 'gray',
    oklch: [
      'oklch(0.985 0.002 247.839)', 'oklch(0.967 0.003 264.542)', 'oklch(0.928 0.006 264.531)',
      'oklch(0.872 0.01 258.338)', 'oklch(0.792 0.013 257.518)', 'oklch(0.704 0.016 256.798)',
      'oklch(0.608 0.017 255.296)', 'oklch(0.506 0.014 254.213)', 'oklch(0.374 0.01 258.189)',
      'oklch(0.21 0.006 264.015)'
    ]
  },
  {
    name: 'zinc',
    oklch: [
      'oklch(0.985 0.001 286.375)', 'oklch(0.967 0.001 286.375)', 'oklch(0.92 0.004 286.32)',
      'oklch(0.871 0.006 286.286)', 'oklch(0.786 0.008 286.233)', 'oklch(0.705 0.015 286.067)',
      'oklch(0.606 0.02 286.044)', 'oklch(0.508 0.02 285.989)', 'oklch(0.373 0.014 285.91)',
      'oklch(0.209 0.007 285.885)'
    ]
  },
  {
    name: 'neutral',
    oklch: [
      'oklch(0.985 0 0)', 'oklch(0.964 0 0)', 'oklch(0.92 0 0)',
      'oklch(0.87 0 0)', 'oklch(0.787 0 0)', 'oklch(0.704 0 0)',
      'oklch(0.6 0 0)', 'oklch(0.5 0 0)', 'oklch(0.374 0 0)',
      'oklch(0.21 0 0)'
    ]
  },
  {
    name: 'stone',
    oklch: [
      'oklch(0.985 0.001 106.423)', 'oklch(0.97 0.001 106.424)', 'oklch(0.923 0.003 48.717)',
      'oklch(0.869 0.005 56.366)', 'oklch(0.786 0.007 56.229)', 'oklch(0.703 0.011 56.259)',
      'oklch(0.602 0.015 56.306)', 'oklch(0.504 0.015 56.308)', 'oklch(0.371 0.01 56.23)',
      'oklch(0.208 0.006 56.043)'
    ]
  },
  {
    name: 'red',
    oklch: [
      'oklch(0.971 0.013 17.38)', 'oklch(0.936 0.032 17.717)', 'oklch(0.885 0.062 18.334)',
      'oklch(0.808 0.114 19.571)', 'oklch(0.704 0.191 22.216)', 'oklch(0.637 0.237 25.331)',
      'oklch(0.577 0.245 27.325)', 'oklch(0.505 0.213 27.518)', 'oklch(0.444 0.177 26.899)',
      'oklch(0.392 0.147 25.304)'
    ]
  },
  {
    name: 'orange',
    oklch: [
      'oklch(0.98 0.016 73.684)', 'oklch(0.954 0.038 75.164)', 'oklch(0.901 0.076 70.697)',
      'oklch(0.837 0.128 66.29)', 'oklch(0.75 0.183 55.934)', 'oklch(0.705 0.213 47.604)',
      'oklch(0.646 0.222 41.116)', 'oklch(0.553 0.195 38.402)', 'oklch(0.47 0.157 37.305)',
      'oklch(0.408 0.123 38.172)'
    ]
  },
  {
    name: 'amber',
    oklch: [
      'oklch(0.975 0.02 96.0)', 'oklch(0.952 0.05 96.5)', 'oklch(0.91 0.105 88.0)',
      'oklch(0.845 0.15 80.0)', 'oklch(0.803 0.17 75.0)', 'oklch(0.769 0.188 70.08)',
      'oklch(0.737 0.178 59.0)', 'oklch(0.66 0.16 47.0)', 'oklch(0.58 0.14 42.0)',
      'oklch(0.502 0.12 38.0)'
    ]
  },
  {
    name: 'yellow',
    oklch: [
      'oklch(0.98 0.02 98.0)', 'oklch(0.96 0.06 98.0)', 'oklch(0.92 0.12 95.0)',
      'oklch(0.87 0.17 90.0)', 'oklch(0.85 0.19 85.0)', 'oklch(0.82 0.2 80.0)',
      'oklch(0.76 0.19 75.0)', 'oklch(0.68 0.17 70.0)', 'oklch(0.6 0.15 65.0)',
      'oklch(0.52 0.13 60.0)'
    ]
  },
  {
    name: 'lime',
    oklch: [
      'oklch(0.98 0.03 120.0)', 'oklch(0.95 0.06 120.0)', 'oklch(0.9 0.12 118.0)',
      'oklch(0.85 0.17 115.0)', 'oklch(0.79 0.2 110.0)', 'oklch(0.75 0.21 105.0)',
      'oklch(0.68 0.2 100.0)', 'oklch(0.6 0.18 95.0)', 'oklch(0.52 0.16 90.0)',
      'oklch(0.45 0.14 85.0)'
    ]
  },
  {
    name: 'green',
    oklch: [
      'oklch(0.98 0.02 145.0)', 'oklch(0.95 0.05 145.0)', 'oklch(0.9 0.1 142.0)',
      'oklch(0.84 0.15 140.0)', 'oklch(0.77 0.18 138.0)', 'oklch(0.72 0.2 135.0)',
      'oklch(0.65 0.19 132.0)', 'oklch(0.56 0.17 130.0)', 'oklch(0.48 0.15 128.0)',
      'oklch(0.41 0.13 125.0)'
    ]
  },
  {
    name: 'emerald',
    oklch: [
      'oklch(0.969 0.015 170.0)', 'oklch(0.936 0.034 170.5)', 'oklch(0.883 0.068 169.4)',
      'oklch(0.806 0.113 166.9)', 'oklch(0.723 0.162 164.4)', 'oklch(0.66 0.19 161.4)',
      'oklch(0.596 0.171 162.4)', 'oklch(0.521 0.15 164.5)', 'oklch(0.452 0.124 164.7)',
      'oklch(0.392 0.105 164.0)'
    ]
  },
  {
    name: 'teal',
    oklch: [
      'oklch(0.98 0.02 180.0)', 'oklch(0.95 0.05 180.0)', 'oklch(0.9 0.1 178.0)',
      'oklch(0.84 0.15 176.0)', 'oklch(0.77 0.18 174.0)', 'oklch(0.71 0.2 172.0)',
      'oklch(0.64 0.18 170.0)', 'oklch(0.56 0.16 168.0)', 'oklch(0.48 0.14 166.0)',
      'oklch(0.41 0.12 164.0)'
    ]
  },
  {
    name: 'cyan',
    oklch: [
      'oklch(0.98 0.02 195.0)', 'oklch(0.95 0.05 195.0)', 'oklch(0.9 0.1 193.0)',
      'oklch(0.84 0.15 192.0)', 'oklch(0.77 0.18 190.0)', 'oklch(0.71 0.2 188.0)',
      'oklch(0.64 0.18 186.0)', 'oklch(0.56 0.16 184.0)', 'oklch(0.48 0.14 182.0)',
      'oklch(0.41 0.12 180.0)'
    ]
  },
  {
    name: 'sky',
    oklch: [
      'oklch(0.98 0.02 220.0)', 'oklch(0.95 0.05 220.0)', 'oklch(0.9 0.1 218.0)',
      'oklch(0.84 0.15 216.0)', 'oklch(0.77 0.18 214.0)', 'oklch(0.71 0.2 212.0)',
      'oklch(0.64 0.18 210.0)', 'oklch(0.56 0.16 208.0)', 'oklch(0.48 0.14 206.0)',
      'oklch(0.41 0.12 204.0)'
    ]
  },
  {
    name: 'blue',
    oklch: [
      'oklch(0.97 0.014 254.604)', 'oklch(0.932 0.032 255.585)', 'oklch(0.882 0.059 254.128)',
      'oklch(0.809 0.105 251.813)', 'oklch(0.707 0.165 254.624)', 'oklch(0.623 0.214 259.815)',
      'oklch(0.546 0.245 262.881)', 'oklch(0.488 0.243 264.376)', 'oklch(0.424 0.199 265.638)',
      'oklch(0.379 0.146 265.522)'
    ]
  },
  {
    name: 'indigo',
    oklch: [
      'oklch(0.97 0.015 260.0)', 'oklch(0.93 0.034 260.0)', 'oklch(0.88 0.065 258.0)',
      'oklch(0.81 0.11 255.0)', 'oklch(0.71 0.17 253.0)', 'oklch(0.63 0.22 250.0)',
      'oklch(0.55 0.23 248.0)', 'oklch(0.49 0.22 246.0)', 'oklch(0.43 0.18 245.0)',
      'oklch(0.38 0.14 244.0)'
    ]
  },
  {
    name: 'violet',
    oklch: [
      'oklch(0.97 0.02 280.0)', 'oklch(0.94 0.04 280.0)', 'oklch(0.89 0.07 278.0)',
      'oklch(0.83 0.12 275.0)', 'oklch(0.74 0.18 272.0)', 'oklch(0.67 0.22 270.0)',
      'oklch(0.59 0.22 268.0)', 'oklch(0.52 0.2 266.0)', 'oklch(0.46 0.17 264.0)',
      'oklch(0.4 0.14 262.0)'
    ]
  },
  {
    name: 'purple',
    oklch: [
      'oklch(0.98 0.02 300.0)', 'oklch(0.94 0.04 300.0)', 'oklch(0.9 0.07 298.0)',
      'oklch(0.84 0.12 295.0)', 'oklch(0.75 0.18 292.0)', 'oklch(0.68 0.22 290.0)',
      'oklch(0.6 0.22 288.0)', 'oklch(0.53 0.2 286.0)', 'oklch(0.47 0.17 284.0)',
      'oklch(0.41 0.14 282.0)'
    ]
  },
  {
    name: 'fuchsia',
    oklch: [
      'oklch(0.98 0.02 320.0)', 'oklch(0.94 0.04 320.0)', 'oklch(0.9 0.07 318.0)',
      'oklch(0.84 0.12 315.0)', 'oklch(0.75 0.18 312.0)', 'oklch(0.68 0.22 310.0)',
      'oklch(0.6 0.22 308.0)', 'oklch(0.53 0.2 306.0)', 'oklch(0.47 0.17 304.0)',
      'oklch(0.41 0.14 302.0)'
    ]
  },
  {
    name: 'pink',
    oklch: [
      'oklch(0.98 0.02 350.0)', 'oklch(0.94 0.04 350.0)', 'oklch(0.9 0.07 348.0)',
      'oklch(0.84 0.12 345.0)', 'oklch(0.75 0.18 342.0)', 'oklch(0.68 0.22 340.0)',
      'oklch(0.6 0.22 338.0)', 'oklch(0.53 0.2 336.0)', 'oklch(0.47 0.17 334.0)',
      'oklch(0.41 0.14 332.0)'
    ]
  },
  {
    name: 'rose',
    oklch: [
      'oklch(0.97 0.015 12.0)', 'oklch(0.94 0.03 12.0)', 'oklch(0.89 0.058 10.0)',
      'oklch(0.81 0.11 12.0)', 'oklch(0.71 0.17 15.0)', 'oklch(0.645 0.22 20.0)',
      'oklch(0.58 0.22 25.0)', 'oklch(0.51 0.2 27.0)', 'oklch(0.45 0.17 28.0)',
      'oklch(0.39 0.14 29.0)'
    ]
  }
]

function isDark(shade) {
  return shade >= 600
}
</script>

<div class="color-families">
  <div v-for="f in families" :key="f.name" class="color-family">
    <h3>{{ f.name }}</h3>
    <div class="color-row">
      <div v-for="(o, i) in f.oklch" :key="shades[i]"
        class="color-chip" :class="{ dark: isDark(shades[i]) }"
        :style="{ background: o }">
        <span>{{ shades[i] }}</span>
      </div>
    </div>
  </div>
</div>

---

## Horizon UI 色彩 Token

### 文本色 — text-color-*

| Token | 参考 | 色块 | OKLCH | TDesign 参考 |
|-------|------|------|-------|-------------|
| `--text-color-primary` | gray-900 | <span class="swatch" style="background:oklch(0.21 0.006 264.015)"> </span> | oklch(0.21 0.006 264.015) | rgba(0,0,0,90%) |
| `--text-color-secondary` | gray-500 | <span class="swatch" style="background:oklch(0.704 0.016 256.798)"> </span> | oklch(0.704 0.016 256.798) | rgba(0,0,0,60%) |
| `--text-color-placeholder` | gray-400 | <span class="swatch" style="background:oklch(0.792 0.013 257.518)"> </span> | oklch(0.792 0.013 257.518) | rgba(0,0,0,40%) |
| `--text-color-disabled` | neutral-400 | <span class="swatch" style="background:oklch(0.787 0 0)"> </span> | oklch(0.787 0 0) | rgba(0,0,0,26%) |
| `--text-color-inverse` | white | <span class="swatch" style="background:oklch(1 0 0)"> </span> | oklch(1 0 0) | #fff |

### 背景色 — bg-color-*

| Token | 参考 | 色块 | OKLCH | TDesign 参考 |
|-------|------|------|-------|-------------|
| `--bg-color-page` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | #eee |
| `--bg-color-container` | white | <span class="swatch" style="background:oklch(1 0 0)"> </span> | oklch(1 0 0) | #fff |
| `--bg-color-container-hover` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | #f3f3f3 |
| `--bg-color-container-active` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | #e8e8e8 |
| `--bg-color-secondarycontainer` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | #f3f3f3 |
| `--bg-color-secondarycontainer-hover` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | #eee |
| `--bg-color-secondarycontainer-active` | neutral-300 | <span class="swatch" style="background:oklch(0.87 0 0)"> </span> | oklch(0.87 0 0) | #ddd |
| `--bg-color-component` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | #e8e8e8 |
| `--bg-color-component-hover` | neutral-300 | <span class="swatch" style="background:oklch(0.87 0 0)"> </span> | oklch(0.87 0 0) | #ddd |
| `--bg-color-component-active` | neutral-500 | <span class="swatch" style="background:oklch(0.704 0 0)"> </span> | oklch(0.704 0 0) | #a6a6a6 |
| `--bg-color-component-disabled` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | #f3f3f3 |
| `--bg-color-secondarycomponent` | neutral-300 | <span class="swatch" style="background:oklch(0.87 0 0)"> </span> | oklch(0.87 0 0) | #ddd |
| `--bg-color-secondarycomponent-hover` | neutral-400 | <span class="swatch" style="background:oklch(0.787 0 0)"> </span> | oklch(0.787 0 0) | #c6c6c6 |
| `--bg-color-secondarycomponent-active` | neutral-500 | <span class="swatch" style="background:oklch(0.704 0 0)"> </span> | oklch(0.704 0 0) | #a6a6a6 |
| `--bg-color-secondarycomponent-disabled` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | #f3f3f3 |
| `--bg-color-inner` | white | <span class="swatch" style="background:oklch(1 0 0)"> </span> | oklch(1 0 0) | #fff |
| `--bg-color-inner-hover` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | - |
| `--bg-color-inner-active` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | - |
| `--bg-color-inner-disabled` | neutral-100 | <span class="swatch" style="background:oklch(0.964 0 0)"> </span> | oklch(0.964 0 0) | #f3f3f3 |

### 边框色 — border-color-*

| Token | 参考 | 色块 | OKLCH | TDesign 参考 |
|-------|------|------|-------|-------------|
| `--border-color-component` | neutral-300 | <span class="swatch" style="background:oklch(0.87 0 0)"> </span> | oklch(0.87 0 0) | #ddd (level-2) |
| `--border-color-container` | neutral-300 | <span class="swatch" style="background:oklch(0.87 0 0)"> </span> | oklch(0.87 0 0) | #ddd (level-2) |
| `--border-color-divider` | neutral-200 | <span class="swatch" style="background:oklch(0.92 0 0)"> </span> | oklch(0.92 0 0) | #e8e8e8 (level-1) |

### 语义色 — color-*

每个语义色 6 档，按浅→深排列。注意 hover 比 base **更亮**（与 TDesign 一致，hover 为发光效果）。

语义色定义在 Tailwind CSS v4 `@theme` 中，token 名称使用 `--color-<name>[-state]`，并生成 `text-brand`、`bg-brand`、`border-brand`、`ring-brand-focus` 等工具类。`:root` 中保留同名 fallback，确保 VitePress 构建和直接 CSS 引用都可用。

#### Brand — base: blue-700

| light | focus | disabled | base | hover | active |
|-------|-------|----------|------|-------|--------|
| blue-50 | blue-100 | blue-200 | **blue-700** | blue-500 | blue-800 |

| Token | 色块 | OKLCH | TDesign |
|-------|------|-------|---------|
| `--color-brand-light` | <span class="swatch" style="background:oklch(0.97 0.014 254.604)"> </span> | oklch(0.97 0.014 254.604) | #f2f3ff |
| `--color-brand-focus` | <span class="swatch" style="background:oklch(0.932 0.032 255.585)"> </span> | oklch(0.932 0.032 255.585) | #d9e1ff |
| `--color-brand-disabled` | <span class="swatch" style="background:oklch(0.882 0.059 254.128)"> </span> | oklch(0.882 0.059 254.128) | #b5c7ff |
| `--color-brand` | <span class="swatch" style="background:oklch(0.488 0.243 264.376)"> </span> | oklch(0.488 0.243 264.376) | #0052d9 |
| `--color-brand-hover` | <span class="swatch" style="background:oklch(0.623 0.214 259.815)"> </span> | oklch(0.623 0.214 259.815) | #366ef4 |
| `--color-brand-active` | <span class="swatch" style="background:oklch(0.424 0.199 265.638)"> </span> | oklch(0.424 0.199 265.638) | #003cab |

#### Error — base: red-500

| light | focus | disabled | base | hover | active |
|-------|-------|----------|------|-------|--------|
| red-50 | red-100 | red-200 | **red-500** | red-400 | red-700 |

| Token | 色块 | OKLCH | TDesign |
|-------|------|-------|---------|
| `--color-error-light` | <span class="swatch" style="background:oklch(0.971 0.013 17.38)"> </span> | oklch(0.971 0.013 17.38) | #fff0ed |
| `--color-error-focus` | <span class="swatch" style="background:oklch(0.936 0.032 17.717)"> </span> | oklch(0.936 0.032 17.717) | #ffd8d2 |
| `--color-error-disabled` | <span class="swatch" style="background:oklch(0.885 0.062 18.334)"> </span> | oklch(0.885 0.062 18.334) | #ffb9b0 |
| `--color-error` | <span class="swatch" style="background:oklch(0.637 0.237 25.331)"> </span> | oklch(0.637 0.237 25.331) | #d54941 |
| `--color-error-hover` | <span class="swatch" style="background:oklch(0.704 0.191 22.216)"> </span> | oklch(0.704 0.191 22.216) | #f6685d |
| `--color-error-active` | <span class="swatch" style="background:oklch(0.505 0.213 27.518)"> </span> | oklch(0.505 0.213 27.518) | #ad352f |

#### Success — base: emerald-500

| light | focus | disabled | base | hover | active |
|-------|-------|----------|------|-------|--------|
| emerald-50 | emerald-100 | emerald-300 | **emerald-500** | emerald-400 | emerald-600 |

| Token | 色块 | OKLCH | TDesign |
|-------|------|-------|---------|
| `--color-success-light` | <span class="swatch" style="background:oklch(0.969 0.015 170.0)"> </span> | oklch(0.969 0.015 170.0) | #e3f9e9 |
| `--color-success-focus` | <span class="swatch" style="background:oklch(0.936 0.034 170.5)"> </span> | oklch(0.936 0.034 170.5) | #c6f3d7 |
| `--color-success-disabled` | <span class="swatch" style="background:oklch(0.806 0.113 166.9)"> </span> | oklch(0.806 0.113 166.9) | #92dab2 |
| `--color-success` | <span class="swatch" style="background:oklch(0.66 0.19 161.4)"> </span> | oklch(0.66 0.19 161.4) | #2ba471 |
| `--color-success-hover` | <span class="swatch" style="background:oklch(0.723 0.162 164.4)"> </span> | oklch(0.723 0.162 164.4) | #56c08d |
| `--color-success-active` | <span class="swatch" style="background:oklch(0.596 0.171 162.4)"> </span> | oklch(0.596 0.171 162.4) | #008858 |

#### Warning — base: amber-600

| light | focus | disabled | base | hover | active |
|-------|-------|----------|------|-------|--------|
| amber-50 | amber-100 | amber-200 | **amber-600** | amber-500 | amber-700 |

| Token | 色块 | OKLCH | TDesign |
|-------|------|-------|---------|
| `--color-warning-light` | <span class="swatch" style="background:oklch(0.975 0.02 96.0)"> </span> | oklch(0.975 0.02 96.0) | #fff1e9 |
| `--color-warning-focus` | <span class="swatch" style="background:oklch(0.952 0.05 96.5)"> </span> | oklch(0.952 0.05 96.5) | #ffd9c2 |
| `--color-warning-disabled` | <span class="swatch" style="background:oklch(0.91 0.105 88.0)"> </span> | oklch(0.91 0.105 88.0) | #ffb98c |
| `--color-warning` | <span class="swatch" style="background:oklch(0.737 0.178 59.0)"> </span> | oklch(0.737 0.178 59.0) | #e37318 |
| `--color-warning-hover` | <span class="swatch" style="background:oklch(0.769 0.188 70.08)"> </span> | oklch(0.769 0.188 70.08) | #fa9550 |
| `--color-warning-active` | <span class="swatch" style="background:oklch(0.66 0.16 47.0)"> </span> | oklch(0.66 0.16 47.0) | #be5a00 |

---

## 命名规则

- 功能色：`<category>-color-<variant>`，如 `text-color-primary`、`bg-color-component-hover`
- 语义色：`color-<name>[-state]`，如 `color-brand`、`color-brand-hover`
- 状态后缀：`light` / `focus` / `disabled` / `hover` / `active`
- `-` 仅用于分隔类型与状态，类型名不含 `-`（如 `secondarycontainer` 而非 `secondary-container`）

<style scoped>
.swatch {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.06);
  vertical-align: middle;
}

.color-families {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
}

.color-family h3 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-color-secondary);
}

.color-row {
  display: flex;
  gap: 3px;
}

.color-chip {
  width: 38px;
  height: 38px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.06);
}

.color-chip span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  color: rgba(0,0,0,0.5);
}

.color-chip.dark span {
  color: rgba(255,255,255,0.75);
}
</style>
