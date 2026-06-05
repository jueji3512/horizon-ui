import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const iconsDir = path.join(rootDir, 'src/components/Icon/icons')

const files = (await readdir(iconsDir)).filter((file) => file.endsWith('.svg')).sort()
const errors = []

function readAttribute(svg, name) {
  return svg.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? ''
}

for (const file of files) {
  const svg = await readFile(path.join(iconsDir, file), 'utf8')
  const svgTag = svg.match(/<svg\b[^>]*>/)?.[0] ?? ''
  const pathData = svg.replace(svgTag, '')

  const viewBox = readAttribute(svgTag, 'viewBox')
  const width = readAttribute(svgTag, 'width')
  const height = readAttribute(svgTag, 'height')
  const fixedColors = [...svg.matchAll(/(?:#[0-9a-fA-F]{3,8}|rgb\([^)]*\)|oklch\([^)]*\))/g)].map(
    (match) => match[0],
  )

  if (viewBox !== '0 0 24 24') {
    errors.push(`${file}: expected viewBox="0 0 24 24", got "${viewBox || '(missing)'}"`)
  }

  if (width || height) {
    errors.push(`${file}: root svg must not hard-code width/height`)
  }

  if (fixedColors.length > 0) {
    errors.push(`${file}: uses fixed colors (${[...new Set(fixedColors)].join(', ')})`)
  }

  if (!/stroke="currentColor"/.test(svg) && !/fill="currentColor"/.test(pathData)) {
    errors.push(`${file}: expected stroke or fill to use currentColor`)
  }

  if (/stroke-width=/.test(svg) && !/stroke-width="2"/.test(svg)) {
    errors.push(`${file}: stroke-width must be 2`)
  }

  if (/stroke-linecap=/.test(svg) && !/stroke-linecap="round"/.test(svg)) {
    errors.push(`${file}: stroke-linecap must be round`)
  }

  if (/stroke-linejoin=/.test(svg) && !/stroke-linejoin="round"/.test(svg)) {
    errors.push(`${file}: stroke-linejoin must be round`)
  }
}

if (errors.length > 0) {
  console.error(`Icon validation failed with ${errors.length} issue(s):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Icon validation passed for ${files.length} SVG files.`)
