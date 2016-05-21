# React Input Mask

## Getting started

First, install it.

```bash
npm i @msafi/react-text-mask --save
```

Then, require it and use it.

```js
var React = require('react')
var MaskedInput = require('@msafi/react-text-mask')

var MyComponent = React.createClass({
  render() {
    return (
      <div>
        <MaskedInput mask="(111) 111-1111" />
      </div>
    )
  }
})
```

`<MaskedInput/>` is fully compatible with `<input/>` element. So, you can
pass to it CSS classes, a placeholder attribute, or whatever.

For example, the following works:

```html
<MaskedTextInput
  mask="11111"
  className="form-control"
  placeholder="Enter zip code"
  guide={false}
  id="my-input-id"
/>
```

## Example

For a working example, check out the source code of
[this HTML file](https://msafi.github.io/text-mask/react/example.html).

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
