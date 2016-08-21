import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

/*

  ## MaskedInputComponent

  ### Basic use

  Use the component in templates like this

  ```
  {{masked-input}}
  ```

  ### Mask

  define a mask in the template's controller.

  controller.js
  ```
  import Ember from 'ember';

  export default Ember.Controller.extend({

    phoneNumberMask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  });
  ```

  ... then pass the mask to the component in the template

  template.hbs
  ```
  {{masked-input mask=phoneNumberMask}}
  ```

  ### Value

  set the value of the input like any other input element.

  ```
  {{masked-input value=model.value}}
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
