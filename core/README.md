# Text Mask Core

This module contains the core functions that power Text Mask. Currently, Text Mask
has a wrapper for React, which can be used directly.

However, Text Mask Core functions could be useful on their own. That's why they are published
and documented here as a separate module.

## Getting started

To download the script, use npm.

```bash
npm i text-mask-core --save
```

---

# &#x1F6A8; the documentation below this point is out-of-date and could be inaccurate

### Include it

After installing with npm, you could possibly do something like this from your `index.html`:

```html
<script src="./node_modules/text-mask-core/dist/textMaskCore.js"></script>
```

Including this file in your source code will expose the global object `textMaskCore`.

Or if you're using Node.js or a bundler such as webpack or Browserify, you can require
`textMaskCore` as such:

```js
var textMaskCore = require('text-mask-core')
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

## API documentation

### `convertMaskToPlaceholder(mask)`

This function takes a mask (string), i.e. `11/11/1111`, and returns a placeholder (string).

```js
const placeholder = convertMaskToPlaceholder('11/11/1111')

placeholder // __/__/____
```

You can use this function to initialize an `input` element to a placeholder value.

---

### `conformToMask(rawValue, mask, config)`

This function takes three arguments:

* rawValue (string): the string value that you want to conform to the mask
* mask (string): the mask to which you want the string to conform. You can find
[mask documentation here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).
* config (object): config object. See below for details

This function returns the conformed value as a string.

#### config

The `config` object takes the following values

* `guide` (boolean) (defaults to `true`): this tells `conformToMask` whether you want the conformed
string to contain a guide or no. The `guide` is basically the placeholder character and the
mask hard characters. For example, with mask `(111) 111-1111`, input `123` with `guide` set to
`true` would return `(123) ___-____`. With `guide` set to `false`, it would return `(123) `.

* `previousConformedValue` (string) (required): this is the previous `output` of `conformToMask`.
If you're calling `conformToMask` for the first time, you don't have to pass this value.

* `placeholderChar` (string) (optional): for documentation on this key, [see this section of the component
documentation page](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#placeholderChar).

```js
const results = conformToMask('5554833902', '(111) 111-1111')

results // '(555) 483-3902'
```

Whenever the value of the `input` element changes, you can pass that value to `conformToMask`
and it'll make sure that the string looks like the given mask. You can then set that conformed
string as the new value of the `input` element.

---

### `adjustCaretPosition(argumentsObject)`

When you set the value of the `input` element, you lose the position of the caret. This function
helps you restore the position.

`adjustCaretPosition` takes the following object of arguments:

* `previousConformedValue` (string): the string value of the `input` before the last time you set
its value. If you're calling this function for the first time, you can pass an empty string.
* `conformedToMaskResults` (object): the return value of the last call to `conformToMask`
* `currentCaretPosition` (integer): the position of the caret right before you called this
function

`adjustCaretPosition` will return an integer representing the index of where the caret should be
moved to next.
