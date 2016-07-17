# Text Mask Addons

These addons are ready-to-use pipes and masks that can be used with Text Mask.

## Installation

```bash
npm i text-mask-addons --save-dev
```

## Dynamic masks

These functions here can be passed as a
[`mask`](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#mask)
to Text Mask.

### `createCurrencyMask`

`createCurrencyMask` returns a `currencyMask` function that will format user input as currency.
`createCurrencyMask` accepts an object with `prefix` and `suffix` keys. The default `prefix`
is `$` and the default `suffix` is nothing. So, `currencyMask` by default will turn an input like
`3000` to `$3,000`.

### Usage

```js
import createCurrencyMask from 'text-mask-addons/dist/createCurrencyMask.js'

const currencyMask = createCurrencyMask({
  prefix: '',
  suffix: ' $' // This will put the dollar sign at the end, with a space.
})

// ...then pass `currencyMask` to the Text Mask component
```

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
