'use strict'

const translate = require('google-translate-api')
const waterfall = require('promise-waterfall')

const defaultOpts = {
  verbose: false,
  onTranslate: function (input, output, from, to) {
    this.opts.verbose && console.log(`[${to}] ${output}`)
  }
}

function next (input, languages, index) {
  return new Promise((resolve, reject) => {
    const to = this.languages[this.index + 1]
    const from = this.languages[this.index]
    if (!to || !from) return resolve(input)

    translate(input, { from, to }).then(response => {
      this.opts.onTranslate.call(this, input, response.text, from, to)
      resolve(response.text)
    }).catch(err => reject(err))
  })
}

module.exports = {
  ...translate,
  chain: (input, languages, opts) => {
    if (typeof input !== 'string') return Promise.reject(new TypeError(`'input' must be a string.`))
    if (!Array.isArray(languages)) return Promise.reject(new TypeError(`'languages' must be an array.`))
    if (!languages.length) return Promise.reject(new RangeError(`'languages' is empty.`))

    opts = Object.assign({}, defaultOpts, opts || {})
    languages = languages.filter(lang => {
      if (translate.languages.isSupported(lang)) return true
      opts.verbose && console.log(`The language code '${lang.toUpperCase()}' isn't supported, and will be skipped.`)
    })

    if (!languages.length) return Promise.reject(new Error(`You must specify at least one supported language.`))

    const translations = languages.map((_, index) => next.bind({ index, languages, opts }))
    return waterfall([
      () => new Promise(resolve => {
        opts.verbose && console.log(`[${languages[0].toUpperCase()}] ${input}`)
        resolve(input)
      }),
      ...translations
    ])
  }
}
