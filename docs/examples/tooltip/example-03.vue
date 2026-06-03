<template>
  <div class="flex flex-wrap justify-center gap-2" style="max-width: 400px; margin: 40px auto 20px">
    <Tooltip content="top-start" placement="top-start">
      <Button size="sm" theme="default">TS</Button>
    </Tooltip>
    <Tooltip content="top" placement="top">
      <Button size="sm" theme="default">T</Button>
    </Tooltip>
    <Tooltip content="top-end" placement="top-end">
      <Button size="sm" theme="default">TE</Button>
    </Tooltip>
  </div>

  <div class="flex items-center justify-between" style="max-width: 440px; margin: 0 auto 20px">
    <div class="flex flex-col gap-2">
      <Tooltip content="left-start" placement="left-start">
        <Button size="sm" theme="default">LS</Button>
      </Tooltip>
      <Tooltip content="left" placement="left">
        <Button size="sm" theme="default">L</Button>
      </Tooltip>
      <Tooltip content="left-end" placement="left-end">
        <Button size="sm" theme="default">LE</Button>
      </Tooltip>
    </div>
    <div class="flex flex-col gap-2">
      <Tooltip content="right-start" placement="right-start">
        <Button size="sm" theme="default">RS</Button>
      </Tooltip>
      <Tooltip content="right" placement="right">
        <Button size="sm" theme="default">R</Button>
      </Tooltip>
      <Tooltip content="right-end" placement="right-end">
        <Button size="sm" theme="default">RE</Button>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-wrap justify-center gap-2" style="max-width: 400px; margin: 0 auto">
    <Tooltip content="bottom-start" placement="bottom-start">
      <Button size="sm" theme="default">BS</Button>
    </Tooltip>
    <Tooltip content="bottom" placement="bottom">
      <Button size="sm" theme="default">B</Button>
    </Tooltip>
    <Tooltip content="bottom-end" placement="bottom-end">
      <Button size="sm" theme="default">BE</Button>
    </Tooltip>
  </div>
</template>
