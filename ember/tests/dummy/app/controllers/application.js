/* BEGIN-SNIPPET controller-mask-example */
import Ember from 'ember';

export default Ember.Controller.extend({

  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

});
/* END-SNIPPET */
