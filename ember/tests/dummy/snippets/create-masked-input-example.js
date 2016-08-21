import Ember from 'ember';
import { createTextMaskInputElement } from 'ember-text-mask';

export default Ember.Component.extend({

  didInsertElement() {
    this._super(...arguments);

    createTextMaskInputElement(this.getProperties('inputElement', 'mask'));

  }
});
