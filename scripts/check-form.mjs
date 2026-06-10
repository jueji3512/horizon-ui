import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const checks = []

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
}

function expectFile(relativePath) {
  checks.push({
    name: `${relativePath} exists`,
    pass: existsSync(join(root, relativePath)),
  })
}

function expectIncludes(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} includes ${pattern}`,
    pass: existsSync(filePath) && read(relativePath).includes(pattern),
  })
}

function expectNotIncludes(relativePath, pattern, label) {
  const filePath = join(root, relativePath)
  checks.push({
    name: label ?? `${relativePath} does not include ${pattern}`,
    pass: existsSync(filePath) && !read(relativePath).includes(pattern),
  })
}

expectFile('src/components/Form/Form.vue')
expectFile('src/components/Form/FormItem.vue')
expectFile('src/components/Form/FormItemLabel.vue')
expectFile('src/components/Form/FormItemMessage.vue')
expectFile('src/components/Form/context.ts')
expectFile('src/components/Form/types.ts')
expectFile('src/components/Form/validator.ts')
expectFile('src/components/Form/index.ts')
expectFile('docs/components/form.md')
expectFile('docs/examples/form/example-01.vue')
expectFile('docs/examples/form/example-02.vue')
expectFile('docs/examples/form/example-03.vue')

expectIncludes('src/components/Form/Form.vue', "labelAlign: 'right'")
expectIncludes('src/components/Form/Form.vue', 'labelWidth: 120')
expectIncludes('src/components/Form/Form.vue', 'showStatusIcon: true')
expectIncludes(
  'src/components/Form/Form.vue',
  'horizon-form flex flex-col gap-0',
  'Form items should not use flex gap for message spacing',
)
expectIncludes('src/components/Form/Form.vue', 'defineExpose')
expectIncludes('src/components/Form/Form.vue', 'validateField')
expectIncludes('src/components/Form/Form.vue', 'validateFields')
expectIncludes('src/components/Form/Form.vue', 'resetField')
expectIncludes('src/components/Form/Form.vue', 'resetFields')
expectIncludes('src/components/Form/Form.vue', 'clearValidateField')
expectIncludes('src/components/Form/Form.vue', 'clearValidate')
expectIncludes('src/components/Form/Form.vue', 'provide(formContextKey')
expectIncludes(
  'src/components/Form/Form.vue',
  'Promise.all([...items].map((item) => item.validate()))',
  'Form validate should start all item validations concurrently',
)
expectIncludes(
  'src/components/Form/Form.vue',
  'Promise.all(targets.map((item) => item.validate()))',
  'Form validateFields should start target validations concurrently',
)
expectIncludes(
  'src/components/Form/Form.vue',
  'function getTargetItemsByName(name: FormNamePath)',
  'Form should resolve a single field name without array-shape ambiguity',
)
expectIncludes(
  'src/components/Form/Form.vue',
  'function getTargetItemsByNames(names?: FormNamePath[])',
  'Form should resolve multiple field names through an explicit field list',
)
expectNotIncludes(
  'src/components/Form/Form.vue',
  'Array.isArray(names[0])',
  'Form field APIs must not guess whether an array is a name path or field list',
)

expectIncludes('src/components/Form/FormItem.vue', 'required?: boolean')
expectIncludes('src/components/Form/FormItem.vue', 'tip?: string')
expectIncludes('src/components/Form/FormItem.vue', 'help?: string')
expectIncludes('src/components/Form/FormItem.vue', "from './validator'")
expectIncludes('src/components/Form/FormItem.vue', 'validateRules')
expectIncludes('src/components/Form/FormItem.vue', 'getValueByNamePath')
expectIncludes('src/components/Form/FormItem.vue', 'setValueByNamePath')
expectIncludes('src/components/Form/FormItem.vue', 'displayMessage')
expectIncludes('src/components/Form/FormItem.vue', 'props.message || validateMessage.value')
expectIncludes(
  'src/components/Form/FormItem.vue',
  "validateStatus.value = result.valid ? undefined : 'error'",
  'FormItem should commit its validation status as soon as its own validation finishes',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'validateMessage.value = result.message',
  'FormItem should commit its validation message as soon as its own validation finishes',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'let validationSeq = 0',
  'FormItem should track validation order for async validators',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'if (seq !== validationSeq) return result.valid',
  'FormItem should ignore stale async validation results',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'horizon-form-item mb-6 grid w-full items-start gap-x-3',
  'FormItem should reserve a 24px message area with margin-bottom',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'form-item-control relative min-w-0',
  'FormItem control cell should anchor its message layer',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'form-item-control-field flex min-w-0 items-center',
  'FormItem control field must vertically center compact controls',
)
expectIncludes('src/components/Form/FormItem.vue', 'form-item-action')
expectIncludes(
  'src/components/Form/FormItem.vue',
  'form-item-action flex w-5 min-w-5 items-center gap-2 overflow-visible whitespace-nowrap',
  'FormItem action/status area should vertically center status icons',
)
expectIncludes(
  'src/components/Form/FormItem.vue',
  'h-5 w-5 shrink-0 text-xl',
  'FormItem status icons should render at the reserved 20px size',
)
expectIncludes('src/components/Form/FormItem.vue', 'actionColumnWidth')
expectNotIncludes(
  'src/components/Form/FormItem.vue',
  'props.help || props.message',
  'FormItem help must not fall through into the validation message line',
)
expectNotIncludes(
  'src/components/Form/FormItem.vue',
  'min-w-0 flex-1',
  'FormItem action/status area must not live inside the flexible control column',
)
expectNotIncludes(
  'src/components/Form/FormItem.vue',
  'rule.validator(value',
  'FormItem validation rule execution must live in validator.ts',
)
expectIncludes('src/components/Form/FormItem.vue', 'showStatusIcon')
expectIncludes('src/components/Form/FormItem.vue', 'provide(formItemContextKey')
expectIncludes('src/components/Form/FormItemLabel.vue', 'Tooltip')
expectIncludes('src/components/Form/FormItemLabel.vue', 'circle-help')
expectNotIncludes(
  'src/components/Form/FormItemLabel.vue',
  ':show-arrow="false"',
  'FormItem help tooltip must keep the Tooltip arrow enabled',
)
expectIncludes('src/components/Form/FormItemMessage.vue', 'form-item-message')
expectIncludes(
  'src/components/Form/FormItemMessage.vue',
  'absolute top-full right-0 left-0 h-5 truncate pt-0 leading-5',
  'FormItem message should live inside the reserved 20px margin area',
)

expectIncludes('src/components/Form/context.ts', 'formContextKey')
expectIncludes('src/components/Form/context.ts', 'formItemContextKey')
expectIncludes('src/components/Form/context.ts', 'useFormControl')
expectIncludes(
  'src/components/Form/types.ts',
  "export type FormLabelAlign = 'left' | 'right' | 'top'",
)
expectIncludes(
  'src/components/Form/types.ts',
  "export type FormStatus = 'error' | 'warning' | 'success'",
)
expectNotIncludes('src/components/Form/types.ts', 'validateOnly')
expectNotIncludes('src/components/Form/types.ts', 'commitValidateResult')
expectIncludes('src/components/Form/types.ts', 'FormRule')
expectIncludes('src/components/Form/types.ts', 'FormNamePath')
expectIncludes('src/components/Form/validator.ts', 'export function normalizeNamePath')
expectIncludes('src/components/Form/validator.ts', 'export function getValueByNamePath')
expectIncludes('src/components/Form/validator.ts', 'export function setValueByNamePath')
expectIncludes(
  'src/components/Form/validator.ts',
  'return value.map((item) => cloneFormValue(item))',
  'Form reset should deep-clone array initial values',
)
expectIncludes(
  'src/components/Form/validator.ts',
  'cloneFormValue(nestedValue)',
  'Form reset should deep-clone object initial values',
)
expectIncludes('src/components/Form/validator.ts', 'export async function validateRules')

expectIncludes('src/components/Input/Input.vue', 'useFormControl')
expectIncludes('src/components/Input/Input.vue', 'notifyControlChange')
expectIncludes('src/components/Input/Input.vue', 'notifyControlBlur')
expectIncludes('src/components/InputNumber/InputNumber.vue', 'useFormControl')
expectIncludes('src/components/InputNumber/InputNumber.vue', 'effectiveStatus')
expectIncludes('src/components/Select/Select.vue', 'useFormControl')
expectIncludes('src/components/Select/Select.vue', 'notifyControlChange')
expectIncludes('src/components/Checkbox/Checkbox.vue', 'useFormControl')
expectIncludes('src/components/Checkbox/CheckboxGroup.vue', 'useFormControl')
expectIncludes('src/components/Radio/RadioGroup.vue', 'useFormControl')
expectIncludes('src/components/Switch/Switch.vue', 'useFormControl')

expectIncludes('src/components/Form/index.ts', 'FormItem')
expectIncludes('src/components/index.ts', 'FormItem')
expectIncludes('docs/.vitepress/theme/index.ts', 'FormItem')
expectIncludes('docs/.vitepress/config.ts', '/components/form')
expectIncludes('docs/components/form.md', 'labelAlign')
expectIncludes('docs/components/form.md', 'labelWidth')
expectIncludes('docs/components/form.md', 'help')
expectIncludes('docs/components/form.md', 'showStatusIcon')
expectIncludes('docs/components/form.md', 'validateFields')
expectIncludes('docs/components/form.md', 'resetField')
expectIncludes('docs/components/form.md', 'clearValidateField')
expectIncludes('docs/examples/form/example-01.vue', '<Form')
expectIncludes('docs/examples/form/example-01.vue', '<FormItem')
expectIncludes('docs/examples/form/example-02.vue', 'label-align="top"')
expectIncludes('docs/examples/form/example-03.vue', 'validate')
expectNotIncludes(
  'docs/examples/form/example-03.vue',
  'setTimeout',
  'Form async validation example must not add artificial visual delay',
)
expectIncludes('package.json', 'check:form')

const failures = checks.filter((check) => !check.pass)

if (failures.length > 0) {
  console.error(`Form contract check failed: ${failures.length} issue(s)`)
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Form contract check passed: ${checks.length} checks`)
