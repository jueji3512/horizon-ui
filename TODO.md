# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 需要用户决策

- [ ] 决定 `docs/superpowers/**` 是否长期只作为内部计划文档保存；当前已经从 VitePress public source 排除。

## 近期开发计划

- [ ] 补全 dark mode 色彩规范。当前颜色体系主要完成 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。
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
- [ ] 如未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 本地图标白名单策略，加入 sanitizer 或改为更安全的渲染路径。
- [ ] 当前浏览器/Playwright 能力不稳定，之前无法做截图级验证；后续可恢复后补做视觉回归。
- [ ] `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物。如果没有 dev server 依赖，可以定期清理。
- [ ] `AGENTS.md` 已重写为中文快速入口；后续如组件规范变化，要同步更新。

## 工作习惯

- [ ] 后续 commit message 使用 Conventional Commit 格式，并用中文说明，例如 `docs(project): 更新项目上下文与待办`。
- [ ] 遇到不确定是否删除的文件，先在本文件记录，再询问用户确认。
