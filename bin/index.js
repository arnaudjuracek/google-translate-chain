#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const googleTranslate = require(path.join('..', 'lib/gt-chain.js'))

const minimistOpts = {
  boolean: ['help', 'quiet', 'version', 'supported-languages'],
  string: ['languages'],
  alias: {
    help: ['h'],
    languages: ['l'],
    quiet: ['q'],
    version: ['v']
  }
}

const argv = minimist(process.argv.slice(2), minimistOpts)

if (argv.help) {
  console.log(fs.readFileSync(path.join(__dirname, 'usage.txt'), 'utf-8'))
  process.exit(0)
}

if (argv['supported-languages']) {
  Object.entries(googleTranslate.languages).forEach(lang => {
    typeof lang[1] === 'string' && console.log(lang[0].toUpperCase(), '\t', lang[1])
  })
  process.exit(0)
}

if (argv.version) {
  const pckg = require(path.join(__dirname, '..', 'package.json'))
  console.log(pckg.version)
  process.exit(0)
}

const input = argv._[0]

// NOTE: languages is either a path to a file or directly an array of langcodes
let languages = argv._[1] || argv.languages
if (fs.existsSync(languages) && fs.lstatSync(languages).isFile()) {
  languages = fs.readFileSync(languages, 'utf-8')
}

if (input && languages) {
  languages = languages.replace(/\s/g, '').split(',')
  googleTranslate.chain(input, languages, { verbose: !argv.quiet })
    .then(output => argv.quiet && console.log(output))
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
} else {
  console.log(fs.readFileSync(path.join(__dirname, 'usage.txt'), 'utf-8'))
  process.exitCode = 1
}
