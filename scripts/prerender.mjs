import { readFile, writeFile } from 'node:fs/promises'
import { render } from '../.prerender/prerender.js'

const path = new URL('../dist/index.html', import.meta.url)
const html = await readFile(path, 'utf8')
const target = '<div id="root"></div>'
if (!html.includes(target)) throw new Error('Missing root element for prerendering')
await writeFile(path, html.replace(target, `<div id="root">${render()}</div>`))
console.log('Static HTML generated for search engines and first paint.')
