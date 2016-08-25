# React Text Mask documentation

You can use your own custom input component by passing in the prop `inputElement`.
For example if you're using `react-bootstrap` you can pass in `FormControl`

```js
<MaskedTextInput
  inputElement={FormControl}
  getNode={(input) => findDOMNode(input)}
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  placeholder="Enter a phone number"
  guide={false}
  id="my-input-id"
/>
```

When using a custom `inputElement` the `getNode` callback must return the HTML input element.
The reason for this is that we require a `ref` to the actual HTML input to control the caret position.