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

  didInsertElement() {
    this._super(...arguments);
    this.set('textMaskInputElement', createTextMaskInputElement(this.getProperties('inputElement', 'mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'onReject', 'onAccept')));
  },

  input() {
    this.get('textMaskInputElement').update();
  }
});
