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

  /*
    ## mask {Array|Function|Boolean}

    The mask can be an array, or a function that returns an array.

    You can also set the mask to `false`, or return `false` from a mask function
    to disable the mask completely.
  */
  mask: [],

  /*
    ## config {Object}

    This is a computed property and will update when any of the dependent properties
    update.  By default it will read the properties off the component root.
  */
  config: _config('mask', 'guide', 'placeholderChar', 'keepCharPositions', 'pipe'),

  /*
    ## textMaskInputElement {Object}

    `textMaskInputElement` is the object that is returned from calling `createTextMaskInputElement`.
    This is a computed property.  It is dependent on the `config` property and
    will re-compute whenever the config property changes.
  */
  textMaskInputElement: computed('config', function () {
    let config = get(this, 'config');
    config.inputElement = get(this, 'element');
    return this.createTextMaskInputElement(config);
  }),

  /*
    ## createTextMaskInputElement(config)

    This method returns the `textMaskInputElement` object.  It is called when
    the `textMaskInputElement` property is computed...
  */
  createTextMaskInputElement,

  /*
    ## update(rawValue, config)

    This method is called on every key press (and on initial render).
  */
  update(/*rawValue, config*/) {
    this.get('textMaskInputElement').update(...arguments);
  },

  // call `update` method when the element is rendered.
  _didInsertElement: on('didInsertElement', function() {
    this.update();
  }),


  // call `update` method on input.
  _input: on('input', function() {
    this.update();
  })
});
