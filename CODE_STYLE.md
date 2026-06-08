# 代码编辑器与格式规范

本文记录 Horizon UI 的仓库级编辑器、格式化和检查规范。未来新增文件默认遵守本文件；如需调整，应同步更新 `.editorconfig`、`.gitattributes`、`prettier.config.js`、`stylelint.config.js`、`.vscode/settings.json` 和本文档。

## 基础编辑器规范

- 编码：UTF-8。
- 缩进：2 个空格，不使用 Tab。
- 换行符：LF。
- 文件末尾：保留一个最终换行。
- 尾随空格：默认清理；Markdown 例外，允许保留尾随空格以支持硬换行。
- Git 换行：`.gitattributes` 使用 `* text=auto eol=lf` 固定文本文件换行，避免不同机器的 `core.autocrlf` 造成隐形差异。

## 运行时与包管理

- Node.js 基线：`>=24.16.0`。
- npm 基线：`>=11.13.0`。
- `package.json` 使用 `packageManager: npm@11.13.0` 记录当前包管理器版本。
- 本地推荐使用 nvm 安装和切换 Node 版本；依赖升级后应同步运行 `npm run check`。

## Prettier

Prettier 是格式化的唯一来源，VS Code 保存时使用 Prettier 格式化。

- `semi: false`
- `singleQuote: true`
- `trailingComma: 'all'`
- `printWidth: 100`
- `tabWidth: 2`
- `useTabs: false`
- `arrowParens: 'always'`
- `endOfLine: 'lf'`
- `vueIndentScriptAndStyle: false`

Tailwind class 顺序由 `prettier-plugin-tailwindcss` 自动整理，并通过 `tailwindStylesheet: './src/styles/horizon.css'` 读取 Tailwind v4 CSS-first 配置。`clsx` 和 `cn` 中的 class 字符串也纳入排序。

## ESLint

ESLint 负责 JavaScript、TypeScript 和 Vue SFC 的代码质量规则。

- 使用 flat config。
- 当前使用 ESLint 10；配置中直接引用的 `globals` 必须作为显式 devDependency 保留。
- TypeScript 保持 strict。
- 类型导入使用 `import type`。
- Vue 单文件组件块顺序为 `template`、`script`、`style`。
- `vue/no-v-html` 默认告警；仅允许在已确认安全边界的本地图标 SVG 渲染场景中关闭。

## Stylelint

Stylelint 负责 CSS 和 Vue SFC 中的样式规则。

- 基于 `stylelint-config-standard-vue`。
- Tailwind v4 的 `@theme`、`@source`、`@apply` 等 at-rule 在配置中显式放行。
- 表单控件兼容性需要的 `-webkit-appearance`、`-moz-appearance`、`-webkit-text-fill-color` 显式放行。
- `lint:style` 覆盖 `src/**/*.{css,vue}` 和 `docs/.vitepress/theme/**/*.vue`；文档主题组件属于项目样式边界，应继续使用 Horizon 语义 token。

## 常用命令

```bash
npm run format       # Prettier 写入
npm run format:check # Prettier 检查
npm run lint:js      # ESLint 检查
npm run lint:style   # Stylelint 检查
npm run check:component-demo # ComponentDemo 源码展示契约检查
npm run check:icons  # SVG 图标规范检查
npm run check:scroll-area # ScrollArea 基础契约检查
npm run check:popper # Popper 基础契约检查
npm run check:popover # Popover 浮层契约检查
npm run check:menu # Menu 命令菜单契约检查
npm run check:select # Select slot 子组件契约检查
npm run check:dropdown-menu # DropdownMenu 组合契约检查
npm run lint         # JS/TS/Vue + CSS 检查
npm run typecheck    # vue-tsc --noEmit
npm run build        # VitePress 构建
npm run check        # 格式、ComponentDemo、图标规范、ScrollArea、Popper、Popover、Menu、Select、DropdownMenu 契约、lint、typecheck、build 全量检查
```

## VS Code

推荐安装 `.vscode/extensions.json` 中列出的扩展：

- EditorConfig
- Prettier
- ESLint
- Stylelint

项目 `.vscode/settings.json` 已固定 2 空格、LF、保存时格式化、ESLint 保存时修复和 Stylelint 校验。
