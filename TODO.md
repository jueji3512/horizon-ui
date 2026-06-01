# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 需要用户决策

- [ ] 决定是否删除 `switch-mockups.html`。它目前是本地 Switch 视觉原型，已加入 `.gitignore`，但文件仍保留在工作区。
- [ ] 决定 `docs/superpowers/**` 是否长期只作为内部计划文档保存；当前已经从 VitePress public source 排除。

## 近期开发计划

- [ ] 继续下一轮组件迁移扫描，以当前源码为准，不直接信任旧计划文档。
- [ ] 在 Select、Dropdown 等上层弹出组件开始前，先复查 Popper 的底层能力。
- [ ] 为关键组件补充更稳定的浏览器级视觉验证，尤其是 Input、Tag、Popper、InputNumber。
- [ ] 根据新的组件规范，继续统一文档示例里的 token、尺寸、状态和 API 命名。

## 隐藏问题

- [ ] Popper 的部分行为仍需后续处理：
  - `offset` / `flip` / `shift` 的响应式更新。
  - `disabled` 变为 true 时是否应自动关闭已打开浮层。
  - `matchWidth` 是否需要响应 trigger resize。
  - 正式作为 Select/Dropdown 基座前，需要完成 base-component review。
- [ ] `src/components/Icon/Icon.vue` 仍有 `vue/no-v-html` warning。当前 raw SVG 渲染是有意设计，但需要补充安全约束说明，或换成更安全的渲染路径。
- [ ] 当前浏览器/Playwright 能力不稳定，之前无法做截图级验证；后续可恢复后补做视觉回归。
- [ ] `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物。如果没有 dev server 依赖，可以定期清理。
- [ ] `AGENTS.md` 已重写为中文快速入口；后续如组件规范变化，要同步更新。

## 工作习惯

- [ ] 后续 commit message 使用 Conventional Commit 格式，并用中文说明，例如 `docs(project): 更新项目上下文与待办`。
- [ ] 遇到不确定是否删除的文件，先在本文件记录，再询问用户确认。
