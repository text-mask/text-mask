# Text Mask Core

This module contains the core functions that power Text Mask. Currently, Text Mask
has a wrapper for React, which can be used directly.

However, Text Mask Core functions could be useful on their own. That's why they are published
and documented here as a separate module.

## Getting started

To download the script, use npm.

```bash
npm i @msafi/text-mask-core --save
```

### Include it

After installing with npm, you could possibly do something like this from your `index.html`:

```html
<script src="./node_modules/@msafi/text-mask-core/dist/textMaskCore.js"></script>
```

Including this file in your source code will expose the global object `textMaskCore`.

Or if you're using Node.js or a bundler such as webpack or Browserify, you can require
`textMaskCore` as such:

```js
var textMaskCore = require('@msafi/text-mask-core')
```

## How to use

`textMaskCore` exposes three functions:

* conformToMask
* adjustCaretPosition
* convertMaskToPlaceholder

### Overview

The general idea is to take user input, conform it to your desired mask using `conformToMask`,
and then apply the output of `conformToMask` to the value of the HTML input element.
Once you do that however, the caret position will be lost. You can then use `adjustCaretPosition`
to restore the caret to its proper position.

To learn more about how to do that, see the API documentation below:

## API documentation

### `convertMaskToPlaceholder(mask)`

This function takes a mask (string), i.e. `11/11/1111`, and returns a placeholder (string).

```js
const placeholder = convertMaskToPlaceholder('11/11/1111')

placeholder // __/__/____
```

You can use this function to initialize an `input` element to a placeholder value.

---

### `conformToMask(userInput, mask, config)`

This function takes three arguments:

* userInput (string): the string value that you want to conform to the mask
* mask (string): the mask to which you want the string to conform. You can find
[mask documentation here](../componentDocumentation.md#readme).
* config (object): optional config object. See below for details

This function returns an object shaped as `{output: 'someConformedString', meta: {...}}'`.

`output` is gonna contain the conformed string. As for `meta`, it contains some meta data
about the operation. This meta data is needed by `adjustCaretPosition` function,
which is documented below.

#### config

The `config` object takes the following values

* `guide` (boolean) (defaults to `true`): this tells `conformToMask` whether you want the conformed string to contain
a guide or no. The `guide` is basically the placeholder character and the mask hard characters.
For example, with mask `(111) 111-1111`, input `123` with `guide` set to `true` would return
`(123) ___-____`. With `guide` set to `false`, it would return `(123) `. However, for *no guide*
mode to work, you need to also pass `previousConformedInput` as a key of config as well.
* `previousConformedInput` (string): this is the previous `output` of `conformToMask`. If you're
calling `conformToMask` for the first time, pass this as an empty string. This key is only needed
if you want to use the *no guide* mode (i.e. `guide === false`).

```js
const results = conformToMask('5554833902', '(111) 111-1111')

results // {output: '(555) 483-3902', meta: {...some meta data}}
```

Whenever the value of the `input` element changes, you can pass that value to `conformToMask`
and it'll make sure that the string looks like the given mask. You can then set that conformed
string as the new value of the `input` element.

---

### `adjustCaretPosition(argumentsObject)`

When you set the value of the `input` element, you lose the position of the caret. This function
helps you restore the position.

`adjustCaretPosition` takes the following object of arguments:

* previousConformedInput (string): the string value of the `input` before the last time you set
its value. If you're calling this function for the first time, you can pass an empty string.
* conformedToMaskResults (object): the return value of the last call to `conformToMask`
* currentCaretPosition (integer): the position of the caret right before you called this
function

`adjustCaretPosition` will return an integer representing the index of where the caret should be
moved to next.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
