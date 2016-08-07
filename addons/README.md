# Text Mask Addons

These addons are ready-to-use pipes and masks that can be used with Text Mask.

## Installation

```bash
npm i text-mask-addons --save
```

## Masks

These can be passed as a
[`mask`](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#mask)
to Text Mask.

### `createNumberMask`

`createNumberMask` returns a `numberMask` function that will format user input as currency.
`createNumberMask` accepts an object with the following keys:

1. `prefix` (string): what to display before the amount. Defaults to `'$'`.
1. `suffix` (string): what to display after the amount. Defaults to empty string.
1. `includeThousandsSeparator` (boolean): whether or not to separate thousands. Defaults to to `true`.
1. `thousandsSeparatorSymbol` (string): character with which to separate thousands. Default to `','`.
1. `allowDecimal` (boolean): whether or not to allow the user to enter a fraction with the amount. Default to `false`.
1. `decimalSymbol` (string): character that will act as a decimal point. Defaults to `'.'`
1. `decimalLimit` (number): how many digits to allow after the decimal. Defaults to `2`
1. `requireDecimal` (boolean): whether or not to always include a decimal point and placeholder for decimal digits
after the integer. Defaults to `false`.

#### Usage

```js
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'

const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $' // This will put the dollar sign at the end, with a space.
})

// ...then pass `numberMask` to the Text Mask component
```

### `emailMask`

`emailMask` formats user input as an email address.

#### Usage

```js
import emailMask from 'text-mask-addons/dist/emailMask.js'

// ...then pass `emailMask` to the Text Mask component
```

*Technical side note*: even though `emailMask` is passed as a `mask`, it is actually made of both a `mask` and a `pipe` bundled 
together for convenience. The Text Mask component knows how to unwrap and separate the `pipe` and `mask` functions to use them. 

## Pipes

These functions here can be passed as a
[`pipe`](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#pipe)
to Text Mask.

### `autoCorrectedMmddyyyyPipe`

The `autoCorrectedMmddyyyyPipe` helps the user in entering a date in the `MM/DD/YYYY` format.

For example, if the user enters a value
larger than `1` in the 1st slot of month, it appends `0` to it. That is `4` => `04`. It does a similar thing for the
day slots.

And for the year, when the user enters `0` in the 1st slot of the year, it transforms that to `200`.

It also blocks the user from entering invalid days or months such as `33/44`.

For `autoCorrectedMmddyyyyPipe` to work properly, the Text Mask component needs to be
configured with
[`keepCharPositions`](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#keepcharpositions)
set to `true`.

#### Usage

```js
import autoCorrectedMmddyyyyPipe from 'text-mask-addons/dist/autoCorrectedMmddyyyyPipe.js'

// ...then pass `autoCorrectedMmddyyyyPipe` to the Text Mask component
```
