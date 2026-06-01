# 项目阶段计划

目标：持续理解 Horizon UI 项目，并推进组件库新规范迁移，包括语义色、功能色、尺寸、圆角、字体、状态样式和文档示例。

## 当前阶段状态

| 阶段 | 状态 | 说明 |
|---|---|---|
| 1. 恢复项目上下文 | 完成 | 已阅读根目录文档、历史计划、组件源码、样式 token 和 VitePress 配置。 |
| 2. 梳理历史计划 | 完成 | 已确认 `docs/superpowers/**` 是历史计划，不能直接当作最新完成状态。 |
| 3. 组件规范迁移 | 进行中 | 已完成 Badge、Tag、Input、InputNumber、Popper 等本轮重点清理。 |
| 4. 文档示例同步 | 进行中 | 已同步多数组件文档的 token、API 命名和示例状态。 |
| 5. Popper 底层定位基座 | 进行中 | 已明确 Popper 不提供 surface 样式；后续仍需处理 deferred 行为和 base review。 |
| 6. 项目记忆整理 | 完成 | 已新增/更新 `AGENTS.md`、`TODO.md`、`findings.md`、`progress.md`。 |

## 已完成的关键事项

- Badge sidebar 已补齐。
- `docs/superpowers/**` 已从 VitePress source 排除，构建不再受内部计划文档 dead link 影响。
- Badge API 改为 `theme="default|brand|success|warning|error"`。
- Tag 移除可配置尺寸，仅保留 sm 规格；默认高度 24px，左右 padding 8px。
- Input 默认宽度占满父容器，并修正 disabled bg/border/text。
- InputNumber disabled 鼠标样式已修正。
- PopperContent 默认无 border/background/text/radius/shadow，并支持上层通过 `class/style` 设置真实浮层 DOM。
- Popper 文档不再展示“深色/浅色”作为内置能力。
- `Icon.vue` 的 raw SVG 渲染已补充本地图标安全边界说明，并关闭该处 `vue/no-v-html` 告警。
- 全项目 `lint`、`format:check`、`typecheck`、`build` 已通过。
- 根目录异常空目录 `d...projectuisrccomponentsSpace` 已删除。
- 本地 Switch 视觉原型 `switch-mockups.html` 已删除。

## 后续计划

| 任务 | 优先级 | 说明 |
|---|---|---|
| Dark mode 色彩规范 | 高 | 当前完成的是 light 规范；dark token、暗色状态映射、文档说明和组件适配尚未完成。 |
| 继续组件迁移扫描 | 高 | 从源码和当前规范重新扫描，不依赖旧计划勾选状态。 |
| Popper deferred 行为处理 | 高 | 见 `TODO.md`，Select/Dropdown 开始前应优先处理。 |
| Base component review | 高 | Popper 作为底层组件，需要性能、功能、代码质量三路复查。 |
| 浏览器视觉验证 | 中 | 恢复可用浏览器/Playwright 后补做截图级验证。 |
| Icon 外部 SVG 安全策略 | 中 | 如果未来支持外部 SVG 输入，需要替换当前仅适用于本地白名单图标的策略。 |

## 工作约定

- commit message 使用 Conventional Commit 格式，并用中文说明。
- 不能擅自删除不确定用途的文件；先记录到 `TODO.md` 并询问用户。
- 修改色彩 token 时，同步检查样式源文件和设计指南。
- 未来新对话先读 `AGENTS.md` 和 `TODO.md`，再读本计划。
