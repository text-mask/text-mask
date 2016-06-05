# Text Mask Addons

Text Mask addons are accessories for Text Mask. Currently, the only available addon is
`createMmddyyyyValidator.js`

## Installation

```bash
npm i text-mask-addons --save-dev
```

## Validators

### `createMmddyyyyValidator`

`createMmddyyyyValidator` returns a function that ensures the user is typing a valid `mm/dd/yyyy`
date.

#### Usage

```js
import createMmddyyyyValidator from 'text-mask-addons/dist/createMmddyyyyValidator'

var mmddyyyyValidator = createMmddyyyyValidator({
  minimumDate: '01/01/1900',
  maximumDate: '12/31/2016'
})

// ...then pass `mmddyyyyValidator` to Text Mask component
```
