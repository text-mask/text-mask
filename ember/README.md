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


### Mask

In the template's controller, specify a `mask`.

```js
import Ember from 'ember';

export default Ember.Controller.extend({

  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

});
```

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
