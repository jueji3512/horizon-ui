<template>
  <div class="flex flex-col gap-3">
    <FieldRoot size="sm">
      <FieldNativeInput model-value="小尺寸" readonly />
    </FieldRoot>
    <FieldRoot size="md" status="error" focused>
      <FieldNativeInput model-value="错误状态" readonly />
    </FieldRoot>
    <FieldRoot size="lg" status="warning">
      <FieldNativeInput model-value="警告状态" readonly />
    </FieldRoot>
    <FieldRoot disabled>
      <FieldNativeInput model-value="禁用状态" />
    </FieldRoot>
  </div>
</template>
