import Ember from 'ember';
import createTextMaskInputElement from 'ember-text-mask/createTextMaskInputElement';

const { computed, observer, on, run: { once }, set, TextField } = Ember;

function _createTextMaskInputElement(...args) {
  return computed(...args, function () {
    let config = this.getProperties(...args);
    config.inputElement = this.get('element');
    return createTextMaskInputElement(config);
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

  textMaskInputElement: _createTextMaskInputElement('mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe'),

  update() {
    this.get('textMaskInputElement').update(...arguments);
  },

  _textMaskInputElementChanged: observer('textMaskInputElement', function () {
    this.update();
  }),

  _didInsertElement: on('didInsertElement', function() {
    this.update();
    once(() => set(this, 'value', this.element.value));
  }),

  _input: on('input', function() {
    this.update();
  })
});
