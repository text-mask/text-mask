import { getProperties, get, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import TextField from '@ember/component/text-field';
import createTextMaskInputElement from 'ember-text-mask/createTextMaskInputElement';

function _config(...args) {
  return computed(...args, function () {
    return getProperties(this, ...args);
  });
}

const mask = [];

/*

  ## MaskedInputComponent

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
*/
export default TextField.extend({

  mask,

  /*
    ## config {Object}

    This is a computed property and will re-compute when any of the dependent properties
    update.  By default it will read the properties off the component root, you
    can pass in attrbutes to the component through the template.

    ```hbs
    {{masked-input
      mask=customMask
      guide=true}}
    ```
  */
  config: _config('mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'showMask'),

  /*
    ## textMaskInputElement {Object}

    `textMaskInputElement` is the object that is returned from calling the
    `createTextMaskInputElement`. method.

    This is a computed property and will re-compute whenever the `config` property
    changes.
  */
  textMaskInputElement: computed('config', function () {
    let config = get(this, 'config');
    config.inputElement = this.element;
    return this.createTextMaskInputElement(config);
  }),

  createTextMaskInputElement,

  update() {
    this.get('textMaskInputElement').update(...arguments);
  },

  _input: on('input', 'didRender', function() {
    this.update();
  })
});
