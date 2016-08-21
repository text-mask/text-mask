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
import Ember from 'ember';

export default Ember.Controller.extend({

  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

});
```

## Documentation

For more information about the attributes that the `masked-input` component accepts, see the [documentation here](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

* Clone the repo, `git clone git@github.com:text-mask/text-mask.git`
* `cd text-mask/ember`
* `npm install`
* `bower install`
* `ember server`
* Open [http://localhost:4200](http://localhost:4200)

You should have a working demo.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
