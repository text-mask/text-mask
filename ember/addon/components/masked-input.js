import Ember from 'ember';
import createTextMaskInputElement from 'ember-text-mask/createTextMaskInputElement';

const { computed, get, getProperties, on, TextField } = Ember;

function _config(...args) {
  return computed(...args, function () {
    return getProperties(this, ...args);
  });
}

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

  mask: [],

  config: _config('mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe'),

  textMaskInputElement: computed('config', function () {
    let config = get(this, 'config');
    config.inputElement = get(this, 'element');
    return this.createTextMaskInputElement(config);
  }),

  createTextMaskInputElement,

  update() {
    this.get('textMaskInputElement').update(...arguments);
  },

  _didInsertElement: on('didInsertElement', function() {
    this.update();
  }),

  _input: on('input', function() {
    this.update();
  })
});
