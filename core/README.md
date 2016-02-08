# Text Mask Core

This module contains the core functions that power Text Mask. Currently, Text Mask
has a wrapper for React, which can be used directly.

However, Text Mask Core functions could be useful on their own. That's why they are published
and documented here as a separate module.

## Getting started

To download the script, use npm.

```
npm i @msafi/text-mask-core --save
```

### Include it

After installing with npm, you could possibly do something like this from your `index.html`:

```html
<script src="./node_modules/text-mask-core/dist/textMaskCore.js"></script>
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

```
const placeholder = convertMaskToPlaceholder('11/11/1111')

placeholder // __/__/____
```

You can use this function to initialize an `input` element to a placeholder value.

---

### `conformToMask(userInput, mask)`

This function takes two arguments:

* userInput (string): the string value that you want to conform to the mask
* mask (string): the mask to which you want the string to conform

And it returns the user input conformed to the given mask as a string.

```
const phoneNumber = conformToMask('5554833902', '(111) 111-1111')

phoneNumber // (555) 483-3902
```

Whenever the value of the `input` element changes, you can pass that value to `conformToMask`
and it'll make sure that the string looks like the given mask. You can then set that conformed
string as the new value of the `input` element.

---

### `adjustCaretPosition(previousUserInput, newUserInput, currentCaretPosition, mask)`

When you set the value of the `input` element, you lose the position of the caret. This function
helps you restore the position.

It takes three arguments:

* previousUserInput (string): the string value of the `input` before the last time you set its value
* newUserInput (string): the new string value to which you set the `input`
* currentCaretPosition (integer): the position of the caret before the last time you set `input` value
* mask (string): the mask to which you conformed the string

The functions diffs the new input and the previous input to guess where the caret should be.
