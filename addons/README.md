# Text Mask Addons

These addons are ready-to-use validators and masks that can be used with Text Mask.

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

## Validators

These functions here can be passed as a
[`validator`](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#validator)
to Text Mask.

### `createMmddyyyyValidator`

`createMmddyyyyValidator` returns a function that ensures the user is typing a valid `mm/dd/yyyy`
date.

It accepts a config object with `minimumDate` and `maximumDate`, and ensures that the user is
typing a valid calendar date between these two dates. It prevents the user from entering any
character that would invalidate the date. For example, a month that begins with `2` is prevented.

#### Usage

```js
import createMmddyyyyValidator from 'text-mask-addons/dist/createMmddyyyyValidator.js'

const mmddyyyyValidator = createMmddyyyyValidator({
  minimumDate: '01/01/1900',
  maximumDate: '12/31/2016'
})

// ...then pass `mmddyyyyValidator` to the Text Mask component
```
