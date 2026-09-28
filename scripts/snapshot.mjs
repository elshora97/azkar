// Regenerates the offline fallback dataset from the Hisn Muslim API.
// Usage: node scripts/snapshot.mjs
import { writeFile } from 'node:fs/promises'
import { CHAPTERS } from '../src/data/chapters.js'

const ids = [...new Set(Object.values(CHAPTERS).flat())]
const out = {}

for (const id of ids) {
  const res = await fetch(`https://www.hisnmuslim.com/api/en/${id}.json`)
  const text = (await res.text()).replace(/^﻿/, '')
  const json = JSON.parse(text)
  const [title] = Object.keys(json)
  out[id] = { title, items: json[title] }
  console.log(`chapter ${id}: ${json[title].length} items`)
}

await writeFile(new URL('../src/data/fallback.json', import.meta.url), JSON.stringify(out))
console.log('wrote src/data/fallback.json')
