import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const NPMURL = 'https://registry.npmjs.org/express'

const response = await (await fetch(NPMURL)).json()

const { next, latest } = response['dist-tags']

try {
  const filePath = path.resolve(path.join('..', '..', '_data', 'express.yml'))
  let content = await readFile(filePath, 'utf8')

  content = content.replace(/current_version: ".*"/, `current_version: "${latest}"`)
  content = content.replace(/next_version: ".*"/, `next_version: "${next}"`)

  await writeFile(filePath, content, 'utf8')
} catch (error) {
  console.error('Error updating versions in _data/express.yml:', error)
}
