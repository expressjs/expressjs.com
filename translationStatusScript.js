const fs = require('node:fs')

const contentBase = `---
layout: page
title: Status Translate
menu: resources
lang: en
redirect_from: "/resources/status-translate.html"
---

# Status Translate

This page shows the status of the translation of the documentation into different languages.

| en |`

let content = contentBase

const languageBase = 'en'
const verifyLanguage = ['pt-br', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'ru', 'tr', 'th', 'sk', 'uz', 'zh-cn', 'zh-tw']

const statusTranslate = []
statusTranslate[`${languageBase}`] = []

verifyLanguage.forEach((language) => {
  content = content + ` ${language} |`
  statusTranslate[`${language}`] = []
})

content = content + '\n |---|'

verifyLanguage.forEach(() => {
  content = content + '---|'
})

content = content + '\n'

const ignoreFiles = ['resources/status-translate']

const languageBaseFiles = ['guide', 'resources', 'resources/middleware', 'starter', 'advanced', '3x', '4x', '5x']

languageBaseFiles.forEach((pathVerify) => {
  const files = fs.readdirSync(`./${languageBase}/${pathVerify}`)
  const filesFiltered = files.filter((file) => file.includes('.md'))

  verifyLanguage.forEach((language) => {
    const verifyPath = fs.existsSync(`./${language}/${pathVerify}`)

    let filesCompare = []
    let filesFilteredCompare = []

    if (verifyPath) {
      filesCompare = fs.readdirSync(`./${language}/${pathVerify}`)
      filesFilteredCompare = filesCompare.filter((file) => file.includes('.md'))
    }

    filesFiltered.forEach((file) => {
      const getFileName = file

      if (ignoreFiles.includes(getFileName)) return

      statusTranslate[languageBase][`${pathVerify}/${getFileName}`] = `${pathVerify}/${getFileName}`

      const getDateModified = fs.statSync(`./${languageBase}/${pathVerify}/${file}`).mtime
      const dateFile = new Date(getDateModified)

      if (filesFilteredCompare.includes(file)) {
        const verifyFileToCompare = fs.existsSync(`./${language}/${pathVerify}/${file}`)

        if (!verifyFileToCompare) {
          statusTranslate[language][`${pathVerify}/${getFileName}`] = '❌'
          return
        }

        const getDateModifiedCompare = fs.statSync(`./${language}/${pathVerify}/${file}`).mtime
        const dateCompare = new Date(getDateModifiedCompare)

        if (dateFile.getTime() <= dateCompare.getTime()) {
          statusTranslate[language][`${pathVerify}/${getFileName}`] = '✅'
        } else {
          statusTranslate[language][`${pathVerify}/${getFileName}`] = '🔄'
        }
      } else {
        statusTranslate[language][`${pathVerify}/${getFileName}`] = '❌'
      }
    })
  })
})

let createTable = ''

Object.keys(statusTranslate[languageBase]).forEach((key) => {
  createTable = createTable + `| ${key} | `
  verifyLanguage.forEach((language) => {
    createTable = createTable + `${statusTranslate[language][key]} | `
  })
  createTable = createTable + '\n'
})

content = content + `${createTable}`

fs.writeFile('./en/resources/status-translate.md', content, (err) => {
  if (err) {
    console.error(err)
  } else {
    // file written successfully
    console.log('Status Translate file created')
  }
})
