# Ember-text-mask

## Installation

* `ember install ember-text-mask`


## TextMask library

You can import the `TextMask` core library into your Ember project.

```
import TextMask from 'ember-text-mask';

// ... do something with the `TextMask` core library
```

If you wanted to use the `createTextMaskInputElement()` method in a component...

```
import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);

    createTextMaskInputElement(this.getProperties('inputElement', 'mask'));

  }
});

```

Check the `TextMask` documentation for more information on how to use the library.
[https://github.com/text-mask/text-mask/blob/master/core/README.md](https://github.com/text-mask/text-mask/blob/master/core/README.md)


## MaskedInputComponent

Add the following markup to your template to render a masked input component.

```
{{masked-input}}
```

By default, with no `mask` specified, the rendered `input` element will not allow any input.


### Mask

In the template's controller, specify a `mask`.

```
import Ember from 'ember';

export default Ember.Controller.extend({

  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

});
```

Then pass the `mask` to the component in the template.

```
{{masked-input mask=mask}}
```


### Value

You can access the `value` of the component as you would with any `input` element.

```
{{masked-input mask=mask value=theValue}}
```

### Extending the `MaskedInputComponent`

You can also extend the `MaskedInputComponent` to create your own.

```
import MaskedInput from 'ember-text-mask/components/masked-input';

export default MaskedInput.extend({

  // ...add any other config options here...
  mask: [ ... ]

});
```

### Development

## Installation for development

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
