import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

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
export default Ember.TextField.extend({

  mask: [],

  inputElement: Ember.computed.readOnly('element'),

  createTextMaskInputElement,

  initTextMaskInputElement() {
    this.set('textMaskInputElement', this.createTextMaskInputElement(this.getProperties('inputElement', 'mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'onReject', 'onAccept')));
  },

  didInsertElement() {
    this._super(...arguments);
    this.initTextMaskInputElement();
  },

  update() {
    this.get('textMaskInputElement').update(...arguments);
  },

  _input: Ember.on('input', function() {
    this.update();
  })
});
