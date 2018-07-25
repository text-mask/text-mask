# Text Mask Addons

These addons are ready-to-use pipes and masks that can be used with Text Mask.

## Installation

```bash
npm i text-mask-addons --save
```

## Masks

These can be passed as a
[`mask`](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask)
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
1. `integerLimit` (number): limit the length of the integer number. Defaults to `null` for unlimited
1. `requireDecimal` (boolean): whether or not to always include a decimal point and placeholder for decimal digits
after the integer. Defaults to `false`.
1. `allowNegative` (boolean): whether or not to allow negative numbers. Defaults to `false`
1. `allowLeadingZeroes` (boolean): whether or not to allow leading zeroes. Defaults to `false`

#### Usage

```js
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// First, you need to create the `numberMask` with your desired configurations
const numberMask = createNumberMask({
  prefix: '',
  suffix: ' $' // This will put the dollar sign at the end, with a space.
})

// ...then pass `numberMask` to the Text Mask component as the mask
```

### `emailMask`

`emailMask` formats user input as an email address.

#### Usage

```js
import emailMask from 'text-mask-addons/dist/emailMask'

// ...then pass `emailMask` to the Text Mask component as the mask
```

*Technical side note*: even though `emailMask` is passed as a `mask`, it is actually made of both a `mask` and a `pipe` bundled 
together for convenience. The Text Mask component knows how to unwrap and separate the `pipe` and `mask` functions to use them. 

## Pipes

These functions here can be passed as a
[`pipe`](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#pipe)
to Text Mask.

### `createAutoCorrectedDatePipe`

The `createAutoCorrectedDatePipe` returns a `autoCorrectedDatePipe`, which can help the user in entering a date.
The `createAutoCorrectedDatePipe` accepts a string specifying date format and an object with the following keys:

1. `minYear` (number): the minimum year allowed in the date field `mask`.
1. `maxYear` (number): the maximum year allowed in the date field `mask`.


For example, if the user enters a value
larger than `1` in the 1st slot of month, it appends `0` to it. That is `4` => `04`. It does a similar thing for the
day slots.

It also blocks the user from entering invalid days or months such as `33/44`.

For `createAutoCorrectedDatePipe` to work properly, the Text Mask component needs to be
configured with
[`keepCharPositions`](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#keepcharpositions)
set to `true`.

#### Usage

```js
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy HH:MM')
// As you can see in the line above, you can pass a string argument to `createAutoCorrectedDatePipe` 
// to give it the order of day, month, year, hour and minute in your `mask`.

// ...now you can pass `autoCorrectedDatePipe` to the Text Mask component as the `pipe`
```
