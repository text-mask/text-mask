# React Input Mask

## Getting started

First, install it.

```bash
npm i react-text-mask --save
```

Then, require it and use it.

```js
var React = require('react')
var MaskedInput = require('react-text-mask')

var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
      </div>
    )
  }
})
```

`<MaskedInput/>` is fully compatible with `<input/>` element. So, you can
pass to it CSS classes, a placeholder attribute, or whatever.

For example, the following works:

```js
<MaskedTextInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  className="form-control"
  placeholder="Enter a phone number"
  guide={false}
  id="my-input-id"
/>
```

## Documentation

For more information about the `props` that you can pass to the component, see
the [documentation here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:text-mask/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run react:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`react/example`](https://github.com/text-mask/text-mask/tree/master/react/example).

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.
