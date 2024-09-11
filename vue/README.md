# Vue Input Mask

## Getting started

First, install it.

```bash
npm i vue-text-mask --save
```

Then, use it as follows:

```html
<template>
  <div>
    <label>Phone Number</label>
    <masked-input
      type="text"
      name="phone"
      class="form-control"
      v-model="phone"
      :mask="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
      :guide="false"
      placeholderChar="#"
    >
    </masked-input>
  </div>
</template>

<script>
  import MaskedInput from "vue-text-mask";

  export default {
    name: "name",

    components: {
      MaskedInput,
    },

    data() {
      return {
        phone: "",
      };
    },
  };
</script>
```

You could alternatively define the component globally:

```js
import Vue from "vue";
import MaskedInput from "vue-text-mask";

Vue.component("masked-input", MaskedInput);
```

`<masked-input>` is essentially a wrapped `<input>` element - so it supports all the regular input properties (type, placeholder, class, etc). It is compatible with v-model 2-way binding, and is reactive to changes to any of the [text mask props](https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#readme).

## Documentation

For more information about the `props` that you can pass to the component, see
the [documentation here](https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:im-open/text-mask.git`
2. `npm install`
3. `npm run vue:dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Contributing

We would love some contributions! Check out
[this document](https://github.com/im-open/text-mask/blob/master/howToContribute.md#readme) to get started.
