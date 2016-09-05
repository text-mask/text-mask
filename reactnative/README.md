# React Native Input Mask

### This is beta and is a still a WIP!

## Getting started

First, install it.

```bash
npm i react-native-text-mask --save
```

Then, require it and use it.

```js
import React, { Component } from 'react'
import { View } from 'react-native'
import MaskedInput from 'react-native-text-mask'

class MyComponent extends Component {
  render() {
    return (
      <View>
        <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
      </View>
    )
  }
}
```

`<MaskedInput/>` is fully compatible with the `<TextInput/>` element. So, you can
pass any style, a placeholder attribute, and all other `TextInput` props.

For example, the following works:

```js
<MaskedInput
  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  placeholder="Enter a phone number"
  guide={false}
/>
```

## Documentation

For more information about the `props` that you can pass to the component, see
the [documentation here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Setup a custom project with `react-native init` command
1. Install `react-native-text-mask`
1. Copy example into your project
1. Run iOS/Android project

The code of the example is in [`reactNative/example`](https://github.com/text-mask/text-mask/tree/master/reactNative/example).

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
