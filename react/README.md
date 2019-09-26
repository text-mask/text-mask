# React Input Mask

## Getting started

First, install it.

```bash
npm i react-text-mask --save
```

Then, require it and use it.

```js
import React from 'react'
import MaskedInput from 'react-text-mask'

export default () => (
  <div>
    <MaskedInput
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
    />
  </div>
)
```

`<MaskedInput/>` is fully compatible with `<input/>` element. So, you can
pass it CSS classes, a placeholder attribute, or even an `onBlur` handler.

For example, the following works:

```js
<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  className="form-control"
  placeholder="Enter a phone number"
  guide={false}
  id="my-input-id"
  onBlur={() => {}}
  onChange={() => {}}
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

## Customize Rendered `<input>` Component

For advanced uses, you can customize the rendering of the resultant `<input>` via a render prop.
This is entirely optional, if no `render` prop is passed, a normal `<input>` is rendered.

For example, to use with `styled-components` (v4+) [which uses `ref`](https://www.styled-components.com/docs/advanced#refs) thanks to the `forwardRef` API (React 16.3+):
```javascript
import styled from 'styled-component';
import MakedInput from 'react-text-mask';

<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  placeholder="Enter a phone number"
  id="my-input-id"
  render={(ref, props) => (
    <MyStyledInput ref={ref} {...props} />
  )}
/>

const MyStyledInput = styled.input`
  background: papayawhip;
`;
```

If using `styled-components` < v4, pass the `ref` to the `innerRef` attribute: 
```js

<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  placeholder="Enter a phone number"
  id="my-input-id"
  render={(ref, props) => (
    <MyStyledInput innerRef={ref} {...props} />
  )}
/>

```

Note: The `render` prop will produce a `ref` that can be passed along. You will not need to create your own.

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.
