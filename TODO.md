# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 需要用户决策

- 暂无。

## 近期开发计划

- [ ] 继续完善公开底层组件 Field：首版 `src/components/Field/` primitives 已落地，并已迁移 Input / InputNumber；后续需要用 Select 多选、DatePicker range 等场景继续验证 FieldGroup、multiline 和 FieldSegment 边界。
- [ ] 继续下一轮组件迁移扫描，以当前源码为准，不直接信任旧计划文档。
- [ ] 后续扫描时只把组件源码内部实现作为规范约束对象；文档示例可保留外部使用者风格，不强制迁移到 Horizon token。
- [ ] 为关键组件补充更稳定的浏览器级视觉验证，尤其是 Input、Tag、Popper、InputNumber。
- [ ] 根据新的组件规范，继续统一文档示例里的组件 API 命名和状态说明；示例外部样式不强制 token 化。
- [ ] 后续评估新增 Toggle / ToggleGroup，用于承接 CheckboxGroup / RadioGroup 当前 `variant="button"` 这类分段切换形态；暂时不实现，现有 Checkbox / Radio button variant 先保持。
- [ ] 继续整理组件级固有尺寸规范：首轮扫描已确认 Badge、Switch、Tooltip / PopperArrow、Checkbox / Radio 控件几何、FieldAction、InputNumber 输入段宽度等属于候选项；优先决定哪些保留为组件内部几何常量，哪些沉淀为组件级 token。
- [ ] 最后补全 dark mode 色彩规范。当前颜色体系主要完成 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。

## 隐藏问题

- [ ] Field 一旦公开，API 需要谨慎收敛：首版只暴露结构、状态和样式基座，不承载 Select/DatePicker 等业务行为；多选 Select 的 Tag wrap / searchable / maxTagCount 是后续关键压力测试。
- [ ] 组件级固有尺寸尚未统一规范，例如 Badge 点/计数尺寸、Switch 轨道与滑块、Tooltip 箭头等；后续需要逐项确认是新增组件级 token、改为现有尺寸 token，还是作为特殊几何尺寸保留。
- [ ] Checkbox / Radio 的 button variant 未来可迁移或抽象到 Toggle / ToggleGroup；迁移前需确认是否保持多选/单选语义差异，避免只为了视觉复用而损失表单语义。
- [ ] Popper 未来可按上层组件需要继续扩展边界能力，例如嵌套弹出层协调、boundary 自定义、crossAxis offset 或 fallback placement；当前 Select/Dropdown 前置的响应式配置、disabled 自动关闭、matchWidth trigger resize 和 base-component review 已完成。
- [ ] 如未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 本地图标白名单策略，加入 sanitizer 或改为更安全的渲染路径。
- [ ] in-app browser / Playwright 能力已恢复并用于 Field、Input、InputNumber 视觉验证；后续继续为关键组件补浏览器级视觉回归。
- [ ] `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物。如果没有 dev server 依赖，可以定期清理。
- [ ] `npm audit` 当前报告 4 个 moderate 项：`brace-expansion` 可通过 `npm audit fix` 处理，`vitepress@1.6.4` 嵌套的 `vite/esbuild` 暂无直接修复版本；后续升级 VitePress/Vite 时复查。
- [ ] 当前 Node 为 `v22.10.0`，安装依赖时 `eslint-visitor-keys@5.0.1` 提示需要 `^20.19.0 || ^22.13.0 || >=24`；建议后续本地/CI Node 升到 22.13+ 或 24 LTS。
- [ ] `AGENTS.md` 已重写为中文快速入口；后续如组件规范变化，要同步更新。

## 工作习惯

- [ ] 后续 commit message 使用 Conventional Commit 格式，并用中文说明，例如 `docs(project): 更新项目上下文与待办`。
- [ ] 遇到不确定是否删除的文件，先在本文件记录，再询问用户确认。
