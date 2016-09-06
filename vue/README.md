# Vue Input Mask Directive

## Getting started

```js
// main.js

import Vue from 'vue'
import App from './App.vue'

// Import Text Mask Directive
import textMask from './text-mask'

// Use text mask directive
Vue.directive('text-mask', textMask)

new Vue({
  el: 'body',
  components: { App }
})
```

```html
<!-- Template/Markup -->
<label>Phone Number</label>
<input
  type="text"
  name="phone"
  class="form-control"
  v-model="phone"
  v-text-mask
  :mask-options="maskOptions">
```

```js
// Component JS
data () {
  return {
    maskOptions: {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
}
```

## Documentation

For more information about the `props` that you can pass to the directive, see
the [documentation here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:text-mask/text-mask.git`
2. `cd text-mask/vue`
3. `npm install`
4. `npm run dev`
5. Open [http://localhost:8080](http://localhost:8080)

## Contributing

We would love some contributions! Check out [this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)

