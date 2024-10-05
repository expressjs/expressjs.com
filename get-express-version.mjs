import { writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const NPMURL = 'https://registry.npmjs.org/express'

const response = await fetch(NPMURL).then((res) => res.json())

const { next, latest } = response['dist-tags']

const contentFile = await readFile(
  path.resolve(path.join('_data', 'express.yml')),
  'utf8'
)
  .then((content) =>
    content.replace(/current_version: ".*"/, `current_version: "${latest}"`)
  )
  .then((content) =>
    content.replace(/next_version: ".*"/, `next_version: "${next}"`)
  )

writeFileSync('_data/express.yml', contentFile)
