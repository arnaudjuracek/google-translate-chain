# google-translate-chain

*Translate a string into another language, then another, then another, then...*

<br>

<img src="https://raw.githubusercontent.com/arnaudjuracek/google-translate-chain/assets/preview.png" alt="preview">

<br>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [CLI](#cli)
  - [Programmatic](#programmatic)
- [Credits](#credits)
- [License](#license)

<br>

## Installation

```sh
npm install --global arnaudjuracek/google-translate-chain
```

<br>

## Usage

**`google-translate-chain`** takes a string and passes it through a chain of consecutive translations.   
> <sub>Note: the _languages chain_ is designed so that its first item represent the language of the input string : if unknown, use the code `'AUTO'`, which will try to guess the correct language code.</sub> 

### CLI 
```
google-translate-chain

Usage:
  gtc "Hello world" "EN, FR, JP, AR, EN"
  gtc "Hello world" -l "EN, FR, JP, AR, EN"
  gtc "Hello world" -l <file>
  gtc --help
  gtc --version
  gtc --supported-languages

Options:
  -h, --help                    Show this screen.
  -v, --version                 Print the current version.
  -l, --languages=<array|file>  A comma-separated list of langCode.

  --supported-languages         Print all supported languages.

Aliases:
  gtc, gt-chain, gtranslate-chain, google-translate-chain
```
> <sup>Note: the external file used in `gtc "Hello world" -l <file>` must be a comma-separated list.
</sup>

<br>

### Programmatic

```js
const googleTranslate = require('google-translate-chain')

const opts = {
  // This is the default onTranslate function
  onTranslate: function (input, output, from, to) {
    console.log(`[${to}] ${output}`)
  }
}

googleTranslate
  .chain('hello world', ['en, fr, en'], opts)
  .then(output => console.log('output'))
  .catch(err => console.log(err))
```

```js
const googleTranslate = require('google-translate-chain')

console.log(googleTranslate.languages.isSupported('fr'))  // -> true
console.log(googleTranslate.languages.isSupported('foo')) // -> false
console.log(googleTranslate.languages.getCode('french'))  // -> fr
console.log(googleTranslate.languages.getCode('foo'))     // -> false
```

<br>

## Credits

This module was created for the bot **`#confus_cius`** by **[Hakim Achbé](https://www.instagram.com/hakim_achbe/)**, during the workshop _"Machine Jacking"_ hosted by [Chevalvert](http://chevalvert.fr) at [Stereolux](https://www.stereolux.org/agenda/workshop-machine-jacking).

<br>

## License
[MIT.](https://tldrlegal.com/license/mit-license)
