import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

/*

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

  template.hbs
  ```
  {{masked-input mask=mask}}
  ```

  ### Value

  You can access the `value` of the component as you would with any `input` element.

  ```
  {{masked-input mask=mask value=theValue}}
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
