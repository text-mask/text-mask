# Vue Input Mask

**Note:**
- IE9 is not supported in this module.
- Works with Vue 1.0. No support for 2.0, yet.

## Getting started

First, install it.

```bash
npm i vue-text-mask --save
```

Then, use it as follows:

```js
// main.js

import Vue from 'vue'
import App from './app.vue'
import textMask from 'vue-text-mask'

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
  v-text-mask="maskOptions">
```

**Please note that you can only pass reference to an object, not an object literal.**
`v-text-mask="{obj: 'literal'}"` **will not work.**

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
2. `npm install`
3. `npm run vue:dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Contributing

We would love some contributions! Check out
[this document](https://github.com/text-mask/text-mask/blob/master/howToContribute.md#readme) to get started.
