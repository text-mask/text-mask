# @thaborach/react-text-mask

Text Mask is an input mask library. It can create input masks for phone, date, currency, zip code, percentage, email,
and literally anything!

It is forked from [text mask](https://github.com/text-mask/text-mask) which is deprecated and no longer being maintained.

[Check out the demo](https://thaborach.github.io/react-text-mask/)

## Table of Contents

* [Installation and usage](#installation-and-usage)
* [Properties](#properties)
* [Utilities](#utilities)

## Installation and usage

### Installation

**npm**:

```bash
npm i @thaborach/react-text-mask --save
```

**yarn**:

```bash
yarn add @thaborach/react-text-mask
```

### Usage

```js
import React from 'react'
import { MaskedInput } from 'react-text-mask'

export default function TelephoneInput(){
    
    return (
        <div>
            <MaskedInput
                type='tel'
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            />
        </div>
    )
}
```

`<MaskedInput/>` is fully compatible with `<input/>` element. So, you can
pass it CSS classes, a placeholder attribute, or even an `onBlur` handler.

For example, the following works:

```js
<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  type="tel"
  className="form-control"
  placeholder="Enter a phone number"
  guide={false}
  id="my-input-id"
  onBlur={() => {}}
  onChange={() => {}}
/>
```

## Properties

Text Mask accepts the following values as props:

* [`mask`](#mask) (array, function, object or boolean) (required)
* [`type`](#type) ('text' | 'tel' | 'url' | 'password' | 'search') (optional)
* [`guide`](#guide) (boolean) (optional)
* [`pipe`](#pipe) (function) (optional)
* [`placeholderChar`](#placeholderchar) (string) (optional)
* [`keepCharPositions`](#keepcharpositions) (boolean) (optional)
* [`showMask`](#showmask) (boolean) (optional)
* [`render`](#render) (function) (optional)

### `mask`

`mask` is an array, function or object that defines how the user input is going to be masked.

#### `mask` array

Easiest way to define a mask is to use an array.

Each element in the array has to be either a string or a regular expression. Each string is a fixed character in the mask and each regular expression is a placeholder that accepts user input.

The regular expression will be used to test user input and either allow it or reject it.

For example, a mask for a U.S. phone number such as `(555) 392-4932`, could be:

```js
['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
```

That means the user can enter only a number between 1 and 9 in the first placeholder, and only a digit in the placeholders after that.

Any valid regular expressions should work.

#### `mask` function

You can also pass a function as the `mask`. The function will receive the user input at every
change. The function is expected to return a `mask` array as described [above](#mask).

```js
const mask = function(rawValue) {
  // add logic to generate your mask array
  return [ /*your mask array*/ ]
}
```

This feature is useful when we want to format a user input of unknown length, such as
formatting a number to currency or formatting a string to email address mask.

For an example of a mask function, see the source code of
[`createNumberMask`](https://github.com/text-mask/text-mask/blob/master/addons/src/createNumberMask.js),
which is a [Text Mask addon](https://github.com/text-mask/text-mask/tree/master/addons/#readme).

<p align="center">
<img src="assets/dynamicMask.gif"/>
</p>

#### `mask` object

Coming soon...

#### `mask` boolean

It is possible to set the mask to `false` to disable masking completely.

### `type`

**It is set to `text` by default.**

We only support input types of `text`, `tel`, `url`, `password`, and `search`.
Due to a limitation in browser API, other input types, such as `email` or `number`, cannot be supported. However, it is normal to let the user enter an email or a number in an input type `text` combined with the appropriate input mask.

### `guide`

`guide` is a boolean that tells the component whether to be in *guide* or *no guide* mode.

**It is set to `true` by default.**

<table>
<tbody>
<tr>
<th>Guide mode</th>
<th>No-guide mode</th>
</tr>

<tr>
<td>
<p align="center">
<img src="assets/guideMode.gif"/>
</p>

<p>
When <code>guide</code> is <code>true</code>, Text Mask always shows both placeholder characters and non-placeholder
mask characters.
</p>
</td>

<td>
<p align="center">
<img src="assets/noGuideMode.gif"/>
</p>

</p>
When <code>guide</code> is <code>false</code>, Text Mask doesn't print out placeholder characters and only adds mask
characters when the user reaches them as they're typing.
</p>
</td>
</tr>
</tbody>
</table>

### `pipe`

You can provide a `pipe` function that will give you the opportunity to modify the conformed value before it is
displayed on the screen.

The `pipe` function receives:

1. `conformedValue`
2. `config`

The `conformedValue` is the value that the user entered after it has been conformed.
The `config` is an object that contains all the user configurations for the component (the ones detailed on this page).

The `pipe` function must return one of the following: `false`, `string`, or `object`.

Return `false` to reject the new conformed value and keep the input field from changing.

If the `pipe` modifies the string without adding new characters, for example, changing letter capitalization or removing characters, it should return the modified string.

If the `pipe` adds new characters to the string, it must return an object with the following keys:

1. `value`: the new string
2. `indexesOfPipedChars`: array of integers, which contains the indexes of all the characters that were added by the `pipe` to the conformed value

For an example of a pipe, see the code for
[`createAutoCorrectedDatePipe`](https://github.com/text-mask/text-mask/blob/master/addons/src/createAutoCorrectedDatePipe.js)
which is a [Text Mask addon](https://github.com/text-mask/text-mask/tree/master/addons/#readme).

### `placeholderChar`

The placeholder character represents the fillable spot in the mask.

**It is set to `_` (underscore) by default.**

For example, with mask...

```js
['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
```

...the user would fill out `(___) ___-____`.

You can pass a different placeholder character. For example, the unicode character `U+2000` would
make the mask above look like `(   )    -    `.

In JavaScript, you would pass such unicode character as `'\u2000'`.

&#x1F4CD; **Note**: you cannot use a mask that has a placeholder character hard-coded in it. That
is, since the default placeholder character is `_`, you cannot have a mask that looks like
`_111_` unless you pass `placeholderChar` that is not `_` and doesn't exist
in your mask.

### `keepCharPositions`

`keepCharPositions` changes the general behavior of the Text Mask component.

**It is set to `false` by default**,

<table>
<tbody>
<tr>
<th><code>keepCharPositions</code> is set to <code>true</code></th>
<th><code>keepCharPositions</code> is set to <code>false</code></th>
</tr>

<tr>
<td>
<p align="center">
<img src="assets/keepCharPositionsTrue.gif"/>
</p>

<p>
When <code>true</code>, adding or deleting characters will not affect the positions of existing characters.
</p>
</td>

<td>
<p align="center">
<img src="assets/keepCharPositionsFalse.gif"/>
</p>

</p>
When <code>false</code>, adding characters causes existing characters to advance. And deleting characters
causes existing characters to move back.
</p>
</td>
</tr>
</tbody>
</table>

### `showMask`

`showMask` is a boolean that tells the component to display the mask as a placeholder in place of the regular placeholder when the input element value is empty.

### `render`

For advanced use cases, you can customize the rendering of the resultant `<input>` via a render prop.
This is entirely optional.

If no `render` prop is passed, a normal `<input>` is rendered.

For example, to use with styled-components,
[which requires an innerRef](https://www.styled-components.com/docs/advanced#refs):

```js
<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  placeholder="Enter a phone number"
  id="my-input-id"
  render={(ref, props) => (
    <MyStyledInput innerRef={ref} {...props} />
  )}
/>

const MyStyledInput = styled.input`
  background: papayawhip;
`;
```

## Utilities

In addition to the Mask Input component there are additional utility functions that you can utilize, such as:

* [`conformToMask`](#conformtomask)

### `conformToMask`

It is the function that the Masked input component uses to transform text to the given mask.

#### Importing it

It is included for convenience. So you can import it from the package as follows

```js
import { MaskedInput, conformToMask } from 'react-text-mask';
```

#### Using it

`conformToMask` accepts three arguments:

* text (string) (required)
* [mask](#mask) (array) (required)
* config (object) (optional)

`config` is [these values](https://github.com/text-mask/text-mask/blob/master/core/src/conformToMask.js#L9-L14).
The linked variable names have similar names to properties that are described above in this document. So you can learn what each one is for by reading the documentation above.

The return value of `conformToMask` is an object with the following shape:

```json
{
  "conformedValue": "(123) 123-1234",
  "meta": {
    "someCharsRejected": false
  }
}
```

So, one way to use `conformToMask` could be as follows:

```js
const phoneNumber = '5551234444'
const phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

const conformedPhoneNumber = conformToMask(
  phoneNumber,
  phoneNumberMask,
  {guide: false}
)

console.log(conformedPhoneNumber.conformedValue) // prints (555) 123-4444
```


## Flexible

Text Mask is very configurable and allows you to create any type of input mask with minimal APIs.
[See the documentation for details](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Extendable

You can easily expand the base functionality of Text Mask with addons for more mask types.
[Checkout existing addons](https://github.com/text-mask/text-mask/tree/master/addons/#readme).

## Robust

Text Mask supports pasting, browser auto-fill, and all operations that a user would expect while interacting with
an input field.

It works on mobile, has no 3rd party dependencies, and has a tiny footprint (less than 4KB gzipped).

## For any questions, suggestions, or feature requests

[Please file an issue](https://github.com/text-mask/text-mask/issues)!

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.
