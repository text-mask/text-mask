# Text Mask for React

## Getting started

First, install it.

```
npm i @msafi/react-text-mask --save
```

Then, require it and use it.

```js
var React = require('react')
var MaskedTextInput = require('@msafi/react-text-mask')

var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <MaskedTextInput mask="(111) 111-1111" />
      </div>
    )
  }
})
```

`<MaskedTextInput/>` is fully compatible with `<input type="text"/>` element. So, you can
pass to it CSS classes, a placeholder attribute, or whatever.

For example, the following works:

```jsx
<MaskedTextInput
  mask="11111"
  className="form-control"
  placeholder="Enter zip code"
  id="my-input-id"
/>
```
