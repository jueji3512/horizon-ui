# 工作进度记录

## 2026-06-02

### 代码编辑器与检查工具规范

- 采用稳健现代路线：保留 Prettier + ESLint，并补充 EditorConfig、Gitattributes、Stylelint 与 Tailwind class sorting。
- 新增 `CODE_STYLE.md`，记录未来新增文件需要遵守的编辑器、格式化、lint 和 VS Code 规范。
- 新增 `.editorconfig`，统一 UTF-8、2 空格、LF、最终换行和尾随空格策略；Markdown 保留尾随空格例外。
- 新增 `.gitattributes`，固定文本文件 `eol=lf`。
- 更新 `prettier.config.js`：补充 `endOfLine: 'lf'`、`useTabs: false`，将 `arrowParens` 改为 `always`，并接入 `prettier-plugin-tailwindcss`。
- 新增 `stylelint.config.js`，基于 `stylelint-config-standard-vue` 检查 CSS 与 Vue style，并放行 Tailwind v4 at-rule 与必要表单兼容性前缀。
- 更新 `.vscode/settings.json` 与 `.vscode/extensions.json`，记录推荐编辑器设置和扩展。
- 新增 `lint:js`、`lint:style`、`check` 脚本；`lint` 改为同时运行 JS lint 与 style lint。

## 2026-06-01

### 项目理解

- 阅读并整理 Horizon UI 项目结构、VitePress 文档、组件源码、样式 token 和历史计划文档。
- 确认当前主线是组件库规范迁移：语义色、功能色、尺寸、圆角、字体、状态样式和 API 命名。
- 确认 `docs/superpowers/**` 是历史计划资料，不能直接当作最新完成状态。

### 组件迁移与修复

- 清理 Badge、Tag、InputNumber 等组件的旧 token / 旧 API 残留。
- Badge 改为 `theme="default|brand|success|warning|error"`。
- Tag 改为 `theme` + `variant`，并移除 size 配置，仅保留 sm 尺寸。
- Tag 默认高度改为 24px，左右 padding 使用项目 token，图标间距为 8px。
- Input 默认占满父元素宽度。
- Input disabled 状态修正为明确的 disabled bg/border/text token。
- InputNumber disabled 输入框补充 `cursor-not-allowed`。
- PopperContent 保持无视觉样式，并转发 attrs 到 Teleport 后的真实浮层 DOM。
- Popper 文档去掉默认边框、深浅色主题暗示；确认 Popper 不提供 shadow/elevation。

### 文档与配置

- 更新组件文档示例，使其匹配新 API 和 token。
- Badge 加入 VitePress sidebar。
- `docs/superpowers/**` 加入 VitePress `srcExclude`，避免内部计划文档影响构建。
- 新增 `.agents/skills/base-component-review`，记录底层组件审查流程。
- 新增/维护根目录记忆文档：`AGENTS.md`、`TODO.md`、`task_plan.md`、`findings.md`、`progress.md`。

### Git 与提交

- 已将本轮工作拆成符合规范的中文说明 Conventional Commit：
  - `refactor(components): 对齐组件设计令牌规范`
  - `docs(components): 同步组件示例与迁移说明`
  - `docs(project): 记录组件迁移进度`
  - `style(format): 统一项目代码风格`
- 这些提交已推送到 `origin/master`。
- 后续继续使用 Conventional Commit 格式，并使用中文说明。

### 清理

- 将 `switch-mockups.html` 作为本地视觉原型加入 `.gitignore`。
- 删除一个空的异常目录：名称类似被写坏的 `D:\project\ui\src\components\Space` 路径。
- 删除本地 Switch 视觉原型 `switch-mockups.html`。
- 暂未删除 `docs/.vitepress/cache` / `docs/.vitepress/dist`，因为它们是构建/开发服务生成物，清理时机需要看 dev server 使用情况。

### 小项处理

- 补充 dark mode 未完成状态：当前主要完成 light 色彩规范，dark token、状态映射、文档说明和组件适配仍是高优先级后续项。
- `Icon.vue` 的 raw SVG 渲染保留为本地图标白名单策略，并补充安全边界说明以处理 `vue/no-v-html` warning。
- 在 `AGENTS.md` 补充“下次新对话快速接入”段落，明确新会话检查顺序、阅读顺序和优先后续项。

### 验证

- `npm run typecheck`：通过。
- `npm run lint`：通过，无 `Icon.vue` 的 `vue/no-v-html` warning。
- `npm run format:check`：通过。
- `npm run build`：通过。
- `/components/popper` HTTP 检查：通过。

### 待办

详细待办见 `TODO.md`。优先项：

- Popper deferred 行为。
- Popper base-component review。
- Icon 外部 SVG 安全策略：仅当未来支持外部 SVG 输入时需要重新设计。
- 浏览器/截图级视觉验证。

### 历史计划资料清理

- 审计 `docs/superpowers/plans` 和 `docs/superpowers/specs` 下的历史计划与设计稿。
- 确认多数内容是早期实施草案，当前源码、组件文档和根目录记忆文件已覆盖，不再需要继续保存。
- 提取并保留有效结论到 `findings.md`：Popper 的上层依赖链、Paragraph 旧计划过时、Tooltip 后续可评估迁移到 Popper、早期 `type` → `theme` 和禁用态 token 方向已被当前规范吸收。
- 用户已决定 dark mode 放到当前队列最后，优先处理 Popper、组件迁移扫描和浏览器级视觉验证。
- 删除 `docs/superpowers/**`，并移除 VitePress `srcExclude: ['superpowers/**']` 过期配置。

### Popper base-component review

- 按性能、功能完整性、代码质量三路完成 Popper 底层组件审查。
- Iteration 1：Critical 0，Important 4，Minor/Deferred 3；修复响应式 middleware 配置、`matchWidth` 布局读取/resize、`disabled` 打开态关闭、`autoUpdate` 动态切换清理。
- Iteration 2：Critical 0，Important 0，Minor/Deferred 3；保留给未来上层组件驱动的扩展包括嵌套弹出层协调、boundary 自定义、crossAxis offset / fallback placement。
- 使用一次性 Node 断言脚本先观察 RED，再修复并验证 GREEN；项目当前没有正式测试框架。
- 浏览器验证 `/components/popper`：V-04 打开态 trigger 宽度从 192px 切到 288px 时浮层同步变宽；V-09 打开后切换 disabled 会关闭浮层。
