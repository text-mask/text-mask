# Ember Input Mask

## Getting started

First, install it.

```bash
ember install ember-text-mask
```

Then, use it as follows:

Add the following markup to your template to render a masked input component.

```hbs
{{masked-input mask=mask}}
```

In the template's controller, specify a `mask`.

```js
import Controller from "@ember/controller";

export default Controller.extend({
  mask: [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
});
```

## Documentation

&#x1F4CD; For more information about the attributes that the `masked-input` component accepts, see the
[documentation here](https://github.com/im-open/text-mask/blob/master/componentDocumentation.md#readme).

#### Other use-cases

##### Unmasking the value that is stored in the model

Text Mask does not provide an option to unmask the model before storing it. You can sanitize the model on your
side. See [here](https://github.com/im-open/text-mask/issues/109) for details.

## Example

To see an example of the code running, follow these steps:

- Clone the repo, `git clone git@github.com:im-open/text-mask.git`
- `cd text-mask/ember`
- `npm install`
- `bower install`
- `ember serve`
- Open [http://localhost:4200](http://localhost:4200)

You should have a working demo.
