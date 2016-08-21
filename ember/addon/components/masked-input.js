import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

export default Ember.TextField.extend({

  inputElement: Ember.computed.readOnly('element'),

  didInsertElement() {
    this._super(...arguments);
    this.set('textMaskInputElement', createTextMaskInputElement(this.getProperties('inputElement', 'mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe', 'onReject', 'onAccept')));
  },

  input() {
    this.get('textMaskInputElement').update();
  }
});
