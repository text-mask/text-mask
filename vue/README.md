# Vue Input Mask

## Getting started

First, install it.

```bash
npm i vue-text-mask --save
```

Then, use it as follows:

```js
// Either define the component globally
import Vue from 'vue'
import MaskedInput from 'vue-text-mask'

Vue.component('masked-input', MaskedInput);

// Or define it within a Vue instance or component
import MaskedInput from 'vue-text-mask'

... {
  components: {
    MaskedInput
  }
}
```

```html
<!-- Example .vue component implementation -->
<template>
  <label>Phone Number</label>
  <masked-input
    type="text"
    name="phone"
    class="form-control"
    v-model="phone"
    :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
    :guide="false"
    placeholderChar="#">
  </masked-input>
</template>

<script>
  import MaskedInput from 'vue-text-mask'

  export default {
    name: 'name',

    components: {
      MaskedInput
    },

    data () {
      return {
        phone: ''
      }
    }
  }
</script>
```

## Documentation

For more information about the `props` that you can pass to the component, see
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
